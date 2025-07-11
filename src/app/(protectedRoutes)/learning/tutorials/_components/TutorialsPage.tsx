"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import InstructionDialog from "@/components/ReuseableComponents/UpdateInstructionDialog";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { FileText, Settings2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const tabsValue = [
  {
    name: "Recommended",
    value: "recommended",
    component: "<HomeTab />",
  },
  {
    name: "Links",
    value: "links",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];

const TutorialsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const { user } = useSession();
  const handleSaveInstruction = async () => {
    if (!instruction.trim()) {
      toast.error("Instruction cannot be empty");
      return;
    }
  };
  return (
    <div>
      <PageHeader
        heading="Tutorials"
        icon={<FileText className="w-10 h-10 text-primary" />}
        subtitle={`Tutorials for your ${user.major} courses, powered by AI`}
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update Tutorials"
            icon={<Settings2 className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <InstructionDialog
        dialogTitle="Update Tutorials"
        dialogOpenState={dialogOpen}
        dialogToggleFunction={setDialogOpen}
        dialogDescription="Provide instructions to customize your tutorial recommendations"
        inputValue={instruction}
        onChangeString={setInstruction}
        onAction={handleSaveInstruction}
      />
      <TabsComponent tabs={tabsValue} defaultValue="recommended" />
    </div>
  );
};

export default TutorialsPage;
