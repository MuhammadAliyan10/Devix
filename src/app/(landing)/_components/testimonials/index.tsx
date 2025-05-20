"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Student",
    university: "Stanford University",
    avatar: "/avatars/avatar-1.png",
    rating: 5,
    quote:
      "Devix transformed my learning experience. The personalized path selection helped me focus on what matters most for my career goals. The semester-specific resources are incredibly well-curated!",
    semester: "3rd Semester",
    field: "Web Development",
  },
  {
    name: "Maya Patel",
    role: "Data Science Student",
    university: "MIT",
    avatar: "/avatars/avatar-2.png",
    rating: 5,
    quote:
      "As someone transitioning into tech, Devix's tracking features helped me stay accountable. The visualizations of my progress kept me motivated, and the quizzes reinforced my learning effectively.",
    semester: "2nd Semester",
    field: "Data Science",
  },
  {
    name: "Daniel Lee",
    role: "UI/UX Design Student",
    university: "RISD",
    avatar: "/avatars/avatar-3.png",
    rating: 4,
    quote:
      "The community features on Devix allowed me to connect with other aspiring designers. The resources are top-notch and the career insights helped me land my first internship.",
    semester: "4th Semester",
    field: "UI/UX Design",
  },
  {
    name: "Sophia Williams",
    role: "Software Engineering Student",
    university: "Carnegie Mellon",
    avatar: "/avatars/avatar-4.png",
    rating: 5,
    quote:
      "I love how Devix adapts to my learning pace and provides resources that match exactly where I am in my studies. The tech news updates keep me informed of industry trends.",
    semester: "5th Semester",
    field: "Mobile Development",
  },
];

const universities = [
  { name: "Stanford University", logo: "/logos/stanford.svg" },
  { name: "MIT", logo: "/logos/mit.svg" },
  { name: "Harvard University", logo: "/logos/harvard.svg" },
  { name: "UC Berkeley", logo: "/logos/berkeley.svg" },
  { name: "Carnegie Mellon", logo: "/logos/cmu.svg" },
  { name: "Oxford University", logo: "/logos/oxford.svg" },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how Devix is helping students achieve their career goals and
            transform their learning experience.
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Card className="h-full border-none shadow-md dark:shadow-blue-900/5 bg-white dark:bg-gray-800 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-blue-100 dark:border-blue-900">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="relative mb-6">
                        <Quote className="absolute top-0 left-0 h-6 w-6 text-blue-200 dark:text-blue-900 -translate-x-2 -translate-y-2" />
                        <p className="text-gray-700 dark:text-gray-300 pl-4">
                          {testimonial.quote}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Badge variant="secondary" className="font-normal">
                          {testimonial.semester}
                        </Badge>
                        <Badge
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                          variant="secondary"
                        >
                          {testimonial.field}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative transform-none translate-y-0" />
              <CarouselNext className="relative transform-none translate-y-0" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-medium mb-8">
            Trusted by students from top universities worldwide
          </h3>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {universities.map((university, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="h-16 w-32 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="h-full w-full flex items-center justify-center">
                  {/* Placeholder for university logo */}
                  <div className="text-gray-400 dark:text-gray-500 font-medium text-center text-sm">
                    {university.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
