"use client";
import { SubscriptionStatus } from "@/lib/types";
import { useSession } from "@/provider/SessionProvider";
import React, { useState } from "react";

import PremiumContent from "@/components/ReuseableComponents/PremiumFeatures/PremiumContent";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import { Code, Settings2 } from "lucide-react";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import InstructionDialog from "@/components/ReuseableComponents/UpdateInstructionDialog";
import { toast } from "sonner";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
const tabsValue = [
  {
    name: "Code Lab",
    value: "lab",
    component: "<HomeTab />",
  },
  {
    name: "Results",
    value: "results",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assisatnt",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];
const LabsPage = () => {
  const { user } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instruction, setInstruction] = useState("");

  if (user.subscriptionStatus !== SubscriptionStatus.FREE) {
    return (
      <PremiumContent
        title="Subscription Required"
        description="In order to access lab, you need to upgrade your plan. Subscription required to access labs."
        buttonContent="Upgrade Plan"
        route="/settings"
      />
    );
  }
  const handleSaveInstruction = async () => {
    if (!instruction.trim()) {
      toast.error("Instruction cannot be empty");
      return;
    }
  };

  return (
    <div>
      <PageHeader
        heading="Practice Lab"
        icon={<Code className="w-10 h-10 text-primary" />}
        subtitle={`Personalized AI-powered courses tailored to your ${user.major} studies`}
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update Content"
            icon={<Settings2 className="w-4 h-4" />}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <InstructionDialog
        dialogTitle="Update Lab"
        dialogOpenState={dialogOpen}
        dialogToggleFunction={setDialogOpen}
        dialogDescription="Provide instructions to customize your courses recommendations"
        inputValue={instruction}
        onChangeString={setInstruction}
        onAction={handleSaveInstruction}
      />
      <TabsComponent tabs={tabsValue} defaultValue="lab" />
    </div>
  );
};

export default LabsPage;
