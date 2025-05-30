// components/ReuseableComponents/MultiStepForm.tsx
"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDevixStore } from "@/store/useDevixStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  saveBasicInfo,
  saveAcademicHistory,
  saveCurrentStatus,
  saveFuturePlans,
  queueAITraining,
} from "@/actions/data";
import { useSession } from "@/provider/SessionProvider";

type Step = {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
};
type Props = {
  steps: Step[];
  onComplete: (id: string) => void;
};

const MultiStepForm = ({ steps, onComplete }: Props) => {
  const {
    isSubmitting,
    setModalOpen,
    validateStep,
    formData,
    setSubmitting,
    setCompleted,
  } = useDevixStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { user } = useSession();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const router = useRouter();

  const saveStepData = async (stepId: string): Promise<boolean> => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return false;
    }

    let response;
    try {
      switch (stepId) {
        case "basicInfo":
          response = await saveBasicInfo(formData.basicInfo, user.id);
          break;
        case "academicHistory":
          response = await saveAcademicHistory(
            formData.academicHistory,
            user.id
          );
          break;
        case "currentStatus":
          response = await saveCurrentStatus(formData.currentStatus, user.id);
          break;
        case "futurePlans":
          response = await saveFuturePlans(formData.futurePlans, user.id);
          break;
        default:
          throw new Error("Invalid step ID");
      }

      if (!response.success) {
        throw new Error(response.message || "Failed to save step data");
      }
      return true;
    } catch (error) {
      console.error(`Error saving ${stepId}:`, error);
      return false;
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      setModalOpen(false);
    } else {
      setCurrentStepIndex(currentStepIndex - 1);
      setValidationError(null);
    }
  };

  const handleNext = async () => {
    setValidationError(null);
    const isValid = validateStep(currentStep.id as keyof typeof formData);
    if (!isValid) {
      setValidationError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    const success = await saveStepData(currentStep.id);
    setIsLoading(false);

    if (!success) {
      setValidationError(
        `Failed to save ${currentStep.title.toLowerCase()}. Please try again.`
      );
      toast.error(`Failed to save ${currentStep.title.toLowerCase()}.`);
      return;
    }

    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }

    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    if (isLastStep) {
      setShowConfirmation(true);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    if (!user?.id) {
      toast.error("User not authenticated");
      setValidationError("User not authenticated");
      return;
    }

    try {
      setSubmitting(true);
      setIsLoading(true);

      // Save final step (futurePlans) if not already saved
      if (!completedSteps.includes("futurePlans")) {
        const success = await saveStepData("futurePlans");
        if (!success) {
          throw new Error("Failed to save future plans");
        }
        setCompletedSteps([...completedSteps, "futurePlans"]);
      }

      // Queue AI training
      setIsTraining(true);
      const trainingResponse = await queueAITraining(user.id);
      if (!trainingResponse.success) {
        console.warn(
          "AI training queue failed, but proceeding:",
          trainingResponse.message
        );
      }

      setCompleted(true);
      onComplete(formData.basicInfo.userStatus);
      toast.success("Profile data saved successfully! AI training initiated.");
      router.refresh();
      setModalOpen(false);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete onboarding. Please try again.");
      setValidationError("Failed to complete onboarding. Please try again.");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
      setIsTraining(false);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <>
      <div className="flex flex-col bg-background border border-border rounded-3xl max-w-7xl backdrop-blur-[106px]">
        <div className="grid grid-cols-12">
          <div className="col-span-4 p-6 flex items-center justify-center border-r border-border">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = index === currentStepIndex;
                const isPast = index < currentStepIndex;
                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <motion.div
                          initial={false}
                          animate={{
                            backgroundColor:
                              isCurrent || isCompleted
                                ? "rgb(147,51,234)"
                                : "rgb(31,41,55)",
                            scale: [isCurrent && !isCompleted ? 0.8 : 1, 1],
                            transition: { duration: 0.3 },
                          }}
                          className="flex items-center justify-center w-8 h-8 rounded-full z-10"
                        >
                          <AnimatePresence mode="wait">
                            {isCompleted ? (
                              <motion.div
                                key={"check"}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="w-5 h-5 text-white" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key={"number"}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="text-white"
                              >
                                <Check className="w-5 h-5 text-white/50" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        {index < steps.length - 1 && (
                          <div className="absolute top-8 left-4 w-0.5 h-16 bg-gray-700 overflow-hidden">
                            <motion.div
                              initial={{
                                height: isPast || isCompleted ? "100%" : "0%",
                                backgroundColor: "rgb(147,51,234)",
                              }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="w-full h-full"
                            ></motion.div>
                          </div>
                        )}
                      </div>
                      <div className="pt-1">
                        <motion.h3
                          animate={{
                            color:
                              isCurrent || isCompleted
                                ? "text-primary"
                                : "text-secondary",
                          }}
                          transition={{ duration: 0.3 }}
                          className="font-medium"
                        >
                          {step.title}
                        </motion.h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-8 overflow-y-auto max-h-[calc(100vh-200px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-primary">
                    {currentStep.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentStep.description}
                  </p>
                </div>
                {isLoading || isTraining ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="animate-spin h-8 w-8 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {isTraining
                        ? "Initiating AI training..."
                        : "Saving data..."}
                    </p>
                  </div>
                ) : (
                  <>
                    {currentStep.component}
                    {validationError && (
                      <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded-md flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm">{validationError}</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting || isLoading || isTraining}
            className={cn(
              "border-border text-primary hover:bg-muted",
              isFirstStep && "opacity-50 cursor-not-allowed"
            )}
          >
            {isFirstStep ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={handleNext}
            disabled={isSubmitting || isLoading || isTraining}
          >
            {isLastStep ? (
              isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                "Complete"
              )
            ) : (
              <>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Information</DialogTitle>
            <DialogDescription>
              Are you sure this information is correct? Our AI model will
              generate personalized learning paths based on this data. Please
              note that you can only modify this data in the premium version.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting || isLoading || isTraining}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting || isLoading || isTraining}
            >
              {isSubmitting || isLoading || isTraining ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Confirm and Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MultiStepForm;
