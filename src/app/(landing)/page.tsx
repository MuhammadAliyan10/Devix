"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  House, // Replaced House
  BarChart2, // Replaced BarChart
  Trophy,
  TrendingUp,
  Brain,
  BookOpen, // Changed Book to BookOpen for consistency
  Target,
  ClipboardList,
  Star,
  Zap,
  Code,
  Rss,
  FileText,
  Users,
  Calendar,
  Globe,
  Bookmark,
  Heart,
  User,
  MessageCircle,
  Search,
  HelpCircle,
  Check,
} from "lucide-react";

const navItems = [
  { name: "Home", icon: House, section: null },
  { name: "Dashboard", icon: BarChart2, section: null },
  {
    name: "Career Development",
    icon: Trophy,
    section: "dropdown",
    children: [
      { name: "Progress Tracking", icon: TrendingUp },
      { name: "Skill Assessment", icon: Brain },
      { name: "Learning Resources", icon: BookOpen },
      { name: "Career Goals", icon: Target },
      { name: "Quizzes & Tests", icon: ClipboardList },
      { name: "Achievements", icon: Star },
      { name: "Career Path", icon: Zap },
    ],
  },
  {
    name: "Technology Hub",
    icon: Code,
    section: "dropdown",
    children: [
      { name: "Tech News", icon: Rss },
      { name: "Developer Blogs", icon: FileText },
      { name: "Community Forums", icon: Users },
      { name: "Code Snippets", icon: Code },
      { name: "Tech Events", icon: Calendar },
      { name: "Industry Trends", icon: Globe },
      { name: "Bookmarks", icon: Bookmark },
    ],
  },
  {
    name: "Learning Center",
    icon: BookOpen,
    section: "dropdown",
    children: [
      { name: "Courses", icon: BookOpen },
      { name: "Tutorials", icon: FileText },
      { name: "Practice Labs", icon: Code },
      { name: "Study Groups", icon: Users },
      { name: "Certifications", icon: Trophy },
      { name: "Saved Content", icon: Heart },
    ],
  },
  {
    name: "Social & Networking",
    icon: Users,
    section: "dropdown",
    children: [
      { name: "My Profile", icon: User },
      { name: "Connections", icon: Users },
      { name: "Messages", icon: MessageCircle },
      { name: "Group Discussions", icon: MessageCircle },
      { name: "Mentorship", icon: User },
      { name: "Job Board", icon: Search },
    ],
  },
  { name: "Calendar", icon: Calendar, section: null },
  { name: "Help & Support", icon: HelpCircle, section: null },
];

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border px-10 py-3"
        >
          <div className="flex items-center gap-4 text-primary">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-primary text-lg font-bold leading-tight tracking-[-0.015em]">
              Devix
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {["Home", "Features", "Pricing", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-primary text-sm font-medium leading-normal"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, color: "rgb(147,51,234)" }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <Link href="/login" className="truncate">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div
          id="home"
          className="px-4 sm:px-40 flex flex-1 justify-center py-5"
        >
          <motion.div
            className="layout-content-container flex flex-col max-w-[960px] flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="@container">
              <div className="@[480px]:p-4">
                <motion.div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 bg-gradient-to-r from-primary/20 to-secondary/20"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex flex-col gap-2 text-center"
                    variants={itemVariants}
                  >
                    <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                      Unlock Your Future with Devix
                    </h1>
                    <p className="text-muted-foreground text-sm font-normal leading-normal @[480px]:text-base">
                      Harness AI-driven insights and RAG-powered resources to
                      navigate your academic journey and achieve your career
                      aspirations.
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex-wrap gap-3 flex justify-center"
                    variants={itemVariants}
                  >
                    <Button
                      variant="secondary"
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      <Link href="/signup" className="truncate">
                        Get Started
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      <Link href="#pricing" className="truncate">
                        View Plans
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Features Section */}
            <motion.section
              id="features"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-5"
            >
              <motion.h2
                className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5"
                variants={itemVariants}
              >
                Explore Devix Features
              </motion.h2>
              <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3"
                variants={containerVariants}
              >
                {[
                  {
                    icon: Trophy,
                    title: "Career Development",
                    description:
                      "Track progress, assess skills, set goals, and receive AI-driven career path suggestions tailored to your academic and professional aspirations.",
                  },
                  {
                    icon: Code,
                    title: "Technology Hub",
                    description:
                      "Stay updated with tech news, blogs, forums, and code snippets. Bookmark trends and join events to boost your tech expertise.",
                  },
                  {
                    icon: BookOpen,
                    title: "Learning Center",
                    description:
                      "Access courses, tutorials, practice labs, and certifications. Join study groups and save content for personalized learning.",
                  },
                  {
                    icon: Users,
                    title: "Social & Networking",
                    description:
                      "Build your profile, connect with peers, engage in discussions, find mentors, and explore job opportunities through our community.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-1 gap-3 rounded-lg border border-border bg-background p-4 flex-col hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature.icon ? (
                      <feature.icon className="text-primary w-6 h-6" />
                    ) : null}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-primary text-base font-bold leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-normal leading-normal">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Detailed Services Section */}
            <motion.section
              id="services"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-5"
            >
              <motion.h2
                className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5"
                variants={itemVariants}
              >
                Our Services
              </motion.h2>
              {navItems
                .filter((item) => item.section === "dropdown")
                .map((category, index) => (
                  <motion.div
                    key={index}
                    className="mb-8"
                    variants={containerVariants}
                  >
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      variants={itemVariants}
                    >
                      {category.icon ? (
                        <category.icon className="text-primary w-6 h-6" />
                      ) : null}
                      <h3 className="text-primary text-lg font-bold leading-tight">
                        {category.name}
                      </h3>
                    </motion.div>
                    <motion.div
                      className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
                      variants={containerVariants}
                    >
                      {category.children?.map((child, childIndex) => (
                        <motion.div
                          key={childIndex}
                          className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-background hover:bg-primary/5 transition-colors"
                          variants={itemVariants}
                          whileHover={{ scale: 1.03 }}
                        >
                          {child.icon ? (
                            <child.icon className="text-primary w-5 h-5" />
                          ) : null}
                          <h4 className="text-primary text-sm font-medium leading-tight">
                            {child.name}
                          </h4>
                          <p className="text-muted-foreground text-xs font-normal leading-normal">
                            {getServiceDescription(child.name)}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
            </motion.section>

            {/* Pricing Section */}
            <motion.section
              id="pricing"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-5"
            >
              <motion.h2
                className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5"
                variants={itemVariants}
              >
                Pricing Plans
              </motion.h2>
              <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 py-3"
                variants={containerVariants}
              >
                {[
                  {
                    title: "Free",
                    price: "$0",
                    features: [
                      "Limited career suggestions",
                      "Basic progress tracking",
                      "Access to free resources",
                      "Community forums",
                    ],
                    buttonText: "Get Started",
                    variant: "outline",
                    highlight: false,
                  },
                  {
                    title: "Basic",
                    price: "$9.99",
                    features: [
                      "Unlimited career suggestions",
                      "Advanced progress tracking",
                      "Access to all resources",
                      "Priority support",
                      "Quizzes & tests",
                    ],
                    buttonText: "Subscribe",
                    variant: "secondary",
                    highlight: true,
                  },
                  {
                    title: "Premium",
                    price: "$19.99",
                    features: [
                      "All Basic features",
                      "Personalized mentorship",
                      "Exclusive community events",
                      "Premium resource access",
                      "Job board access",
                      "Certifications",
                    ],
                    buttonText: "Subscribe",
                    variant: "outline",
                    highlight: true,
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-1 flex-col gap-4 rounded-xl border border-border bg-background p-6 ${
                      plan.highlight ? "relative overflow-hidden" : ""
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    {plan.highlight && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-primary text-base font-bold leading-tight">
                          {plan.title}
                        </h3>
                        {plan.highlight && (
                          <p className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-xl bg-[#0c7ff2] px-3 py-[3px] text-center">
                            {plan.title === "Basic"
                              ? "Most Popular"
                              : "Best Value"}
                          </p>
                        )}
                      </div>
                      <p className="flex items-baseline gap-1 text-primary">
                        <span className="text-4xl font-black leading-tight tracking-[-0.033em]">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground text-base font-bold leading-tight">
                          /month
                        </span>
                      </p>
                    </div>
                    <Button
                      variant={plan.variant}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      <Link href="/signup" className="truncate">
                        {plan.buttonText}
                      </Link>
                    </Button>
                    <div className="flex flex-col gap-2">
                      {plan.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground"
                        >
                          <Check className="text-primary w-5 h-5" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
              id="testimonials"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-5"
            >
              <motion.h2
                className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5"
                variants={itemVariants}
              >
                What Our Users Say
              </motion.h2>
              <motion.div
                className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-8 p-4"
                variants={containerVariants}
              >
                {[
                  {
                    name: "Sarah M.",
                    quote:
                      "Devix’s AI-driven career suggestions helped me discover my passion for environmental science and provided resources to succeed.",
                    image: "",
                  },
                  {
                    name: "David L.",
                    quote:
                      "The progress tracking and quizzes kept me motivated throughout my college journey. Highly recommend!",
                    image: "",
                  },
                  {
                    name: "Emily R.",
                    quote:
                      "The mentorship and community support on Devix were invaluable for my career exploration.",
                    image: "",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-[200px] p-4 border border-border bg-background"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-16 h-16 mx-auto bg-muted" />
                    <div>
                      <p className="text-primary text-base font-medium leading-normal">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-sm font-normal leading-normal">
                        {testimonial.quote}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Footer Section */}
            <motion.footer
              className="flex justify-center px-4 py-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex max-w-[960px] flex-1 flex-col">
                <motion.div
                  className="flex flex-col gap-6 text-center @container"
                  variants={itemVariants}
                >
                  <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                    {["About", "Privacy Policy", "Terms", "Contact"].map(
                      (link, index) => (
                        <motion.a
                          key={index}
                          href={`#${link.toLowerCase().replace(" ", "-")}`}
                          className="text-muted-foreground text-base font-normal leading-normal min-w-40"
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, color: "rgb(147,51,234)" }}
                        >
                          {link}
                        </motion.a>
                      )
                    )}
                  </div>
                  <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    variants={itemVariants}
                  >
                    {[
                      { icon: "TwitterLogo", href: "#" },
                      { icon: "FacebookLogo", href: "#" },
                      { icon: "InstagramLogo", href: "#" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        variants={itemVariants}
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                          className="text-muted-foreground"
                        >
                          {social.icon === "TwitterLogo" && (
                            <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                          )}
                          {social.icon === "FacebookLogo" && (
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                          )}
                          {social.icon === "InstagramLogo" && (
                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                          )}
                        </svg>
                      </motion.a>
                    ))}
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground text-base font-normal leading-normal"
                    variants={itemVariants}
                  >
                    © 2025 Devix. All rights reserved.
                  </motion.p>
                </motion.div>
              </div>
            </motion.footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

function getServiceDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    "Progress Tracking":
      "Track your academic and career progress with AI-driven insights and milestones.",
    "Skill Assessment":
      "Assess your skills with AI-driven assessments to identify strengths and areas for growth.",
    "Learning Resources":
      "Access a curated library of articles, videos, and tutorials tailored to your goals.",
    "Career Goals":
      "Set and track personalized career objectives with AI guidance.",
    "Quizzes & Tests":
      "Test your knowledge with weekly AI-generated quizzes and practice tests.",
    Achievements:
      "Earn badges and rewards for completing milestones and goals.",
    "Career Path":
      "Receive tailored career recommendations based on your profile and interests.",
    "Tech News":
      "Access and enroll in courses to stay updated with the latest technology and trends.",
    "Developer Blogs":
      "Read insightful blogs from industry experts and developers.",
    "Community Forums":
      "Engage in discussions with peers and professionals in tech forums.",
    "Code Snippets":
      "Access and share reusable code snippets for your projects.",
    "Tech Events":
      "Discover and attend technology events, webinars, and conferences.",
    "Industry Trends": "Explore emerging trends shaping the tech industry.",
    Bookmarks: "Save articles, resources, and snippets for quick access.",
    Courses: "Enroll in structured courses designed for your learning style.",
    Tutorials: "Follow step-by-step guides to master new skills.",
    "Practice Labs": "Practice your skills with hands-on coding and tech labs.",
    "Study Groups":
      "Collaborate with peers in study groups for shared learning.",
    Certifications:
      "Earn industry-recognized certifications to boost your resume.",
    "Saved Content": "Bookmark and organize your favorite learning materials.",
    "My Profile":
      "Showcase your skills and access achievements, and goals on your profile.",
    Connections: "Connect with peers, mentors, and industry professionals.",
    Messages: "Communicate directly with connections and mentors via messages.",
    "Group Discussions":
      "Participate in group discussions on career and tech topics.",
    Mentorship: "Receive guidance and advice from experienced mentors.",
    "Job Board": "Explore job opportunities tailored to your skills and goals.",
  };
  return (
    descriptions[name] ||
    "Explore this feature to enhance your learning journey."
  );
}

export default LandingPage;
