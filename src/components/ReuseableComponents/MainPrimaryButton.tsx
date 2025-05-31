import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
  tooltipText?: string;
};

const MainPrimaryButton = ({
  text,
  className,
  icon,
  onAction,
  loading = false,
  disabled = false,
  tooltipText,
}: Props) => {
  const buttonContent = (
    <button
      onClick={onAction}
      disabled={loading || disabled}
      className={cn(
        "flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200",
        loading && "opacity-50 cursor-wait",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );

  return disabled ? (
    <Tooltip>
      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    buttonContent
  );
};

export default MainPrimaryButton;
