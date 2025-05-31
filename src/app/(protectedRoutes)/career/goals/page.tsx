import { Metadata } from "next";
import GoalsPage from "./_components/GoalsPage";

export const metadata: Metadata = {
  title: "Goals",
};

const page = () => {
  return <GoalsPage />;
};

export default page;
