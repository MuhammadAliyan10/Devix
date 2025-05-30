import React from "react";

import { cn } from "@/lib/utils";
import { UserStatus, UserExperience, ProgressStatus } from "@/lib/types";
import { useDevixStore } from "@/store/useDevixStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoStep() {
  const { formData, getStepValidationErrors, updateBasicInfoField } =
    useDevixStore();
  const errors = getStepValidationErrors("basicInfo");
  const {
    name,
    currentSemester,
    degree,
    major,
    institution,
    about,
    status,
    userStatus,
    userExperience,
  } = formData.basicInfo;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateBasicInfoField(
      name as keyof typeof formData.basicInfo,
      name === "currentSemester" ? Number(value) : value
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className={cn(errors.name && "text-destructive")}>
          Full Name <span className="text-destructive">*</span>
        </Label>
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
        <Input
          id="name"
          name="name"
          value={name || ""}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={cn(
            "bg-background border-border",
            errors.name && "border-destructive focus-visible:ring-destructive"
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="currentSemester"
            className={cn(errors.currentSemester && "text-destructive")}
          >
            Current Semester <span className="text-destructive">*</span>
          </Label>
          {errors.currentSemester && (
            <p className="text-sm text-destructive">{errors.currentSemester}</p>
          )}
          <Input
            id="currentSemester"
            name="currentSemester"
            type="number"
            value={currentSemester || ""}
            onChange={handleChange}
            placeholder="Enter current semester"
            className={cn(
              "bg-background border-border",
              errors.currentSemester &&
                "border-destructive focus-visible:ring-destructive"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="degree"
            className={cn(errors.degree && "text-destructive")}
          >
            Degree <span className="text-destructive">*</span>
          </Label>
          {errors.degree && (
            <p className="text-sm text-destructive">{errors.degree}</p>
          )}
          <Input
            id="degree"
            name="degree"
            value={degree || ""}
            onChange={handleChange}
            placeholder="Enter your degree"
            className={cn(
              "bg-background border-border",
              errors.degree &&
                "border-destructive focus-visible:ring-destructive"
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="major"
          className={cn(errors.major && "text-destructive")}
        >
          Major <span className="text-destructive">*</span>
        </Label>
        {errors.major && (
          <p className="text-sm text-destructive">{errors.major}</p>
        )}
        <Input
          id="major"
          name="major"
          value={major || ""}
          onChange={handleChange}
          placeholder="Enter your major"
          className={cn(
            "bg-background border-border",
            errors.major && "border-destructive focus-visible:ring-destructive"
          )}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="institution"
          className={cn(errors.institution && "text-destructive")}
        >
          Institution <span className="text-destructive">*</span>
        </Label>
        {errors.institution && (
          <p className="text-sm text-destructive">{errors.institution}</p>
        )}
        <Input
          id="institution"
          name="institution"
          value={institution || ""}
          onChange={handleChange}
          placeholder="Enter your institution"
          className={cn(
            "bg-background border-border",
            errors.institution &&
              "border-destructive focus-visible:ring-destructive"
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="status"
            className={cn(errors.status && "text-destructive")}
          >
            Progress Status <span className="text-destructive">*</span>
          </Label>
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status}</p>
          )}
          <Select
            value={status || ProgressStatus.NOT_STARTED}
            onValueChange={(value) =>
              updateBasicInfoField("status", value as ProgressStatus)
            }
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {Object.values(ProgressStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="userStatus"
            className={cn(errors.userStatus && "text-destructive")}
          >
            User Status <span className="text-destructive">*</span>
          </Label>
          {errors.userStatus && (
            <p className="text-sm text-destructive">{errors.userStatus}</p>
          )}
          <Select
            value={userStatus || UserStatus.STUDENT}
            onValueChange={(value) =>
              updateBasicInfoField("userStatus", value as UserStatus)
            }
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {Object.values(UserStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="userExperience"
          className={cn(errors.userExperience && "text-destructive")}
        >
          User Experience <span className="text-destructive">*</span>
        </Label>
        {errors.userExperience && (
          <p className="text-sm text-destructive">{errors.userExperience}</p>
        )}
        <Select
          value={userExperience || UserExperience.FRESHER}
          onValueChange={(value) =>
            updateBasicInfoField("userExperience", value as UserExperience)
          }
        >
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            {Object.values(UserExperience).map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          name="about"
          value={about || ""}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          className="bg-background border-border w-full"
        />
      </div>
    </div>
  );
}
