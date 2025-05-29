import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { useDevixStore } from "@/store/useDevixStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LearningStyle } from "@/lib/types";

type Props = {};

const FuturePlansStep = (props: Props) => {
  const {
    formData,
    updateFuturePlansField,
    getStepValidationErrors,
    setCompleted,
  } = useDevixStore();
  const { futurePlans } = formData;
  const errors = getStepValidationErrors("futurePlans");

  const [newCareerGoal, setNewCareerGoal] = useState("");
  const [newCareerInterest, setNewCareerInterest] = useState("");
  const [newPreferredDay, setNewPreferredDay] = useState("");

  const handleAddCareerGoal = () => {
    if (newCareerGoal.trim()) {
      updateFuturePlansField("careerGoals", [
        ...futurePlans.careerGoals,
        newCareerGoal,
      ]);
      setNewCareerGoal("");
    }
  };

  const handleRemoveCareerGoal = (goal: string) => {
    updateFuturePlansField(
      "careerGoals",
      futurePlans.careerGoals.filter((g) => g !== goal)
    );
  };

  const handleAddCareerInterest = () => {
    if (newCareerInterest.trim()) {
      updateFuturePlansField("careerInterests", [
        ...futurePlans.careerInterests,
        newCareerInterest,
      ]);
      setNewCareerInterest("");
    }
  };

  const handleRemoveCareerInterest = (interest: string) => {
    updateFuturePlansField(
      "careerInterests",
      futurePlans.careerInterests.filter((i) => i !== interest)
    );
  };

  const handleAddPreferredDay = () => {
    if (newPreferredDay.trim()) {
      updateFuturePlansField("timeAvailability", {
        ...futurePlans.timeAvailability,
        preferredDays: [
          ...futurePlans.timeAvailability.preferredDays,
          newPreferredDay,
        ],
      });
      setNewPreferredDay("");
    }
  };

  const handleRemovePreferredDay = (day: string) => {
    updateFuturePlansField("timeAvailability", {
      ...futurePlans.timeAvailability,
      preferredDays: futurePlans.timeAvailability.preferredDays.filter(
        (d) => d !== day
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Future Plans</h3>
        <p className="text-sm text-muted-foreground">
          Provide information about your career goals, interests, and study
          preferences.
        </p>
      </div>

      {/* Career Goals */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Career Goals <span className="text-destructive">*</span>
        </Label>
        {errors.careerGoals && (
          <p className="text-xs text-destructive">{errors.careerGoals}</p>
        )}
        <div className="space-y-2">
          {futurePlans.careerGoals.map((goal, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={goal}
                readOnly
                className="bg-background border-border h-9 text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCareerGoal(goal)}
                className="text-destructive hover:text-destructive/80 h-9 w-9"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newCareerGoal}
              onChange={(e) => setNewCareerGoal(e.target.value)}
              className="bg-background border-border h-9 text-sm"
              placeholder="Add new career goal"
            />
            <Button
              size="icon"
              onClick={handleAddCareerGoal}
              disabled={!newCareerGoal.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Career Interests */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Career Interests <span className="text-destructive">*</span>
        </Label>
        {errors.careerInterests && (
          <p className="text-xs text-destructive">{errors.careerInterests}</p>
        )}
        <div className="space-y-2">
          {futurePlans.careerInterests.map((interest, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={interest}
                readOnly
                className="bg-background border-border h-9 text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCareerInterest(interest)}
                className="text-destructive hover:text-destructive/80 h-9 w-9"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newCareerInterest}
              onChange={(e) => setNewCareerInterest(e.target.value)}
              className="bg-background border-border h-9 text-sm"
              placeholder="Add new career interest"
            />
            <Button
              size="icon"
              onClick={handleAddCareerInterest}
              disabled={!newCareerInterest.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Preferred Learning Style */}
      <div className="space-y-2">
        <Label
          htmlFor="learning-style"
          className={cn(
            "text-sm",
            errors.preferredLearningStyle && "text-destructive"
          )}
        >
          Preferred Learning Style <span className="text-destructive">*</span>
        </Label>
        {errors.preferredLearningStyle && (
          <p className="text-xs text-destructive">
            {errors.preferredLearningStyle}
          </p>
        )}
        <Select
          value={futurePlans.preferredLearningStyle}
          onValueChange={(value) =>
            updateFuturePlansField(
              "preferredLearningStyle",
              value as LearningStyle
            )
          }
        >
          <SelectTrigger
            id="learning-style"
            className="w-full bg-background border-border h-9 text-sm"
          >
            <SelectValue placeholder="Select learning style" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border text-sm">
            <SelectItem value={LearningStyle.VIDEO}>Video</SelectItem>
            <SelectItem value={LearningStyle.TEXT}>Text</SelectItem>
            <SelectItem value={LearningStyle.INTERACTIVE}>
              Interactive
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Time Availability */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Time Availability <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="hours-per-week"
              className={cn(
                "text-sm",
                errors.hoursPerWeek && "text-destructive"
              )}
            >
              Hours per Week
            </Label>
            {errors.hoursPerWeek && (
              <p className="text-xs text-destructive">{errors.hoursPerWeek}</p>
            )}
            <Input
              id="hours-per-week"
              type="number"
              min="0"
              value={futurePlans.timeAvailability.hoursPerWeek || ""}
              onChange={(e) =>
                updateFuturePlansField("timeAvailability", {
                  ...futurePlans.timeAvailability,
                  hoursPerWeek: parseInt(e.target.value) || 0,
                })
              }
              className={cn(
                "bg-background border-border h-9 text-sm",
                errors.hoursPerWeek &&
                  "border-destructive focus-visible:ring-destructive"
              )}
              placeholder="e.g., 10"
            />
          </div>
          <div className="space-y-2">
            <Label
              className={cn(
                "text-sm",
                errors.preferredDays && "text-destructive"
              )}
            >
              Preferred Days
            </Label>
            {errors.preferredDays && (
              <p className="text-xs text-destructive">{errors.preferredDays}</p>
            )}
            <div className="space-y-2">
              {futurePlans.timeAvailability.preferredDays.map((day, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={day}
                    readOnly
                    className="bg-background border-border h-9 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePreferredDay(day)}
                    className="text-destructive hover:text-destructive/80 h-9 w-9"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newPreferredDay}
                  onChange={(e) => setNewPreferredDay(e.target.value)}
                  className="bg-background border-border h-9 text-sm"
                  placeholder="Add preferred day"
                />
                <Button
                  size="icon"
                  onClick={handleAddPreferredDay}
                  disabled={!newPreferredDay.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Completion Date */}
      <div className="space-y-2">
        <Label
          htmlFor="target-completion-date"
          className={cn(
            "text-sm",
            errors.targetCompletionDate && "text-destructive"
          )}
        >
          Target Completion Date (Optional)
        </Label>
        {errors.targetCompletionDate && (
          <p className="text-xs text-destructive">
            {errors.targetCompletionDate}
          </p>
        )}
        <Input
          id="target-completion-date"
          type="date"
          value={futurePlans.targetCompletionDate || ""}
          onChange={(e) =>
            updateFuturePlansField("targetCompletionDate", e.target.value)
          }
          className={cn(
            "bg-background border-border h-9 text-sm",
            errors.targetCompletionDate &&
              "border-destructive focus-visible:ring-destructive"
          )}
          placeholder="YYYY-MM-DD"
        />
      </div>
    </div>
  );
};

export default FuturePlansStep;
