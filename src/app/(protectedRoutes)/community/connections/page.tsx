import { Metadata } from "next";
import ConnectionsPage from "./_components/ConnectionsPage";

export const metadata: Metadata = {
  title: "Connections",
};

const page = () => {
  return <ConnectionsPage />;
};

export default page;
