import { Metadata } from "next";
import GroupPage from "./_components/GroupPage";

export const metadata: Metadata = {
  title: "Groups",
};

const page = () => {
  return <GroupPage />;
};

export default page;
