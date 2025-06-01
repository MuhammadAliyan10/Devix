import { Metadata } from "next";
import BlogsPage from "./_components/BlogsPage";

export const metadata: Metadata = {
  title: "Blogs",
};

const page = () => {
  return <BlogsPage />;
};

export default page;
