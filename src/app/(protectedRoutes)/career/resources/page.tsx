import { Metadata } from "next";
import ResourcesPage from "./_components/ResourcesPage";

export const metadata: Metadata = {
  title: "Resources",
};

const page = () => {
  return <ResourcesPage />;
};

export default page;
