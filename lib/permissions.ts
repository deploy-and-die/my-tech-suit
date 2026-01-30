export type Role = "USER" | "MODERATOR" | "ADMIN";

export function canModerate(role: Role) {
  return role === "MODERATOR" || role === "ADMIN";
}

export function canManageOwnContent(userId: string, ownerId: string) {
  return userId === ownerId;
}

export function isAdminUser(user?: { role?: Role; email?: string | null }) {
  return user?.role === "ADMIN" || user?.email?.toLowerCase() === "zaidali753@gmail.com";
}
