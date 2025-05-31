import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  route: string;
  description: string;
  buttonContent: string;
};

const PremiumContent = ({
  title,
  description,
  route,
  buttonContent,
}: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 px-4 text-center">
      <h2 className="text-3xl font-bold text-primary">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      <Button
        onClick={() => router.push(route)}
        className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200"
      >
        <DollarSign className="w-4 h-4" />
        {buttonContent}
      </Button>
    </div>
  );
};

export default PremiumContent;
