import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prismaClient } from "@/lib/prismaClient";
import { Lucia } from "lucia";
import { SubscriptionStatus } from "@prisma/client";
const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (databaseUserAttributes) => ({
    id: databaseUserAttributes.id,
    name: databaseUserAttributes.name,
    email: databaseUserAttributes.email,
    profileImageUrl: databaseUserAttributes.profileImageUrl,
    createdAt: databaseUserAttributes.createdAt,
    subscriptionStatus: databaseUserAttributes.subscriptionStatus,
    major: databaseUserAttributes.major,
    institution: databaseUserAttributes.institution,
  }),
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
  major: string;
  institution: string;
  subscriptionStatus: SubscriptionStatus;
}
