"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Play,
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  Code,
  Target,
} from "lucide-react";

type Props = {
  userId: string;
};

const LearningTab = ({ userId }: Props) => {
  // Mock data - replace with actual API calls
  const aiRecommendations = [
    {
      id: 1,
      title: "Advanced React Patterns",
      type: "Course",
      difficulty: "Intermediate",
      duration: "4 hours",
      progress: 0,
      aiReason: "Based on your JavaScript skills and career goals",
    },
    {
      id: 2,
      title: "System Design Fundamentals",
      type: "Course",
      difficulty: "Advanced",
      duration: "6 hours",
      progress: 0,
      aiReason: "Essential for your software engineering path",
    },
  ];

  const activeCourses = [
    {
      id: 1,
      title: "JavaScript Essentials",
      progress: 75,
      nextLesson: "Async/Await Patterns",
      timeLeft: "2 hours left",
    },
    {
      id: 2,
      title: "Database Design",
      progress: 45,
      nextLesson: "Normalization",
      timeLeft: "4 hours left",
    },
  ];

  const skillGaps = [
    { skill: "TypeScript", priority: "High", courses: 3 },
    { skill: "Docker", priority: "Medium", courses: 5 },
    { skill: "AWS", priority: "High", courses: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            AI Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-foreground">
                      {course.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {course.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {course.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {course.aiReason}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="ml-4">
                  Start Learning
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Learning */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Play className="h-4 w-4 text-primary" />
              </div>
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCourses.map((course) => (
                <div key={course.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">
                      {course.title}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Next: {course.nextLesson}
                    </span>
                    <span className="text-muted-foreground">
                      {course.timeLeft}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Continue Course
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              AI-Identified Skill Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.map((gap, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {gap.skill}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {gap.courses} courses available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        gap.priority === "High" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {gap.priority}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Learn
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practice Labs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Code className="h-4 w-4 text-primary" />
            </div>
            Practice Labs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "JavaScript Challenges",
              "SQL Practice",
              "Algorithm Problems",
            ].map((lab, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">{lab}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Practice with real-world scenarios
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningTab;
