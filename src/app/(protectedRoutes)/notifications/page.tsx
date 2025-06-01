import { Metadata } from "next";
import NotificationsPage from "./_components/NotificationsPage";

export const metadata: Metadata = {
  title: "Notifications",
};

const page = () => {
  return <NotificationsPage />;
};

export default page;
