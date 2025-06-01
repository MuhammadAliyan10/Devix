import { Metadata } from "next";
import MessagesPage from "./_components/MessagesPage";

export const metadata: Metadata = {
  title: "Messages",
};

const page = () => {
  return <MessagesPage />;
};

export default page;
