"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { Map, Settings2 } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "Your path",
    value: "path",
    component: "<HomeTab />",
  },
  {
    name: "Progress",
    value: "progress",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];
const PathPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useSession();
  return (
    <div>
      <PageHeader
        heading="Path"
        icon={<Map className="w-10 h-10 text-primary" />}
        subtitle={`Your personalized AI-guided learning path in ${user.major}`}
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update instructions"
            icon={<Settings2 className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <TabsComponent tabs={tabsValue} defaultValue="path" />
    </div>
  );
};

export default PathPage;
