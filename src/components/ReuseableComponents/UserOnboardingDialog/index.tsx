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
        {isCompleted ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-foreground">
              Onboarding Complete!
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              Your information has been successfully saved.
            </p>
          </div>
        ) : (
          <MultiStepForm steps={steps} onComplete={handleCompletion} />
        )}
      </DialogContent>
    </Dialog>
  );
}
