import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { useDevixStore } from "@/store/useDevixStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProgressStatus } from "@/lib/types";

type SemesterSubject = {
  name: string;
  grade?: string;
  status: ProgressStatus;
};

type PreviousSemester = {
  semester: number;
  year: number;
  subjects: SemesterSubject[];
  gpa?: number;
};

export default function AcademicBackground() {
  const { formData, getStepValidationErrors, updateAcademicHistoryField } =
    useDevixStore();
  const errors = getStepValidationErrors("academicHistory");
  const { previousSemesters } = formData.academicHistory;
  const { currentSemester } = formData.basicInfo;

  const [newSemester, setNewSemester] = useState<PreviousSemester>({
    semester: 0,
    year: new Date().getFullYear(),
    subjects: [],
    gpa: undefined,
  });
  const [newSubjects, setNewSubjects] = useState<{
    [key: number]: SemesterSubject;
  }>({});

  const getNewSubject = (semesterIndex: number): SemesterSubject => {
    return (
      newSubjects[semesterIndex] || {
        name: "",
        grade: "",
        status: ProgressStatus.COMPLETED,
      }
    );
  };

  const setNewSubject = (semesterIndex: number, subject: SemesterSubject) => {
    setNewSubjects((prev) => ({
      ...prev,
      [semesterIndex]: subject,
    }));
  };

  const handleAddSemester = () => {
    if (newSemester.semester > 0 && newSemester.year > 0) {
      updateAcademicHistoryField("previousSemesters", [
        ...previousSemesters,
        newSemester,
      ]);
      setNewSemester({
        semester: 0,
        year: new Date().getFullYear(),
        subjects: [],
        gpa: undefined,
      });
    }
  };

  const handleRemoveSemester = (semesterIndex: number) => {
    const updatedSemesters = previousSemesters.filter(
      (_, i) => i !== semesterIndex
    );
    updateAcademicHistoryField("previousSemesters", updatedSemesters);

    const updatedNewSubjects = { ...newSubjects };
    delete updatedNewSubjects[semesterIndex];
    setNewSubjects(updatedNewSubjects);
  };

  const handleAddSubject = (semesterIndex: number) => {
    const newSubject = getNewSubject(semesterIndex);
    if (newSubject.name.trim()) {
      const updatedSemesters = [...previousSemesters];
      updatedSemesters[semesterIndex] = {
        ...updatedSemesters[semesterIndex],
        subjects: [...updatedSemesters[semesterIndex].subjects, newSubject],
      };
      updateAcademicHistoryField("previousSemesters", updatedSemesters);

      setNewSubject(semesterIndex, {
        name: "",
        grade: "",
        status: ProgressStatus.COMPLETED,
      });
    }
  };

  const handleRemoveSubject = (semesterIndex: number, subjectIndex: number) => {
    const updatedSemesters = [...previousSemesters];
    updatedSemesters[semesterIndex].subjects = updatedSemesters[
      semesterIndex
    ].subjects.filter((_, i) => i !== subjectIndex);
    updateAcademicHistoryField("previousSemesters", updatedSemesters);
  };

  const handleSemesterFieldChange = (
    semesterIndex: number,
    field: keyof PreviousSemester,
    value: string | number
  ) => {
    const updatedSemesters = [...previousSemesters];
    if (field === "semester" || field === "year") {
      const numValue = typeof value === "string" ? parseInt(value) || 0 : value;
      updatedSemesters[semesterIndex] = {
        ...updatedSemesters[semesterIndex],
        [field]: numValue,
      };
    } else if (field === "gpa") {
      const numValue =
        typeof value === "string" ? parseFloat(value) || undefined : value;
      updatedSemesters[semesterIndex] = {
        ...updatedSemesters[semesterIndex],
        [field]: numValue,
      };
    }
    updateAcademicHistoryField("previousSemesters", updatedSemesters);
  };

  const handleSubjectFieldChange = (
    semesterIndex: number,
    subjectIndex: number,
    field: keyof SemesterSubject,
    value: string
  ) => {
    const updatedSemesters = [...previousSemesters];
    updatedSemesters[semesterIndex].subjects[subjectIndex] = {
      ...updatedSemesters[semesterIndex].subjects[subjectIndex],
      [field]: value,
    };
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
                  Semester {semester.semester} - {semester.year}
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
                    htmlFor={`semester-${semesterIndex}`}
                    className={cn(
                      "text-sm",
                      errors[`previousSemesters_${semesterIndex}_semester`] &&
                        "text-destructive"
                    )}
                  >
                    Semester <span className="text-destructive">*</span>
                  </Label>
                  {errors[`previousSemesters_${semesterIndex}_semester`] && (
                    <p className="text-xs text-destructive">
                      {errors[`previousSemesters_${semesterIndex}_semester`]}
                    </p>
                  )}
                  <Input
                    id={`semester-${semesterIndex}`}
                    type="number"
                    min="1"
                    max="10"
                    value={semester.semester || ""}
                    onChange={(e) =>
                      handleSemesterFieldChange(
                        semesterIndex,
                        "semester",
                        e.target.value
                      )
                    }
                    className={cn(
                      "bg-background border-border h-9 text-sm",
                      errors[`previousSemesters_${semesterIndex}_semester`] &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="e.g., 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`year-${semesterIndex}`}
                    className={cn(
                      "text-sm",
                      errors[`previousSemesters_${semesterIndex}_year`] &&
                        "text-destructive"
                    )}
                  >
                    Year <span className="text-destructive">*</span>
                  </Label>
                  {errors[`previousSemesters_${semesterIndex}_year`] && (
                    <p className="text-xs text-destructive">
                      {errors[`previousSemesters_${semesterIndex}_year`]}
                    </p>
                  )}
                  <Input
                    id={`year-${semesterIndex}`}
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    value={semester.year || ""}
                    onChange={(e) =>
                      handleSemesterFieldChange(
                        semesterIndex,
                        "year",
                        e.target.value
                      )
                    }
                    className={cn(
                      "bg-background border-border h-9 text-sm",
                      errors[`previousSemesters_${semesterIndex}_year`] &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="e.g., 2023"
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
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Subjects
                  </Label>
                  {errors[`previousSemesters_${semesterIndex}_subjects`] && (
                    <p className="text-xs text-destructive">
                      {errors[`previousSemesters_${semesterIndex}_subjects`]}
                    </p>
                  )}
                </div>

                {semester.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        value={subject.name || ""}
                        onChange={(e) =>
                          handleSubjectFieldChange(
                            semesterIndex,
                            subjectIndex,
                            "name",
                            e.target.value
                          )
                        }
                        className={cn(
                          "bg-background border-border h-9 text-sm",
                          errors[
                            `previousSemesters_${semesterIndex}_subjects_${subjectIndex}_name`
                          ] &&
                            "border-destructive focus-visible:ring-destructive"
                        )}
                        placeholder="Subject name"
                      />
                      {errors[
                        `previousSemesters_${semesterIndex}_subjects_${subjectIndex}_name`
                      ] && (
                        <p className="text-xs text-destructive mt-1">
                          {
                            errors[
                              `previousSemesters_${semesterIndex}_subjects_${subjectIndex}_name`
                            ]
                          }
                        </p>
                      )}
                    </div>

                    <Input
                      value={subject.grade || ""}
                      onChange={(e) =>
                        handleSubjectFieldChange(
                          semesterIndex,
                          subjectIndex,
                          "grade",
                          e.target.value
                        )
                      }
                      className="bg-background border-border w-20 h-9 text-sm"
                      placeholder="Grade"
                    />

                    <Select
                      value={subject.status || ProgressStatus.COMPLETED}
                      onValueChange={(value) =>
                        handleSubjectFieldChange(
                          semesterIndex,
                          subjectIndex,
                          "status",
                          value as ProgressStatus
                        )
                      }
                    >
                      <SelectTrigger className="w-32 bg-background border-border h-9 text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border text-sm">
                        {Object.values(ProgressStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleRemoveSubject(semesterIndex, subjectIndex)
                      }
                      className="text-destructive hover:text-destructive/80 h-9 w-9"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <div className="flex-1">
                    <Input
                      value={getNewSubject(semesterIndex).name}
                      onChange={(e) =>
                        setNewSubject(semesterIndex, {
                          ...getNewSubject(semesterIndex),
                          name: e.target.value,
                        })
                      }
                      className="bg-background border-border h-9 text-sm"
                      placeholder="Add new subject"
                    />
                  </div>

                  <Input
                    value={getNewSubject(semesterIndex).grade || ""}
                    onChange={(e) =>
                      setNewSubject(semesterIndex, {
                        ...getNewSubject(semesterIndex),
                        grade: e.target.value,
                      })
                    }
                    className="bg-background border-border w-20 h-9 text-sm"
                    placeholder="Grade"
                  />

                  <Select
                    value={getNewSubject(semesterIndex).status}
                    onValueChange={(value) =>
                      setNewSubject(semesterIndex, {
                        ...getNewSubject(semesterIndex),
                        status: value as ProgressStatus,
                      })
                    }
                  >
                    <SelectTrigger className="w-32 bg-background border-border h-9 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border text-sm">
                      {Object.values(ProgressStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    size="icon"
                    onClick={() => handleAddSubject(semesterIndex)}
                    disabled={!getNewSubject(semesterIndex).name.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={14} />
                  </Button>
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
                <Label htmlFor="new-semester" className="text-sm">
                  Semester <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="new-semester"
                  type="number"
                  min="1"
                  max="10"
                  value={newSemester.semester || ""}
                  onChange={(e) =>
                    setNewSemester({
                      ...newSemester,
                      semester: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-background border-border h-9 text-sm"
                  placeholder="Semester number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-year" className="text-sm">
                  Year <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="new-year"
                  type="number"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={newSemester.year || ""}
                  onChange={(e) =>
                    setNewSemester({
                      ...newSemester,
                      year:
                        parseInt(e.target.value) || new Date().getFullYear(),
                    })
                  }
                  className="bg-background border-border h-9 text-sm"
                  placeholder="Year"
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
                  placeholder="GPA (e.g., 3.5)"
                />
              </div>
            </div>

            <Button
              onClick={handleAddSemester}
              disabled={newSemester.semester <= 0 || newSemester.year <= 0}
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
