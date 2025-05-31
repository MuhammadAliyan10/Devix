import { Metadata } from "next";
import ProgressPage from "./_components/ProgressPage";

export const metadata: Metadata = {
  title: "Progress",
};

const page = () => {
  return <ProgressPage />;
};

export default page;
