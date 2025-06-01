import { Metadata } from "next";
import CalenderPage from "./_components/CalenderPage";

export const metadata: Metadata = {
  title: "Calender",
};

const page = () => {
  return <CalenderPage />;
};

export default page;
