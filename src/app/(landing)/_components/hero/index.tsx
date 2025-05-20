"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  LineChart,
  Brain,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-12 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.div variants={item}>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
                <span className="mr-1">✨</span> Your career journey begins here
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              Build Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Tech Career
              </span>{" "}
              Path with Confidence
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Devix helps students navigate their academic journey with
              personalized career paths, semester-specific resources, progress
              tracking, and skill-building exercises.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Pathways
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-center space-x-4 text-gray-500 dark:text-gray-400"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs border-2 border-white dark:border-gray-900"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Joined by 10,000+ students</span>
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-1 shadow-lg dark:shadow-blue-900/10">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Web Development Path</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Semester 3 - Progress
                    </p>
                  </div>
                </div>

                <div className="space-y-4 my-6">
                  {[
                    {
                      icon: BookOpen,
                      name: "Resources Completed",
                      value: "85%",
                    },
                    { icon: Brain, name: "Quiz Performance", value: "92%" },
                    { icon: LineChart, name: "Activity Score", value: "78%" },
                    { icon: Users, name: "Group Projects", value: "4/5" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Overall Progress</span>
                  <span className="font-medium">75%</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
