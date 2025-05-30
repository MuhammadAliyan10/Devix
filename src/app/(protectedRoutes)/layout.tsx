import { validateRequest } from "@/actions/auth";
import { redirect } from "next/navigation";
import ClientLayout from "./ClientLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequest();

  if (!session || !user) {
    redirect("/login");
  }

  return (
    <ClientLayout user={user} session={session}>
      {children}
    </ClientLayout>
  );
}
