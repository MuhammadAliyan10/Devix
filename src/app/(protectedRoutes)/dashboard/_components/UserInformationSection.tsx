"use client";
import { fetchUserData } from "@/app/actions/data";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  Target,
  Clock,
  Award,
  User,
  TrendingUp,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { UserData } from "@/lib/types";

type Props = {
  userId: string;
};

const UserInformationSection = ({ userId }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      try {
        const res = await fetchUserData(id);
        if ("success" in res && !res.success) {
          toast.error(res.message);
          return;
        }
        setUserData(res as UserData);
      } catch (error) {
        console.log(error);

        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading your information...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-destructive" />
          </div>
          <p className="text-sm text-muted-foreground">
            No user data available
          </p>
        </div>
      </div>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Current Semester
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.basicInfo.currentSemester}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Active Subjects
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.currentStatus.currentSubjects.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Skills
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.academicHistory.skills.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Weekly Hours
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.futurePlans.timeAvailability.hoursPerWeek}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Information Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium text-foreground">
                  {userData.basicInfo.name}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Major</span>
                <span className="text-sm font-medium text-foreground">
                  {userData.basicInfo.major}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Institution
                </span>
                <span className="text-sm font-medium text-foreground">
                  {userData.basicInfo.institution}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge variant="secondary" className="text-xs">
                  {userData.basicInfo.role}
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Experience
                </span>
                <span className="text-sm font-medium text-foreground">
                  {userData.basicInfo.userExperience}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic History */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              Academic History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.academicHistory.skills.length > 0 ? (
                  userData.academicHistory.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill.skillName}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No skills added yet
                  </span>
                )}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.academicHistory.certifications.length > 0 ? (
                  userData.academicHistory.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Award className="mr-1 h-3 w-3" />
                      {cert.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No certifications yet
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Status - Full Width */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            Current Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subjects Progress */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              Subject Progress
            </h4>
            <div className="space-y-4">
              {userData.currentStatus.currentSubjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {subject.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {subject.progress}%
                      </span>
                      {subject.progress === 100 && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                        subject.progress
                      )}`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Activities */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Internships
              </h4>
              <div className="space-y-2">
                {userData.currentStatus.internships.length > 0 ? (
                  userData.currentStatus.internships.map(
                    (internship, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Briefcase className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {internship.company}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No active internships
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Extracurriculars
              </h4>
              <div className="space-y-2">
                {userData.currentStatus.extracurriculars.length > 0 ? (
                  userData.currentStatus.extracurriculars.map(
                    (activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {activity.name}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No extracurricular activities
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Plans and Subscription */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Future Plans */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              Future Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Career Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.futurePlans.careerInterests.length > 0 ? (
                  userData.futurePlans.careerInterests.map(
                    (interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {interest.name}
                      </Badge>
                    )
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No career interests specified
                  </span>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Learning Style
                </span>
                <span className="text-sm font-medium text-foreground">
                  {userData.futurePlans.preferredLearningStyle}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Preferred Days
                </span>
                <span className="text-sm font-medium text-foreground">
                  {userData.futurePlans.timeAvailability.preferredDays.join(
                    ", "
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 mb-4">
                <span className="text-lg font-semibold text-primary">
                  {userData.subscription.plan}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your current subscription plan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserInformationSection;
