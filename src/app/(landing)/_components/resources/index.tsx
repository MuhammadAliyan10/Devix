"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Github,
  Code,
  FileBadge,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ResourceProps = {
  title: string;
  type: "article" | "video" | "code" | "document" | "certificate" | "quiz";
  preview: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
};

const ResourceCard = ({ resource }: { resource: ResourceProps }) => {
  const icons = {
    article: FileText,
    video: Video,
    code: Github,
    document: BookOpen,
    certificate: FileBadge,
    quiz: Code,
  };

  const Icon = icons[resource.type];

  const difficultyColors = {
    beginner:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    intermediate:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    advanced:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  };

  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </div>
          <Badge className={difficultyColors[resource.difficulty]}>
            {resource.difficulty.charAt(0).toUpperCase() +
              resource.difficulty.slice(1)}
          </Badge>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {resource.duration}
          </div>
        </div>

        <h3 className="font-medium text-lg mt-3">{resource.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
          {resource.preview}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </span>
          <Button size="sm" variant="outline">
            View Resource
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Resources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const resources = {
    webdev: [
      {
        title: "Modern React Development with Hooks",
        type: "article",
        preview:
          "Learn how to build efficient React applications using modern hooks and patterns.",
        difficulty: "intermediate",
        duration: "15 min read",
      },
      {
        title: "Building a REST API with Node.js and Express",
        type: "video",
        preview:
          "Step-by-step tutorial on creating a fully functional REST API from scratch.",
        difficulty: "intermediate",
        duration: "45 min",
      },
      {
        title: "CSS Grid and Flexbox Mastery",
        type: "document",
        preview: "Comprehensive guide to modern layout techniques in CSS.",
        difficulty: "beginner",
        duration: "30 min read",
      },
      {
        title: "Full-Stack E-commerce Project",
        type: "code",
        preview:
          "Complete project walkthrough with React, Node.js, and MongoDB.",
        difficulty: "advanced",
        duration: "2 hours",
      },
    ],
    datascience: [
      {
        title: "Data Analysis with Pandas",
        type: "article",
        preview:
          "Master data manipulation and analysis using Python's Pandas library.",
        difficulty: "beginner",
        duration: "20 min read",
      },
      {
        title: "Machine Learning Algorithms Explained",
        type: "video",
        preview:
          "Visual explanation of key ML algorithms with practical examples.",
        difficulty: "intermediate",
        duration: "60 min",
      },
      {
        title: "SQL for Data Scientists",
        type: "document",
        preview: "Essential SQL queries and techniques for data analysis.",
        difficulty: "beginner",
        duration: "25 min read",
      },
      {
        title: "Predictive Analytics Challenge",
        type: "quiz",
        preview: "Test your knowledge with real-world prediction problems.",
        difficulty: "advanced",
        duration: "45 min",
      },
    ],
    design: [
      {
        title: "Design Systems for Beginners",
        type: "article",
        preview: "Learn how to create and implement consistent design systems.",
        difficulty: "beginner",
        duration: "18 min read",
      },
      {
        title: "User Research Techniques",
        type: "video",
        preview: "Effective methods for gathering user insights and feedback.",
        difficulty: "intermediate",
        duration: "35 min",
      },
      {
        title: "Figma Prototyping Masterclass",
        type: "code",
        preview:
          "Create interactive prototypes with advanced Figma techniques.",
        difficulty: "advanced",
        duration: "90 min",
      },
      {
        title: "UI Design Principles Certificate",
        type: "certificate",
        preview: "Earn a certificate in fundamental UI design principles.",
        difficulty: "beginner",
        duration: "2 hours",
      },
    ],
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="resources" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Learning Resources</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Access curated, high-quality learning materials organized by topic
            and semester to help you master your field.
          </p>
        </motion.div>

        <Tabs defaultValue="webdev" className="mt-8">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="webdev">Web Development</TabsTrigger>
            <TabsTrigger value="datascience">Data Science</TabsTrigger>
            <TabsTrigger value="design">UI/UX Design</TabsTrigger>
          </TabsList>

          {Object.entries(resources).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {items.map((resource, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <ResourceCard resource={resource as ResourceProps} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Explore our complete library of resources tailored to your academic
            progress.
          </p>
          <Button size="lg" className="px-8">
            View All Resources
          </Button>
        </div>

        <div className="mt-16 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-blue-900/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Semester-Specific Resources
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our intelligent system recommends the most relevant resources
                based on your current semester and progress.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button variant="outline" className="rounded-r-none">
                  Semester 1
                </Button>
                <Button variant="outline" className="rounded-none border-x-0">
                  Semester 2
                </Button>
                <Button variant="outline" className="rounded-none border-r">
                  Semester 3
                </Button>
                <Button className="rounded-l-none">Semester 4</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
