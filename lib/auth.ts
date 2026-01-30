import type { Role } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const providers = [
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
];

export const authConfig = {
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, profile }) {
      const email = user?.email ?? profile?.email;
      if (!email) return false;
      return true;
    },
    async jwt({ token, user, profile }) {
      const email = user?.email ?? token.email ?? profile?.email;
      if (!email) return token;
      const isAdmin = email.toLowerCase() === "zaidali753@gmail.com";

      const name = user?.name ?? token.name ?? profile?.name ?? null;
      const image =
        user?.image ??
        token.picture ??
        (profile as { avatar_url?: string } | null)?.avatar_url ??
        null;

      const dbUser = await prisma.user.upsert({
        where: { email },
        update: {
          name,
          image,
          ...(isAdmin ? { role: "ADMIN" } : {}),
        },
        create: {
          email,
          name,
          image,
          role: isAdmin ? "ADMIN" : "USER",
        },
      });

      token.id = dbUser.id;
      token.role = dbUser.role;
      token.name = dbUser.name ?? token.name;
      token.picture = dbUser.image ?? token.picture;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? session.user.id;
        session.user.role = (token.role as Role | undefined) ?? "USER";
        session.user.image = (token.picture as string | undefined) ?? session.user.image;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
