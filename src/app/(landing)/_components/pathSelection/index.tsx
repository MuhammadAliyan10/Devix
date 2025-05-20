"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Figma,
  Server,
  Cpu,
  Shield,
  Briefcase,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PathProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  courses: string[];
  color: string;
};

const PathCard = ({
  path,
  isSelected,
  onClick,
}: {
  path: PathProps;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 h-full
        ${
          isSelected
            ? "shadow-xl border-0"
            : "hover:shadow-lg border-0 hover:scale-105 transition-transform"
        }`}
      style={{
        background: isSelected ? path.color : "#ffffff10",
        boxShadow: isSelected ? `0 10px 30px ${path.color}30` : "",
      }}
      onClick={onClick}
    >
      <CardContent className="p-6 relative overflow-hidden">
        {isSelected && (
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="absolute transform rotate-45 bg-white dark:bg-white text-black dark:text-black font-medium text-xs py-1 text-center w-28 top-4 right-[-30px]">
              SELECTED
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-14 w-14 rounded-2xl flex items-center justify-center"
            style={{
              background: isSelected
                ? "rgba(255,255,255,0.2)"
                : `${path.color}15`,
              color: isSelected ? "white" : path.color,
            }}
          >
            <path.icon className="h-7 w-7" />
          </div>
          <div>
            <h3
              className={`font-bold text-xl ${
                isSelected ? "text-white" : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {path.title}
            </h3>
          </div>
        </div>

        <p
          className={`my-4 ${
            isSelected
              ? "text-white text-opacity-90"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {path.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {path.skills.slice(0, 3).map((skill, i) => (
            <Badge
              key={i}
              variant="outline"
              className={`
                ${
                  isSelected
                    ? "bg-white bg-opacity-20 border-white border-opacity-30 text-white"
                    : `bg-opacity-15 border-opacity-30`
                }
                font-medium py-1.5
              `}
              style={
                !isSelected
                  ? {
                      backgroundColor: `${path.color}15`,
                      borderColor: `${path.color}30`,
                      color: path.color,
                    }
                  : {}
              }
            >
              {skill}
            </Badge>
          ))}
          {path.skills.length > 3 && (
            <Badge
              variant="outline"
              className={`
                ${
                  isSelected
                    ? "bg-white bg-opacity-20 border-white border-opacity-30 text-white"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }
                font-medium py-1.5
              `}
            >
              +{path.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full"
        style={{
          background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
        }}
      />
    </div>
  );
};

const PathSelection = () => {
  const [selectedPath, setSelectedPath] = useState("webdev");
  const [activeTab, setActiveTab] = useState("overview");

  const paths = {
    webdev: {
      icon: Code,
      title: "Web Development",
      description:
        "Build modern, responsive websites and web applications using the latest technologies.",
      skills: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "Next.js",
      ],
      courses: [
        "Web Fundamentals",
        "Frontend Development",
        "Backend Development",
        "Full Stack Projects",
      ],
      color: "#6366F1", // Indigo
    },
    data: {
      icon: Database,
      title: "Data Science",
      description:
        "Analyze and interpret complex data to inform decision-making and drive business growth.",
      skills: [
        "Python",
        "SQL",
        "Machine Learning",
        "Data Visualization",
        "Statistics",
        "Pandas",
      ],
      courses: [
        "Data Analysis Basics",
        "Statistical Methods",
        "Machine Learning Fundamentals",
        "Applied Data Science",
      ],
      color: "#10B981", // Emerald
    },
    design: {
      icon: Figma,
      title: "UI/UX Design",
      description:
        "Create intuitive, user-centered digital experiences through research and design thinking.",
      skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "User Testing",
      ],
      courses: [
        "Design Principles",
        "User Interface Design",
        "User Experience Research",
        "Design Systems",
      ],
      color: "#F97316", // Orange
    },
    devops: {
      icon: Server,
      title: "DevOps Engineering",
      description:
        "Build, test, and maintain infrastructure and tools for fast and reliable software delivery.",
      skills: [
        "CI/CD",
        "Docker",
        "Kubernetes",
        "AWS/Azure",
        "Infrastructure as Code",
        "Monitoring",
      ],
      courses: [
        "Cloud Computing",
        "Container Management",
        "CI/CD Pipelines",
        "Infrastructure as Code",
      ],
      color: "#0EA5E9", // Sky blue
    },
    ai: {
      icon: Cpu,
      title: "AI/ML Engineering",
      description:
        "Develop intelligent systems using machine learning and deep learning techniques.",
      skills: [
        "TensorFlow",
        "PyTorch",
        "Deep Learning",
        "NLP",
        "Computer Vision",
        "Reinforcement Learning",
      ],
      courses: [
        "AI Fundamentals",
        "Neural Networks",
        "Natural Language Processing",
        "Computer Vision",
      ],
      color: "#8B5CF6", // Violet
    },
    security: {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Protect systems and networks by identifying vulnerabilities and implementing security measures.",
      skills: [
        "Network Security",
        "Cryptography",
        "Penetration Testing",
        "Security Auditing",
        "Risk Assessment",
      ],
      courses: [
        "Security Fundamentals",
        "Network Security",
        "Ethical Hacking",
        "Security Operations",
      ],
      color: "#EC4899", // Pink
    },
  };

  const currentPath = paths[selectedPath as keyof typeof paths];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="pathways"
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
                "linear-gradient(90deg, #6366F115 0%, #8B5CF615 100%)",
              color: "#8B5CF6",
            }}
          >
            CAREER PATHWAYS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Choose Your Path
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore diverse career paths tailored to your interests and goals.
            Each path offers curated resources and guidance to help you succeed
            in today's digital economy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full"
          >
            {Object.entries(paths).map(([id, path]) => (
              <motion.div key={id} variants={itemVariants}>
                <PathCard
                  path={path}
                  isSelected={selectedPath === id}
                  onClick={() => setSelectedPath(id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl shadow-2xl overflow-hidden"
        >
          <div
            className="p-1"
            style={{
              background: `linear-gradient(135deg, ${currentPath.color}, ${currentPath.color}CC)`,
            }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <div
                    className="h-20 w-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${currentPath.color}15`,
                      color: currentPath.color,
                    }}
                  >
                    <currentPath.icon className="h-10 w-10" />
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-bold mb-2"
                      style={{ color: currentPath.color }}
                    >
                      {currentPath.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentPath.description}
                    </p>
                  </div>
                </div>
                <Button
                  className="text-white px-8 py-6 font-medium text-base rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentPath.color}, ${currentPath.color}CC)`,
                    boxShadow: `0 10px 20px ${currentPath.color}30`,
                  }}
                >
                  Select This Path
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList
                  className="grid grid-cols-3 max-w-md mb-8 p-1.5 rounded-xl"
                  style={{
                    background: `${currentPath.color}15`,
                  }}
                >
                  {["overview", "skills", "courses"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={`rounded-lg py-3 font-medium transition-all
                        ${
                          activeTab === tab
                            ? "text-white"
                            : `text-gray-500 dark:text-gray-400 hover:text-${currentPath.color}`
                        }
                      `}
                      style={{
                        background:
                          activeTab === tab ? currentPath.color : "transparent",
                        boxShadow:
                          activeTab === tab
                            ? `0 5px 15px ${currentPath.color}40`
                            : "none",
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Briefcase,
                        title: "Job Outlook",
                        content:
                          "Strong demand with projected 22% growth over the next five years.",
                      },
                      {
                        icon: TrendingUp,
                        title: "Salary Range",
                        content:
                          "$70,000 - $150,000 depending on experience and specialization.",
                      },
                      {
                        icon: Calendar,
                        title: "Timeline",
                        content:
                          "6-12 months to entry-level proficiency with dedicated study.",
                      },
                    ].map((item, i) => (
                      <Card key={i} className="border-0 overflow-hidden">
                        <div
                          className="h-1.5 w-full"
                          style={{ background: currentPath.color }}
                        ></div>
                        <CardContent className="p-6">
                          <div
                            className="h-12 w-12 rounded-full flex items-center justify-center mb-4"
                            style={{
                              background: `${currentPath.color}15`,
                              color: currentPath.color,
                            }}
                          >
                            <item.icon className="h-6 w-6" />
                          </div>
                          <h4 className="text-lg font-bold mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="border-0 p-8">
                    <h4 className="text-xl font-bold mb-4">
                      Industry Insights
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      The {currentPath.title} field is evolving rapidly with new
                      frameworks and methodologies. Companies are seeking
                      professionals who can adapt quickly and build scalable
                      solutions. Starting with fundamentals and gradually
                      specializing is the recommended approach for students
                      entering this field.
                    </p>

                    <div className="mt-8">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        INDUSTRY GROWTH
                      </h5>
                      <ProgressBar percentage={85} />
                      <div className="flex justify-between text-sm mt-1">
                        <span>Current</span>
                        <span
                          className="font-medium"
                          style={{ color: currentPath.color }}
                        >
                          85% growth
                        </span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <Card className="border-0 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h4
                          className="text-xl font-bold mb-6 flex items-center"
                          style={{ color: currentPath.color }}
                        >
                          <div
                            className="h-6 w-6 rounded-md mr-3"
                            style={{ background: currentPath.color }}
                          ></div>
                          Technical Skills
                        </h4>
                        <div className="space-y-5">
                          {currentPath.skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="shrink-0 relative">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ background: currentPath.color }}
                                ></div>
                                <div
                                  className="absolute top-0 left-0 h-3 w-3 rounded-full animate-ping opacity-75"
                                  style={{ background: currentPath.color }}
                                ></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{skill}</span>
                                  <span
                                    className="text-sm"
                                    style={{ color: currentPath.color }}
                                  >
                                    {70 + Math.floor(Math.random() * 30)}%
                                  </span>
                                </div>
                                <ProgressBar
                                  percentage={
                                    70 + Math.floor(Math.random() * 30)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4
                          className="text-xl font-bold mb-6 flex items-center"
                          style={{ color: "#8B5CF6" }}
                        >
                          <div
                            className="h-6 w-6 rounded-md mr-3"
                            style={{ background: "#8B5CF6" }}
                          ></div>
                          Soft Skills
                        </h4>
                        <div className="space-y-5">
                          {[
                            "Problem Solving",
                            "Communication",
                            "Collaboration",
                            "Time Management",
                            "Continuous Learning",
                          ].map((skill, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="shrink-0 relative">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <div className="absolute top-0 left-0 h-3 w-3 rounded-full bg-purple-500 animate-ping opacity-75"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{skill}</span>
                                  <span className="text-sm text-purple-500">
                                    {70 + Math.floor(Math.random() * 30)}%
                                  </span>
                                </div>
                                <ProgressBar
                                  percentage={
                                    70 + Math.floor(Math.random() * 30)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h4 className="text-xl font-bold mb-6">
                        Learning Progression
                      </h4>
                      <div className="relative">
                        <div
                          className="absolute left-6 top-0 h-full w-1"
                          style={{ background: `${currentPath.color}30` }}
                        ></div>
                        <div className="space-y-10 pl-16">
                          {[
                            {
                              level: "Beginner",
                              description:
                                "Master the fundamental concepts and build simple projects.",
                            },
                            {
                              level: "Intermediate",
                              description:
                                "Develop more complex applications and deepen your technical knowledge.",
                            },
                            {
                              level: "Advanced",
                              description:
                                "Specialize in specific areas and contribute to larger-scale projects.",
                            },
                            {
                              level: "Expert",
                              description:
                                "Lead development initiatives and mentor others in your field.",
                            },
                          ].map((item, i) => (
                            <div key={i} className="relative">
                              <div
                                className="absolute -left-16 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                style={{
                                  background:
                                    i === 0
                                      ? currentPath.color
                                      : `linear-gradient(135deg, ${currentPath.color}40, ${currentPath.color}20)`,
                                  boxShadow:
                                    i === 0
                                      ? `0 0 0 4px ${currentPath.color}20`
                                      : "none",
                                }}
                              >
                                {i + 1}
                              </div>
                              <h5
                                className="text-xl font-bold mb-2"
                                style={{
                                  color: i === 0 ? currentPath.color : "",
                                }}
                              >
                                {item.level}
                              </h5>
                              <p className="text-gray-600 dark:text-gray-300">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="courses" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentPath.courses.map((course, i) => (
                      <Card
                        key={i}
                        className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div
                          className="h-2"
                          style={{
                            background: `linear-gradient(90deg, ${currentPath.color}, ${currentPath.color}80)`,
                          }}
                        ></div>
                        <CardContent className="p-8">
                          <h4
                            className="text-xl font-bold mb-3"
                            style={{ color: currentPath.color }}
                          >
                            {course}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Comprehensive curriculum covering essential concepts
                            and practical applications with hands-on projects.
                          </p>

                          <div className="mb-6">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-500">
                                Course completion
                              </span>
                              <span className="font-medium">0%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-500">
                                8 weeks • 24 lessons
                              </span>
                            </div>
                            <Button
                              className="text-white px-5 py-2 text-sm rounded-lg"
                              style={{
                                background: currentPath.color,
                                boxShadow: `0 4px 10px ${currentPath.color}30`,
                              }}
                            >
                              Start Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div
                    className="mt-8 p-6 rounded-xl flex items-center"
                    style={{
                      background: `${currentPath.color}10`,
                      border: `1px dashed ${currentPath.color}30`,
                    }}
                  >
                    <div
                      className="mr-6 text-3xl h-12 w-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `${currentPath.color}20`,
                        color: currentPath.color,
                      }}
                    >
                      💡
                    </div>
                    <div>
                      <h5
                        className="font-bold mb-1"
                        style={{ color: currentPath.color }}
                      >
                        Course Benefits
                      </h5>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                        style={{ color: currentPath.color }}
                      >
                        All courses include hands-on projects, mentor feedback,
                        and completion certificates to boost your portfolio.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PathSelection;
