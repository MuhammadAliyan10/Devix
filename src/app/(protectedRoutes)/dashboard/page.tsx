import { Metadata } from "next";
import HomeComponent from "./_components/HomeComponent";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = () => {
  return <HomeComponent />;
};

export default page;
