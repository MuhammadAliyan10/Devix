"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass,
  BookOpen,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Bell,
  BookMarked,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
  return (
    <Card className="border-none shadow-md dark:shadow-blue-900/5 bg-white dark:bg-gray-900 h-full">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Compass,
      title: "Career Path Guidance",
      description:
        "Discover and explore multiple relevant career paths based on your degree and interests.",
    },
    {
      icon: BookOpen,
      title: "Semester-wise Resources",
      description:
        "Access curated learning materials organized by semester to match your academic progress.",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "Visualize your learning journey with intuitive charts and progress indicators.",
    },
    {
      icon: TrendingUp,
      title: "Skill Building",
      description:
        "Enhance your abilities through interactive quizzes and exercises tailored to your path.",
    },
    {
      icon: Users,
      title: "Study Groups",
      description:
        "Collaborate with peers in secure study groups to share knowledge and experiences.",
    },
    {
      icon: MessageSquare,
      title: "Community Blogs",
      description:
        "Read and write blogs to share insights and learn from others in your field.",
    },
    {
      icon: Bell,
      title: "Industry Updates",
      description:
        "Stay informed with the latest tech news and trends relevant to your career path.",
    },
    {
      icon: BookMarked,
      title: "Personalized Recommendations",
      description:
        "Receive custom resource suggestions based on your activities and progress.",
    },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Devix provides all the tools and resources to help you navigate
              your academic journey and prepare for a successful career in
              technology.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Feature {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
