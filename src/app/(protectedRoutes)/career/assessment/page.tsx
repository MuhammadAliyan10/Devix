import { Metadata } from "next";
import AssessmentPage from "./_components/AssessmentPage";

export const metadata: Metadata = {
  title: "Assessment",
};

const page = () => {
  return <AssessmentPage />;
};

export default page;
