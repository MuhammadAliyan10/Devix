"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Award,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

type Props = {
  userId: string;
};

const CareerTab = ({ userId }: Props) => {
  // Mock data - replace with actual API calls
  const careerGoals = [
    {
      id: 1,
      title: "Become a Senior Software Engineer",
      progress: 65,
      deadline: "Dec 2024",
      nextMilestone: "Complete System Design Course",
    },
    {
      id: 2,
      title: "Learn Cloud Technologies",
      progress: 30,
      deadline: "Mar 2025",
      nextMilestone: "AWS Fundamentals Certification",
    },
  ];

  const skillAssessments = [
    {
      skill: "JavaScript",
      level: "Advanced",
      score: 85,
      lastTaken: "2 days ago",
      improvement: "+15%",
    },
    {
      skill: "React",
      level: "Intermediate",
      score: 72,
      lastTaken: "1 week ago",
      improvement: "+8%",
    },
    {
      skill: "Node.js",
      level: "Beginner",
      score: 45,
      lastTaken: "3 days ago",
      improvement: "New",
    },
  ];

  const achievements = [
    {
      title: "JavaScript Master",
      description: "Completed advanced JavaScript course",
      date: "2 days ago",
      type: "Course",
    },
    {
      title: "Problem Solver",
      description: "Solved 50 coding challenges",
      date: "1 week ago",
      type: "Practice",
    },
    {
      title: "Quick Learner",
      description: "Maintained 7-day learning streak",
      date: "3 days ago",
      type: "Streak",
    },
  ];

  const jobMarketInsights = {
    demandTrend: "High",
    averageSalary: "$95,000",
    topSkills: ["React", "TypeScript", "AWS"],
    openPositions: 1247,
  };

  return (
    <div className="space-y-6">
      {/* Career Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-4 w-4 text-primary" />
            </div>
            Career Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {careerGoals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{goal.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {goal.deadline}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Next: {goal.nextMilestone}
                  </span>
                  <Button size="sm" variant="outline">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment & Job Market */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              Recent Skill Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillAssessments.map((assessment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {assessment.skill}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {assessment.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Score: {assessment.score}%</span>
                      <span>•</span>
                      <span>{assessment.lastTaken}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs text-green-600"
                    >
                      {assessment.improvement}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Retake
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Take New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              Job Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {jobMarketInsights.demandTrend}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Market Demand
                  </div>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {jobMarketInsights.averageSalary}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg Salary
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  Top In-Demand Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jobMarketInsights.topSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">
                  {jobMarketInsights.openPositions} open positions
                </span>
                <Button size="sm">View Jobs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Award className="h-4 w-4 text-primary" />
            </div>
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <h4 className="font-medium text-foreground mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {achievement.type}
                  </Badge>
                  <span>{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerTab;
