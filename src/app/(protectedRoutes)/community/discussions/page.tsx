import { Metadata } from "next";
import DiscussionsPage from "./_components/DiscussionsPage";

export const metadata: Metadata = {
  title: "Discussions",
};

const page = () => {
  return <DiscussionsPage />;
};

export default page;
