"use server";

import { prisma } from "@/lib/prisma";
import { canManageOwnContent, canModerate, type Role } from "@/lib/permissions";

export type ResourceType = "BLOG" | "CASE_STUDY";

export interface CommentActor {
  id: string;
  role: Role;
}

export async function createComment(
  actor: CommentActor,
  resourceId: string,
  resourceType: ResourceType,
  content: string
) {
  if (!actor.id) {
    throw new Error("Authentication required.");
  }

  return prisma.comment.create({
    data: {
      content,
      userId: actor.id,
      resourceId,
      resourceType,
    },
  });
}

export async function deleteComment(actor: CommentActor, commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error("Comment not found.");
  }

  const canDelete = canManageOwnContent(actor.id, comment.userId) || canModerate(actor.role);

  if (!canDelete) {
    throw new Error("Not authorized.");
  }

  return prisma.comment.update({
    where: { id: commentId },
    data: { content: "[deleted]" },
  });
}
