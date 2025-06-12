"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { NotepadText, Settings2 } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "Quiz",
    value: "quiz",
    component: "<HomeTab />",
  },
  {
    name: "Progress",
    value: "insight",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "History",
    value: "history",
    component: "<CareerTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];
const QuizzesPage = () => {
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
        heading="Quizzes"
        icon={<NotepadText className="w-10 h-10 text-primary" />}
        subtitle="Test your knowledge and practice what you've learned"
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
      <TabsComponent tabs={tabsValue} defaultValue="quiz" />
    </div>
  );
};

export default QuizzesPage;
