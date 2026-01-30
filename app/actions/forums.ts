"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageOwnContent, canModerate } from "@/lib/permissions";

export async function createForumPost(
  title: string,
  content: string,
  categoryId: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  return prisma.forumPost.create({
    data: {
      title,
      content,
      categoryId,
      userId: session.user.id,
    },
  });
}

export async function createForumComment(
  postId: string,
  content: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  return prisma.forumComment.create({
    data: {
      content,
      postId,
      userId: session.user.id,
    },
  });
}

export async function deleteForumPost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const canDelete =
    canManageOwnContent(session.user.id, post.userId) || canModerate(session.user.role);

  if (!canDelete) {
    throw new Error("Not authorized.");
  }

  await prisma.forumComment.deleteMany({
    where: { postId },
  });

  return prisma.forumPost.delete({
    where: { id: postId },
  });
}

export async function deleteForumComment(commentId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  const comment = await prisma.forumComment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error("Comment not found.");
  }

  const canDelete =
    canManageOwnContent(session.user.id, comment.userId) || canModerate(session.user.role);

  if (!canDelete) {
    throw new Error("Not authorized.");
  }

  return prisma.forumComment.delete({
    where: { id: commentId },
  });
}
