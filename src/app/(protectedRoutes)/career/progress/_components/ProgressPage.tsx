"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { Settings2, TrendingUp } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "Current Progress",
    value: "currentProgress",
    component: "<HomeTab />",
  },
  {
    name: "Insight",
    value: "insight",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];

const ProgressPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useSession();
  return (
    <div>
      <PageHeader
        heading="Progress"
        icon={<TrendingUp className="w-10 h-10 text-primary" />}
        subtitle="Track your learning, achievements, and growth over time"
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update Instructions"
            icon={<Settings2 className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />

      <TabsComponent tabs={tabsValue} defaultValue="currentProgress" />
    </div>
  );
};

export default ProgressPage;
