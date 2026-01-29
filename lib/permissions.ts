export type Role = "USER" | "MODERATOR" | "ADMIN";

export function canModerate(role: Role) {
  return role === "MODERATOR" || role === "ADMIN";
}

export function canManageOwnContent(userId: string, ownerId: string) {
  return userId === ownerId;
}
