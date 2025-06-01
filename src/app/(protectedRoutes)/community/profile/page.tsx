import { Metadata } from "next";
import ProfilePage from "./_components/ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
};

const page = () => {
  return <ProfilePage />;
};

export default page;
