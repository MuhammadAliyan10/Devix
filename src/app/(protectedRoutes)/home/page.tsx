"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  House,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Target,
  ChevronRight,
  Play,
  FileText,
  Image,
  BarChart3,
  Clock,
  Star,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import { Separator } from "@/components/ui/separator";

// Mock data based on your database schema
const mockUser = {
  name: "Muhammad Aliyan",
  currentSemester: 6,
  degree: "Bachelor of Computer Science",
  major: "Software Engineering",
  institution: "University of Punjab",
  subscription: "PREMIUM",
  userStatus: "STUDENT",
  skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
  interests: ["Web Development", "AI/ML", "Cloud Computing"],
};

const mockProgress = {
  overallProgress: 78,
  completedCourses: 12,
  totalCourses: 16,
  currentWeekProgress: 85,
  streak: 7,
};

const mockCareerPaths = [
  {
    id: "1",
    title: "Full Stack Developer",
    description: "Master both frontend and backend development",
    match: 92,
    icon: <BookOpen className="w-6 h-6" />,
    resources: 24,
    estimatedTime: "4-6 months",
  },
  {
    id: "2",
    title: "AI/ML Engineer",
    description: "Specialize in artificial intelligence and machine learning",
    match: 87,
    icon: <Zap className="w-6 h-6" />,
    resources: 18,
    estimatedTime: "6-8 months",
  },
  {
    id: "3",
    title: "Cloud Solutions Architect",
    description: "Design and implement cloud infrastructure solutions",
    match: 79,
    icon: <Target className="w-6 h-6" />,
    resources: 15,
    estimatedTime: "5-7 months",
  },
];

const mockRecentResources = [
  {
    id: "1",
    title: "Advanced React Patterns",
    type: "VIDEO",
    duration: "45 min",
    progress: 65,
    thumbnail: "/api/placeholder/300/200",
    subject: "Web Development",
  },
  {
    id: "2",
    title: "Database Design Principles",
    type: "TEXT",
    readTime: "15 min",
    progress: 100,
    thumbnail: "/api/placeholder/300/200",
    subject: "Database Systems",
  },
  {
    id: "3",
    title: "Machine Learning Algorithms",
    type: "INTERACTIVE",
    duration: "30 min",
    progress: 30,
    thumbnail: "/api/placeholder/300/200",
    subject: "Artificial Intelligence",
  },
];

const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do.",
  "Stay hungry, stay foolish.",
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case "VIDEO":
      return <Play className="w-4 h-4" />;
    case "TEXT":
      return <FileText className="w-4 h-4" />;
    case "INTERACTIVE":
      return <BarChart3 className="w-4 h-4" />;
    default:
      return <Image className="w-4 h-4" />;
  }
};

const Progress = ({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) => (
  <div
    className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}
  >
    <div
      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      variant === "secondary"
        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    } ${className}`}
  >
    {children}
  </span>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: any) => (
  <button
    className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${
      variant === "outline"
        ? "border border-input hover:bg-accent hover:text-accent-foreground"
        : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    } ${size === "sm" ? "h-9 px-3 text-sm" : "h-10 py-2 px-4"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const HomePage = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6 space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Welcome back,{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {mockUser.name}
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                {mockUser.degree} • Semester {mockUser.currentSemester} •{" "}
                {mockUser.institution}
              </p>
            </div>
            <Badge variant="secondary" className="mt-2 md:mt-0 py-2">
              {mockUser.subscription} Plan
            </Badge>
          </div>
          <Separator />

          {/* <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          >
            <p className="text-lg font-medium text-indigo-900 dark:text-indigo-100 italic">
              "{motivationalQuotes[currentQuote]}"
            </p>
          </motion.div> */}
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
                <div className="flex-1">
                  <div className="text-2xl font-bold text-foreground">
                    {mockProgress.overallProgress}%
                  </div>
                  <Progress
                    value={mockProgress.overallProgress}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProgress.completedCourses}/{mockProgress.totalCourses}
                  </div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProgress.currentWeekProgress}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weekly Progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Star className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProgress.streak}
                  </div>
                  <p className="text-sm text-muted-foreground">Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI-Suggested Career Paths */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              AI-Suggested Career Paths
            </h2>
            <Button variant="outline" size="sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockCareerPaths.map((path, index) => (
              <motion.div
                key={path.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <Badge className="mt-1">{path.match}% Match</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {path.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{path.resources} Resources</span>
                      <span>{path.estimatedTime}</span>
                    </div>
                    <Button className="w-full mt-4">
                      Explore Path <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Resources */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Continue Learning
            </h2>
            <Button variant="outline" size="sm">
              View All Resources <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecentResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{resource.type}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.duration || resource.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {resource.subject}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{resource.progress}%</span>
                      </div>
                      <Progress value={resource.progress} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Overview */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Skills & Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map((interest, index) => (
                      <Badge key={index}>{interest}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
