"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageOwnContent, isAdminUser } from "@/lib/permissions";

const BLOG_PATH = "/blog";

function normalizeText(value: FormDataEntryValue | null) {
  if (!value) return "";
  return value.toString().trim();
}

function assertAuthenticated(userId?: string) {
  if (!userId) {
    throw new Error("Authentication required.");
  }
}

function assertAdmin(user?: { role?: string; email?: string | null }) {
  if (!isAdminUser(user)) {
    throw new Error("Not authorized.");
  }
}

export async function createBlogDraft(formData: FormData) {
  const session = await auth();
  assertAuthenticated(session?.user?.id);

  const title = normalizeText(formData.get("title"));
  const content = normalizeText(formData.get("content"));

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      content,
      authorId: session.user.id,
    },
  });

  revalidatePath(BLOG_PATH);
  return post;
}

export async function updateBlogPost(postId: string, formData: FormData) {
  const session = await auth();
  assertAuthenticated(session?.user?.id);

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const isAdmin = isAdminUser(session.user);
  const canEdit =
    isAdmin || (post.status === "DRAFT" && canManageOwnContent(session.user.id, post.authorId));

  if (!canEdit) {
    throw new Error("Not authorized.");
  }

  const title = normalizeText(formData.get("title"));
  const content = normalizeText(formData.get("content"));

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const updated = await prisma.blogPost.update({
    where: { id: postId },
    data: {
      title,
      content,
    },
  });

  revalidatePath(BLOG_PATH);
  return updated;
}

export async function requestBlogReview(postId: string) {
  const session = await auth();
  assertAuthenticated(session?.user?.id);

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const canRequest =
    post.status === "DRAFT" && canManageOwnContent(session.user.id, post.authorId);

  if (!canRequest) {
    throw new Error("Not authorized.");
  }

  const updated = await prisma.blogPost.update({
    where: { id: postId },
    data: {
      reviewRequestedAt: new Date(),
    },
  });

  revalidatePath(BLOG_PATH);
  return updated;
}

export async function publishBlogPost(postId: string) {
  const session = await auth();
  assertAuthenticated(session?.user?.id);
  assertAdmin(session?.user);

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  if (!post.reviewRequestedAt) {
    throw new Error("Review not requested.");
  }

  const updated = await prisma.blogPost.update({
    where: { id: postId },
    data: {
      status: "PUBLISHED",
    },
  });

  revalidatePath(BLOG_PATH);
  return updated;
}

export async function archiveBlogPost(postId: string) {
  const session = await auth();
  assertAuthenticated(session?.user?.id);

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const isAdmin = isAdminUser(session.user);
  const canArchive =
    isAdmin || (post.status === "DRAFT" && canManageOwnContent(session.user.id, post.authorId));

  if (!canArchive) {
    throw new Error("Not authorized.");
  }

  const updated = await prisma.blogPost.update({
    where: { id: postId },
    data: {
      status: "ARCHIVED",
    },
  });

  revalidatePath(BLOG_PATH);
  return updated;
}
