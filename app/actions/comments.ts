"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageOwnContent, canModerate } from "@/lib/permissions";

export type ResourceType = "BLOG" | "CASE_STUDY";

export async function createComment(
  resourceId: string,
  resourceType: ResourceType,
  content: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  return prisma.comment.create({
    data: {
      content,
      userId: session.user.id,
      resourceId,
      resourceType,
    },
  });
}

export async function deleteComment(commentId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required.");
  }

  const comment = await prisma.comment.findUnique({
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

  return prisma.comment.update({
    where: { id: commentId },
    data: { content: "[deleted]" },
  });
}
