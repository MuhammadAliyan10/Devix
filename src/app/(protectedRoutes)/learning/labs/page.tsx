import { Metadata } from "next";
import LabsPage from "./_components/LabsPage";

export const metadata: Metadata = {
  title: "Labs",
};

const page = () => {
  return <LabsPage />;
};

export default page;
