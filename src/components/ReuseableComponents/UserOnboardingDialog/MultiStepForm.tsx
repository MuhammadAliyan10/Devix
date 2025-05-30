import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDevixStore } from "@/store/useDevixStore";

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
  const { isSubmitting, setModalOpen, validateStep, formData, setSubmitting } =
    useDevixStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    if (!completedSteps.includes(currentStep.id)) {
      setIsLoading(true);
      setTimeout(() => {
        setCompletedSteps([...completedSteps, currentStep.id]);
        setIsLoading(false);
        proceedToNextStep();
      }, 1500);
    } else {
      proceedToNextStep();
    }
  };

  const proceedToNextStep = () => {
    if (isLastStep) {
      try {
        setSubmitting(true);
        router.refresh();
      } catch (error) {
        console.error("Error processing form", error);
        toast.error("Failed to process form. Please try again.");
        setValidationError("Failed to process form. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
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
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="animate-spin h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Storing and analyzing data for AI...
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
          disabled={isSubmitting || isLoading}
          className={cn(
            "border-border text-primary hover:bg-muted",
            isFirstStep && "opacity-50 cursor-not-allowed"
          )}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting || isLoading}>
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
  );
};

export default MultiStepForm;
