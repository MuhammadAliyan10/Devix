import { Metadata } from "next";
import TutorialsPage from "./_components/TutorialsPage";

export const metadata: Metadata = {
  title: "Tutorials",
};

const page = () => {
  return <TutorialsPage />;
};

export default page;
