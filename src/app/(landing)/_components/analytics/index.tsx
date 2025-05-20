"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  Award,
  Clock,
  BarChart2,
  BookOpen,
  Target,
  TrendingUp,
  ChevronUp,
  ArrowUpRight,
  Circle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: string;
  payload: any;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-xl">
        <p className="font-medium text-white">{label}</p>
        <p className="text-blue-400 font-semibold">
          {payload[0].value} {payload[0].name === "hours" ? "hours" : "%"}
        </p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const activityData = [
    { name: "Mon", hours: 2.5 },
    { name: "Tue", hours: 3.8 },
    { name: "Wed", hours: 2.1 },
    { name: "Thu", hours: 4.2 },
    { name: "Fri", hours: 3.5 },
    { name: "Sat", hours: 1.8 },
    { name: "Sun", hours: 0.9 },
  ];

  const progressData = [
    { name: "Week 1", progress: 30 },
    { name: "Week 2", progress: 45 },
    { name: "Week 3", progress: 60 },
    { name: "Week 4", progress: 75 },
    { name: "Week 5", progress: 90 },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statCards = [
    {
      title: "Hours Studied",
      value: "18.8",
      change: "+12%",
      icon: Clock,
      color: "#3B82F6", // Blue
      bgColor: "#3B82F610",
      textColor: "#3B82F6",
    },
    {
      title: "Completed Topics",
      value: "24",
      change: "+8",
      icon: BookOpen,
      color: "#8B5CF6", // Purple
      bgColor: "#8B5CF610",
      textColor: "#8B5CF6",
    },
    {
      title: "Quizzes Passed",
      value: "12",
      change: "+3",
      icon: Award,
      color: "#10B981", // Green
      bgColor: "#10B98110",
      textColor: "#10B981",
    },
    {
      title: "Goals Achieved",
      value: "85%",
      change: "+5%",
      icon: Target,
      color: "#F59E0B", // Amber
      bgColor: "#F59E0B10",
      textColor: "#F59E0B",
    },
  ];

  const courseProgress = [
    {
      name: "Web Development Fundamentals",
      progress: 85,
      color: "#3B82F6", // Blue
    },
    {
      name: "Data Structures & Algorithms",
      progress: 64,
      color: "#8B5CF6", // Purple
    },
    {
      name: "UI/UX Design Principles",
      progress: 72,
      color: "#F97316", // Orange
    },
    {
      name: "Cloud Computing",
      progress: 38,
      color: "#06B6D4", // Cyan
    },
  ];

  return (
    <section
      id="analytics"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium mb-4 inline-block"
            style={{
              background:
                "linear-gradient(90deg, #3B82F615 0%, #8B5CF615 100%)",
              color: "#8B5CF6",
            }}
          >
            YOUR ANALYTICS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Track Your Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Visualize your learning journey with comprehensive analytics and
            insights tailored to your goals and activities.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statCards.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card
                className="h-full border-0 hover:shadow-xl transition-all hover:scale-105 p-1 rounded-2xl"
                style={{ background: stat.bgColor }}
              >
                <CardContent className="p-0">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="h-14 w-14 rounded-full flex items-center justify-center"
                        style={{ background: stat.bgColor }}
                      >
                        <stat.icon
                          className="h-6 w-6"
                          style={{ color: stat.color }}
                        />
                      </div>
                      <Badge
                        className="bg-white border-0 py-1 px-3 font-medium flex items-center gap-1 shadow-md"
                        style={{ color: "#10B981" }}
                      >
                        <ChevronUp className="h-3 w-3" />
                        {stat.change}
                      </Badge>
                    </div>
                    <h3
                      className="text-3xl font-bold mb-1"
                      style={{ color: stat.textColor }}
                    >
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-xl"
          >
            <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center mr-4"
                      style={{ background: "#3B82F610", color: "#3B82F6" }}
                    >
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: "#3B82F6" }}
                      >
                        Daily Activity
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Hours spent learning
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 px-3 py-1">
                    This Week
                  </Badge>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} barSize={40}>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3B82F6"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#2563EB"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <CartesianGrid
                        vertical={false}
                        stroke="#E5E7EB"
                        strokeDasharray="5 5"
                      />
                      <Bar
                        dataKey="hours"
                        fill="url(#barGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-xl"
          >
            <div className="p-1 bg-gradient-to-r from-purple-500 to-purple-600">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center mr-4"
                      style={{ background: "#8B5CF610", color: "#8B5CF6" }}
                    >
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: "#8B5CF6" }}
                      >
                        Semester Progress
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Weekly improvement trend
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400 px-3 py-1">
                    Current Semester
                  </Badge>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <defs>
                        <linearGradient
                          id="lineGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8B5CF6"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#C084FC"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <CartesianGrid
                        vertical={false}
                        stroke="#E5E7EB"
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="url(#lineGradient)"
                        strokeWidth={4}
                        dot={{
                          r: 8,
                          strokeWidth: 3,
                          stroke: "#8B5CF6",
                          fill: "white",
                        }}
                        activeDot={{
                          r: 10,
                          stroke: "#8B5CF6",
                          strokeWidth: 3,
                          fill: "white",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #3B82F610, #8B5CF610)",
                      color: "#3B82F6",
                    }}
                  >
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                      Course Completion Status
                    </h3>
                    <p className="text-gray-500">
                      Track your progress across different courses
                    </p>
                  </div>
                </div>

                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 py-1.5 px-4">
                  Current Semester
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {courseProgress.map((course, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Circle
                          className="h-4 w-4"
                          fill={course.color}
                          stroke="none"
                        />
                        <Circle
                          className="h-4 w-4 absolute top-0 left-0 animate-ping opacity-60"
                          fill={course.color}
                          stroke="none"
                        />
                      </div>
                      <h4 className="font-medium text-lg">{course.name}</h4>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">
                          On Track
                        </span>
                      </div>
                      <span
                        className="font-bold"
                        style={{ color: course.color }}
                      >
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: 0.2 + i * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${course.color}CC, ${course.color})`,
                          boxShadow: `0 0 10px ${course.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-6">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-blue-600 dark:text-blue-400">
                      Achievement Unlocked: Consistency Champion
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      You've maintained a study streak of 14 days! Keep up the
                      great work to unlock more achievements and boost your
                      learning momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
