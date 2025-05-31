"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { Brain, Settings2 } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "Recommended Skills",
    value: "recommendedSkills",
    component: "<HomeTab />",
  },
  {
    name: "Your Skills",
    value: "yourSkills",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];

const AssessmentPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useSession();
  return (
    <div>
      <PageHeader
        heading="Skills Assessment"
        icon={<Brain className="w-10 h-10 text-primary" />}
        subtitle="Test your knowledge and assess your skills in key areas"
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
      <TabsComponent tabs={tabsValue} defaultValue="recommendedSkills" />
    </div>
  );
};

export default AssessmentPage;
