import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { useDevixStore } from "@/store/useDevixStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PreviousSemester = {
  semesterName: string;
  gpa?: number;
  creditsEarned?: number;
};

export default function AcademicBackground() {
  const { formData, getStepValidationErrors, updateAcademicHistoryField } =
    useDevixStore();
  const errors = getStepValidationErrors("academicHistory");
  const { previousSemesters } = formData.academicHistory;
  const { currentSemester } = formData.basicInfo;

  const [newSemester, setNewSemester] = useState<PreviousSemester>({
    semesterName: "",
    gpa: undefined,
    creditsEarned: undefined,
  });

  const handleAddSemester = () => {
    if (newSemester.semesterName.trim()) {
      updateAcademicHistoryField("previousSemesters", [
        ...previousSemesters,
        newSemester,
      ]);
      setNewSemester({
        semesterName: "",
        gpa: undefined,
        creditsEarned: undefined,
      });
    }
  };

  const handleRemoveSemester = (semesterIndex: number) => {
    const updatedSemesters = previousSemesters.filter(
      (_, i) => i !== semesterIndex
    );
    updateAcademicHistoryField("previousSemesters", updatedSemesters);
  };

  const handleSemesterFieldChange = (
    semesterIndex: number,
    field: keyof PreviousSemester,
    value: string | number
  ) => {
    const updatedSemesters = [...previousSemesters];
    if (field === "semesterName") {
      updatedSemesters[semesterIndex] = {
        ...updatedSemesters[semesterIndex],
        [field]: value as string,
      };
    } else if (field === "gpa" || field === "creditsEarned") {
      const numValue =
        typeof value === "string" ? parseFloat(value) || undefined : value;
      updatedSemesters[semesterIndex] = {
        ...updatedSemesters[semesterIndex],
        [field]: numValue,
      };
    }
    updateAcademicHistoryField("previousSemesters", updatedSemesters);
  };

  return (
    <div className="space-y-6">
      {currentSemester <= 1 ? (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Plus size={24} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              No Academic Background Required
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Since you are in your first semester, you do not need to provide
              previous academic background. You can skip this step and continue
              with the next section.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Previous Semesters
            </h3>
            <p className="text-sm text-muted-foreground">
              Please provide information about your previous{" "}
              {currentSemester - 1} semester(s).
            </p>
            {errors.previousSemesters && (
              <p className="text-sm text-destructive">
                {errors.previousSemesters}
              </p>
            )}
          </div>

          {previousSemesters.map((semester, semesterIndex) => (
            <div
              key={semesterIndex}
              className="space-y-4 p-4 border border-border rounded-lg bg-card"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-foreground">
                  {semester.semesterName}
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSemester(semesterIndex)}
                  className="text-destructive hover:text-destructive/80 h-8 w-8"
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor={`semesterName-${semesterIndex}`}
                    className={cn(
                      "text-sm",
                      errors[
                        `previousSemesters_${semesterIndex}_semesterName`
                      ] && "text-destructive"
                    )}
                  >
                    Semester Name <span className="text-destructive">*</span>
                  </Label>
                  {errors[
                    `previousSemesters_${semesterIndex}_semesterName`
                  ] && (
                    <p className="text-xs text-destructive">
                      {
                        errors[
                          `previousSemesters_${semesterIndex}_semesterName`
                        ]
                      }
                    </p>
                  )}
                  <Input
                    id={`semesterName-${semesterIndex}`}
                    value={semester.semesterName || ""}
                    onChange={(e) =>
                      handleSemesterFieldChange(
                        semesterIndex,
                        "semesterName",
                        e.target.value
                      )
                    }
                    className={cn(
                      "bg-background border-border h-9 text-sm",
                      errors[
                        `previousSemesters_${semesterIndex}_semesterName`
                      ] && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="e.g., Fall 2023"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`gpa-${semesterIndex}`} className="text-sm">
                    GPA (Optional)
                  </Label>
                  <Input
                    id={`gpa-${semesterIndex}`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={semester.gpa || ""}
                    onChange={(e) =>
                      handleSemesterFieldChange(
                        semesterIndex,
                        "gpa",
                        e.target.value
                      )
                    }
                    className="bg-background border-border h-9 text-sm"
                    placeholder="e.g., 3.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`creditsEarned-${semesterIndex}`}
                    className="text-sm"
                  >
                    Credits Earned (Optional)
                  </Label>
                  <Input
                    id={`creditsEarned-${semesterIndex}`}
                    type="number"
                    min="0"
                    value={semester.creditsEarned || ""}
                    onChange={(e) =>
                      handleSemesterFieldChange(
                        semesterIndex,
                        "creditsEarned",
                        e.target.value
                      )
                    }
                    className="bg-background border-border h-9 text-sm"
                    placeholder="e.g., 15"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4 p-4 border border-dashed border-border rounded-lg">
            <h4 className="text-sm font-medium text-foreground">
              Add New Semester
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-semesterName" className="text-sm">
                  Semester Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="new-semesterName"
                  value={newSemester.semesterName || ""}
                  onChange={(e) =>
                    setNewSemester({
                      ...newSemester,
                      semesterName: e.target.value,
                    })
                  }
                  className="bg-background border-border h-9 text-sm"
                  placeholder="e.g., Fall 2023"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-gpa" className="text-sm">
                  GPA (Optional)
                </Label>
                <Input
                  id="new-gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={newSemester.gpa || ""}
                  onChange={(e) =>
                    setNewSemester({
                      ...newSemester,
                      gpa: parseFloat(e.target.value) || undefined,
                    })
                  }
                  className="bg-background border-border h-9 text-sm"
                  placeholder="e.g., 3.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-creditsEarned" className="text-sm">
                  Credits Earned (Optional)
                </Label>
                <Input
                  id="new-creditsEarned"
                  type="number"
                  min="0"
                  value={newSemester.creditsEarned || ""}
                  onChange={(e) =>
                    setNewSemester({
                      ...newSemester,
                      creditsEarned: parseInt(e.target.value) || undefined,
                    })
                  }
                  className="bg-background border-border h-9 text-sm"
                  placeholder="e.g., 15"
                />
              </div>
            </div>

            <Button
              onClick={handleAddSemester}
              disabled={!newSemester.semesterName.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} className="mr-2" />
              Add Semester
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
