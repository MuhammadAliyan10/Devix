"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import { Target } from "lucide-react";
import React from "react";
const tabsValue = [
  {
    name: "Your Goals",
    value: "goals",
    component: "<HomeTab />",
  },
  {
    name: "Goals Progress",
    value: "progress",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];

const GoalsPage = () => {
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
        heading="Goals"
        icon={<Target className="w-10 h-10 text-primary" />}
        subtitle="Stay focused by setting goals and reaching milestones"
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="goals" />
    </div>
  );
};

export default GoalsPage;
