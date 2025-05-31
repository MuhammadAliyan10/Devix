import { Metadata } from "next";
import ProjectsPage from "./_components/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
};

const page = () => {
  return <ProjectsPage />;
};

export default page;
