"use server";

import { prisma } from "@/lib/prisma";
import { canManageOwnContent, canModerate, type Role } from "@/lib/permissions";

export interface ForumActor {
  id: string;
  role: Role;
}

export async function createForumPost(
  actor: ForumActor,
  title: string,
  content: string,
  categoryId: string
) {
  if (!actor.id) {
    throw new Error("Authentication required.");
  }

  return prisma.forumPost.create({
    data: {
      title,
      content,
      categoryId,
      userId: actor.id,
    },
  });
}

export async function createForumComment(
  actor: ForumActor,
  postId: string,
  content: string
) {
  if (!actor.id) {
    throw new Error("Authentication required.");
  }

  return prisma.forumComment.create({
    data: {
      content,
      postId,
      userId: actor.id,
    },
  });
}

export async function deleteForumPost(actor: ForumActor, postId: string) {
  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const canDelete = canManageOwnContent(actor.id, post.userId) || canModerate(actor.role);

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

export async function deleteForumComment(actor: ForumActor, commentId: string) {
  const comment = await prisma.forumComment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error("Comment not found.");
  }

  const canDelete = canManageOwnContent(actor.id, comment.userId) || canModerate(actor.role);

  if (!canDelete) {
    throw new Error("Not authorized.");
  }

  return prisma.forumComment.delete({
    where: { id: commentId },
  });
}
