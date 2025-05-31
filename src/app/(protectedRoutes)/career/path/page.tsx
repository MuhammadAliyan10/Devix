import { Metadata } from "next";
import PathPage from "./_components/PathPage";

export const metadata: Metadata = {
  title: "Path",
};

const page = () => {
  return <PathPage />;
};

export default page;
