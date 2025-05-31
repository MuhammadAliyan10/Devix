import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { BookMarked } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Bookmarked",
    value: "bookmarked",
    component: "<HomeTab />",
  },
  {
    name: "Liked",
    value: "liked",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Saved",
    value: "saved",
    component: "<CareerTab userId={user.id} />",
  },
];
const SavedPage = () => {
  return (
    <>
      <PageHeader
        heading="Saved"
        icon={<BookMarked className="w-10 h-10 text-primary" />}
        subtitle={`Your saved data.`}
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="bookmarked" />
    </>
  );
};

export default SavedPage;
