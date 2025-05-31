import { Metadata } from "next";
import SettingsPage from "./_components/SettingsPage";

export const metadata: Metadata = {
  title: "Settings",
};

const page = () => {
  return <SettingsPage />;
};

export default page;
