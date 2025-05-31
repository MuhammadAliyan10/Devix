import React from "react";
import { cn } from "@/lib/utils";
import { useDevixStore } from "@/store/useDevixStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CurrentSubject = {
  name: string;
  progress: number;
  quizIds: string[];
};

type Extracurricular = {
  name: string;
  role: string;
  duration: string;
};

type Internship = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  skillsGained: string[];
};

export default function CurrentStatusStep() {
  const { formData, getStepValidationErrors, updateCurrentStatusField } =
    useDevixStore();
  const errors = getStepValidationErrors("currentStatus");
  const { currentSubjects, extracurriculars, internships } =
    formData.currentStatus;

  const [newSubject, setNewSubject] = React.useState<CurrentSubject>({
    name: "",
    progress: 0,
    quizIds: [],
  });
  const [newExtracurricular, setNewExtracurricular] =
    React.useState<Extracurricular>({ name: "", role: "", duration: "" });
  const [newInternship, setNewInternship] = React.useState<Internship>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    skillsGained: [],
  });
  const [newSkill, setNewSkill] = React.useState("");

  const handleAddSubject = () => {
    if (newSubject.name.trim()) {
      updateCurrentStatusField("currentSubjects", [
        ...currentSubjects,
        newSubject,
      ]);
      setNewSubject({
        name: "",
        progress: 0,
        quizIds: [],
      });
    }
  };

  const handleRemoveSubject = (index: number) => {
    updateCurrentStatusField(
      "currentSubjects",
      currentSubjects.filter((_, i) => i !== index)
    );
  };

  const handleAddExtracurricular = () => {
    if (newExtracurricular.name.trim() && newExtracurricular.role.trim()) {
      updateCurrentStatusField("extracurriculars", [
        ...extracurriculars,
        newExtracurricular,
      ]);
      setNewExtracurricular({ name: "", role: "", duration: "" });
    }
  };

  const handleRemoveExtracurricular = (index: number) => {
    updateCurrentStatusField(
      "extracurriculars",
      extracurriculars.filter((_, i) => i !== index)
    );
  };

  const handleAddInternship = () => {
    if (
      newInternship.company.trim() &&
      newInternship.role.trim() &&
      newInternship.startDate
    ) {
      updateCurrentStatusField("internships", [...internships, newInternship]);
      setNewInternship({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        skillsGained: [],
      });
    }
  };

  const handleRemoveInternship = (index: number) => {
    updateCurrentStatusField(
      "internships",
      internships.filter((_, i) => i !== index)
    );
  };

  const handleAddSkill = (index: number) => {
    if (newSkill.trim()) {
      const updatedInternships = [...internships];
      updatedInternships[index].skillsGained = [
        ...updatedInternships[index].skillsGained,
        newSkill.trim(),
      ];
      updateCurrentStatusField("internships", updatedInternships);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (internshipIndex: number, skillIndex: number) => {
    const updatedInternships = [...internships];
    updatedInternships[internshipIndex].skillsGained = updatedInternships[
      internshipIndex
    ].skillsGained.filter((_, i) => i !== skillIndex);
    updateCurrentStatusField("internships", updatedInternships);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          Current Subjects
        </h3>
        {errors.currentSubjects && (
          <p className="text-xs text-destructive">{errors.currentSubjects}</p>
        )}
        {currentSubjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor={`subject-name-${index}`} className="text-sm">
                Subject Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`subject-name-${index}`}
                value={subject.name}
                onChange={(e) => {
                  const updatedSubjects = [...currentSubjects];
                  updatedSubjects[index].name = e.target.value;
                  updateCurrentStatusField("currentSubjects", updatedSubjects);
                }}
                className={cn(
                  "bg-background border-border h-9 text-sm",
                  errors[`currentSubjects_${index}_name`] &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="e.g., Calculus"
              />
              {errors[`currentSubjects_${index}_name`] && (
                <p className="text-xs text-destructive">
                  {errors[`currentSubjects_${index}_name`]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={`progress-${index}`} className="text-sm">
                Progress (%) <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`progress-${index}`}
                type="number"
                value={subject.progress}
                onChange={(e) => {
                  const updatedSubjects = [...currentSubjects];
                  updatedSubjects[index].progress = Number(e.target.value);
                  updateCurrentStatusField("currentSubjects", updatedSubjects);
                }}
                className={cn(
                  "bg-background border-border h-9 text-sm",
                  errors[`currentSubjects_${index}_progress`] &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="e.g., 75"
                min="0"
                max="100"
              />
              {errors[`currentSubjects_${index}_progress`] && (
                <p className="text-xs text-destructive">
                  {errors[`currentSubjects_${index}_progress`]}
                </p>
              )}
            </div>
            <div className="space-y-1 flex items-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSubject(index)}
                className="text-destructive hover:text-destructive/80 h-9 w-9"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label htmlFor="new-subject-name" className="text-sm">
              New Subject
            </Label>
            <Input
              id="new-subject-name"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
              className="bg-background border-border h-9 text-sm"
              placeholder="Subject name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-progress" className="text-sm">
              Progress (%)
            </Label>
            <Input
              id="new-progress"
              type="number"
              value={newSubject.progress}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  progress: Number(e.target.value),
                })
              }
              className="bg-background border-border h-9 text-sm"
              placeholder="e.g., 75"
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-1 flex items-end">
            <Button
              size="icon"
              onClick={handleAddSubject}
              disabled={!newSubject.name.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          Extracurricular Activities
        </h3>
        {extracurriculars.map((activity, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <Label htmlFor={`activity-name-${index}`} className="text-sm">
                Activity <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`activity-name-${index}`}
                value={activity.name}
                onChange={(e) => {
                  const updatedActivities = [...extracurriculars];
                  updatedActivities[index].name = e.target.value;
                  updateCurrentStatusField(
                    "extracurriculars",
                    updatedActivities
                  );
                }}
                className={cn(
                  "bg-background border-border h-9 text-sm",
                  errors[`extracurriculars_${index}_name`] &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="e.g., Debate Club"
              />
              {errors[`extracurriculars_${index}_name`] && (
                <p className="text-xs text-destructive">
                  {errors[`extracurriculars_${index}_name`]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={`role-${index}`} className="text-sm">
                Role <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`role-${index}`}
                value={activity.role}
                onChange={(e) => {
                  const updatedActivities = [...extracurriculars];
                  updatedActivities[index].role = e.target.value;
                  updateCurrentStatusField(
                    "extracurriculars",
                    updatedActivities
                  );
                }}
                className={cn(
                  "bg-background border-border h-9 text-sm",
                  errors[`extracurriculars_${index}_role`] &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="e.g., President"
              />
              {errors[`extracurriculars_${index}_role`] && (
                <p className="text-xs text-destructive">
                  {errors[`extracurriculars_${index}_role`]}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={`duration-${index}`} className="text-sm">
                Duration <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`duration-${index}`}
                value={activity.duration}
                onChange={(e) => {
                  const updatedActivities = [...extracurriculars];
                  updatedActivities[index].duration = e.target.value;
                  updateCurrentStatusField(
                    "extracurriculars",
                    updatedActivities
                  );
                }}
                className={cn(
                  "bg-background border-border h-9 text-sm",
                  errors[`extracurriculars_${index}_duration`] &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="e.g., 2023-Present"
              />
              {errors[`extracurriculars_${index}_duration`] && (
                <p className="text-xs text-destructive">
                  {errors[`extracurriculars_${index}_duration`]}
                </p>
              )}
            </div>
            <div className="space-y-1 flex items-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExtracurricular(index)}
                className="text-destructive hover:text-destructive/80 h-9 w-9"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <Label htmlFor="new-activity-name" className="text-sm">
              New Activity
            </Label>
            <Input
              id="new-activity-name"
              value={newExtracurricular.name}
              onChange={(e) =>
                setNewExtracurricular({
                  ...newExtracurricular,
                  name: e.target.value,
                })
              }
              className="bg-background border-border h-9 text-sm"
              placeholder="Activity name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-role" className="text-sm">
              Role
            </Label>
            <Input
              id="new-role"
              value={newExtracurricular.role}
              onChange={(e) =>
                setNewExtracurricular({
                  ...newExtracurricular,
                  role: e.target.value,
                })
              }
              className="bg-background border-border h-9 text-sm"
              placeholder="Role"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-duration" className="text-sm">
              Duration
            </Label>
            <Input
              id="new-duration"
              value={newExtracurricular.duration}
              onChange={(e) =>
                setNewExtracurricular({
                  ...newExtracurricular,
                  duration: e.target.value,
                })
              }
              className="bg-background border-border h-9 text-sm"
              placeholder="Duration"
            />
          </div>
          <div className="space-y-1 flex items-end">
            <Button
              size="icon"
              onClick={handleAddExtracurricular}
              disabled={
                !newExtracurricular.name.trim() ||
                !newExtracurricular.role.trim() ||
                !newExtracurricular.duration.trim()
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">Internships</h3>
        {internships.map((internship, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`company-${index}`} className="text-sm">
                  Company <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`company-${index}`}
                  value={internship.company}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].company = e.target.value;
                    updateCurrentStatusField("internships", updatedInternships);
                  }}
                  className={cn(
                    "bg-background border-border h-9 text-sm",
                    errors[`internships_${index}_company`] &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="e.g., Tech Corp"
                />
                {errors[`internships_${index}_company`] && (
                  <p className="text-xs text-destructive">
                    {errors[`internships_${index}_company`]}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor={`internship-role-${index}`} className="text-sm">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`internship-role-${index}`}
                  value={internship.role}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].role = e.target.value;
                    updateCurrentStatusField("internships", updatedInternships);
                  }}
                  className={cn(
                    "bg-background border-border h-9 text-sm",
                    errors[`internships_${index}_role`] &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="e.g., Software Intern"
                />
                {errors[`internships_${index}_role`] && (
                  <p className="text-xs text-destructive">
                    {errors[`internships_${index}_role`]}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor={`startDate-${index}`} className="text-sm">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={internship.startDate}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].startDate = e.target.value;
                    updateCurrentStatusField("internships", updatedInternships);
                  }}
                  className={cn(
                    "bg-background border-border h-9 text-sm",
                    errors[`internships_${index}_startDate`] &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors[`internships_${index}_startDate`] && (
                  <p className="text-xs text-destructive">
                    {errors[`internships_${index}_startDate`]}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor={`endDate-${index}`} className="text-sm">
                  End Date
                </Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={internship.endDate || ""}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].endDate =
                      e.target.value || undefined;
                    updateCurrentStatusField("internships", updatedInternships);
                  }}
                  className="bg-background border-border h-9 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Skills Gained</Label>
              <div className="flex flex-wrap gap-2">
                {internship.skillsGained.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    <span>{skill}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(index, skillIndex)}
                      className="text-destructive hover:text-destructive/80 p-0 h-4 w-4"
                    >
                      <Trash2 size={10} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="bg-background border-border h-9 text-sm"
                  placeholder="Add skill"
                />
                <Button
                  size="icon"
                  onClick={() => handleAddSkill(index)}
                  disabled={!newSkill.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveInternship(index)}
              className="text-destructive hover:text-destructive/80 h-9 text-sm"
            >
              Remove Internship
            </Button>
          </div>
        ))}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Add New Internship
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <Label htmlFor="new-company" className="text-sm">
                Company
              </Label>
              <Input
                id="new-company"
                value={newInternship.company}
                onChange={(e) =>
                  setNewInternship({
                    ...newInternship,
                    company: e.target.value,
                  })
                }
                className="bg-background border-border h-9 text-sm"
                placeholder="Company name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-internship-role" className="text-sm">
                Role
              </Label>
              <Input
                id="new-internship-role"
                value={newInternship.role}
                onChange={(e) =>
                  setNewInternship({ ...newInternship, role: e.target.value })
                }
                className="bg-background border-border h-9 text-sm"
                placeholder="Role"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-startDate" className="text-sm">
                Start Date
              </Label>
              <Input
                id="new-startDate"
                type="date"
                value={newInternship.startDate}
                onChange={(e) =>
                  setNewInternship({
                    ...newInternship,
                    startDate: e.target.value,
                  })
                }
                className="bg-background border-border h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-endDate" className="text-sm">
                End Date
              </Label>
              <Input
                id="new-endDate"
                type="date"
                value={newInternship.endDate || ""}
                onChange={(e) =>
                  setNewInternship({
                    ...newInternship,
                    endDate: e.target.value,
                  })
                }
                className="bg-background border-border h-9 text-sm"
              />
            </div>
          </div>
          <Button
            onClick={handleAddInternship}
            disabled={
              !newInternship.company.trim() ||
              !newInternship.role.trim() ||
              !newInternship.startDate
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Internship
          </Button>
        </div>
      </div>
    </div>
  );
}
