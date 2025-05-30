import { Metadata } from "next";
import HomeComponent from "./HomeComponent";

export const metadata: Metadata = {
  title: "Home",
};

const page = () => {
  return <HomeComponent />;
};

export default page;
