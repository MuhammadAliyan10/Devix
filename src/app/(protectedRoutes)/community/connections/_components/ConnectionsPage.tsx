import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Users2 } from "lucide-react";
import React from "react";
const tabsValue = [
  {
    name: "My Connections",
    value: "connections",
    component: "<HomeTab />",
  },
  {
    name: "Recommended",
    value: "recommended",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Search",
    value: "search",
    component: "<CareerTab userId={user.id} />",
  },
];
const ConnectionsPage = () => {
  return (
    <div>
      <PageHeader
        heading="Connections"
        icon={<Users2 className="w-10 h-10 text-primary" />}
        subtitle="Stay informed and connected with your evolving network."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="connections" />
    </div>
  );
};

export default ConnectionsPage;
