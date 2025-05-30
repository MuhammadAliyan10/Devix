import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prismaClient } from "@/lib/prismaClient";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      name: databaseUserAttributes.name,
      email: databaseUserAttributes.email,
      profileImageUrl: databaseUserAttributes.profileImageUrl,
      createdAt: databaseUserAttributes.createdAt,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string | null;
  createdAt: Date;
}

export const validateRequest = cache(async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  try {
    const { user, session } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    return {
      user,
      session,
    };
  } catch (error) {
    console.error("Session validation error:");
    return {
      user: null,
      session: null,
    };
  }
});
