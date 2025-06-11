"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import InstructionDialog from "@/components/ReuseableComponents/UpdateInstructionDialog";

import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { BookOpen, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import RecommendedCoursesTab from "../tabs/RecommendedCoursesTab";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import CourseProgressTab from "../tabs/CourseProgressTab";
import CoursesAssistantTab from "../tabs/CoursesAssistantTab";

const CoursesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const { user } = useSession();

  const handleSaveInstruction = async () => {
    if (!instruction.trim()) {
      toast.error("Instruction cannot be empty");
      return;
    }
  };
  const tabsValue = [
    {
      name: "Recommended",
      value: "recommended",
      component: <RecommendedCoursesTab />,
    },
    {
      name: "Progress",
      value: "progress",
      component: <CourseProgressTab userId={user.id} />,
    },
    {
      name: "Assistant",
      value: "assistant",
      component: <CoursesAssistantTab userId={user.id} />,
    },
  ];

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
        heading="Courses"
        icon={<BookOpen className="w-10 h-10 text-primary" />}
        subtitle={`Personalized AI-powered courses tailored to your ${user.major} studies`}
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update Course"
            icon={<Settings2 className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <InstructionDialog
        dialogTitle="Update Course"
        dialogOpenState={dialogOpen}
        dialogToggleFunction={setDialogOpen}
        dialogDescription="Provide instructions to customize your courses recommendations"
        inputValue={instruction}
        onChangeString={setInstruction}
        onAction={handleSaveInstruction}
      />
      <TabsComponent tabs={tabsValue} defaultValue="recommended" />
    </div>
  );
};

export default CoursesPage;
