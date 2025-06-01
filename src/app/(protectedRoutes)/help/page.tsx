import { Metadata } from "next";
import HelpPage from "./_components/HelpPage";

export const metadata: Metadata = {
  title: "Help",
};

const page = () => {
  return <HelpPage />;
};

export default page;
