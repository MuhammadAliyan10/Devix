import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { CircleHelp } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "How to use",
    value: "howToUse",
    component: "<HomeTab />",
  },
  {
    name: "Privacy & Policy",
    value: "privacy",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Payments & Plans",
    value: "payments",
    component: "<LearningTab userId={user.id} />",
  },

  {
    name: "Support",
    value: "support",
    component: "<LearningTab userId={user.id} />",
  },
];

const HelpPage = () => {
  return (
    <div>
      <PageHeader
        heading="Help & Support"
        icon={<CircleHelp className="w-10 h-10 text-primary" />}
        subtitle="Get the assistance you need, when you need it."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="howToUse" />
    </div>
  );
};

export default HelpPage;
