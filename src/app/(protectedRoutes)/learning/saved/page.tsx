import { Metadata } from "next";
import SavedPage from "./_components/SavedPage";

export const metadata: Metadata = {
  title: "Saved",
};

const page = () => {
  return <SavedPage />;
};

export default page;
