"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {
  dialogTitle: string;
  dialogOpenState: boolean;
  dialogToggleFunction: (open: boolean) => void;
  dialogDescription: string;
  inputValue: string;
  onChangeString: (value: string) => void;
  onAction: () => void;
};

const InstructionDialog = ({
  dialogTitle,
  dialogOpenState,
  dialogToggleFunction,
  dialogDescription,
  inputValue,
  onChangeString,
  onAction,
}: Props) => {
  return (
    <Dialog open={dialogOpenState} onOpenChange={dialogToggleFunction}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="courseInstruction">
            Instructions<span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="courseInstruction"
            placeholder="E.g., 'Focus on advanced Linear Algebra for Data Science'"
            value={inputValue}
            onChange={(e) => onChangeString(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => dialogToggleFunction(false)} // Explicitly close dialog
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onAction}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionDialog;
