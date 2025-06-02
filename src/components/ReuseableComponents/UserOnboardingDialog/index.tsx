"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import BasicInfoStep from "./BasicInfoStep";
import AcademicBackground from "./AcademicBackground";
import CurrentStatusStep from "./CurrentStatusStep";
import FuturePlansStep from "./FuturePlansStep";
import { useDevixStore } from "@/store/useDevixStore";
import { GraduationCap } from "lucide-react";
import { useSession } from "@/provider/SessionProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import SuccessStep from "./SuccessStep";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const steps = [
  {
    id: "basicInfo",
    title: "Personal Details",
    description: "Enter your personal information.",
    component: <BasicInfoStep />,
  },
  {
    id: "academicHistory",
    title: "Academic History",
    description: "Provide your educational background.",
    component: <AcademicBackground />,
  },
  {
    id: "currentStatus",
    title: "Current Status",
    description: "Share your current academic details.",
    component: <CurrentStatusStep />,
  },
  {
    id: "futurePlans",
    title: "Career Goals",
    description: "Outline your future aspirations.",
    component: <FuturePlansStep />,
  },
];

type props = {
  text: string;
};

export default function UserOnboardingDialog({ text }: props) {
  const {
    isModalOpen,
    setModalOpen,
    isCompleted,
    setCompleted,
    initializeStore,
  } = useDevixStore();
  const { user } = useSession();
  useEffect(() => {
    try {
      if (user?.id) {
        initializeStore(user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [user?.id, initializeStore]);

  const handleCompletion = () => {
    setCompleted(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20">
          <GraduationCap className="w-4 h-4" />
          {text}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1300px] p-0 bg-transparent border-none">
        <VisuallyHidden>
          <DialogTitle>User Onboarding</DialogTitle>
        </VisuallyHidden>
        {isCompleted ? (
          <div className="bg-muted text-primary rounded-lg overflow-hidden">
            <DialogTitle className="sr-only">Onboarding completed</DialogTitle>
            <SuccessStep />
          </div>
        ) : (
          <MultiStepForm steps={steps} onComplete={handleCompletion} />
        )}
      </DialogContent>
    </Dialog>
  );
}
