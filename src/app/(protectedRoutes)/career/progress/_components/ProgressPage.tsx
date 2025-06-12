"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { Settings2, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import CurrentProgressTab from "../tabs/CurrentProgressTab";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";

const tabsValue = [
  {
    name: "Current Progress",
    value: "currentProgress",
    component: <CurrentProgressTab />,
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

  if (!user.major || !user.institution) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-center leading-1 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold">Complete Your Onboarding</h3>
          <p className="text-muted-foreground my-3 text-sm">
            To provide personalized recommendations, track your progress, and
            connect you <br />
            with the most relevant resources, we need a few more details about
            <br /> your academic background.
          </p>
          <UserOnboardingDialog text="User Onboarding" />
        </div>
      </div>
    );
  }
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
