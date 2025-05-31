"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Rocket,
  Zap,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
  Check,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  User,
  Github,
  Twitter,
  Linkedin,
  Mail,
  GraduationCap,
  BarChart3,
  BookOpen,
  Trophy,
  Calendar,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const ModernLandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      title: "Dashboard",
      icon: BarChart3,
      description:
        "Comprehensive overview of your learning progress, achievements, and upcoming goals with interactive analytics.",
      features: [
        "Real-time progress tracking",
        "Personalized insights",
        "Performance analytics",
        "Goal visualization",
      ],
    },
    {
      title: "Learning Center",
      icon: BookOpen,
      description:
        "Access curated courses, tutorials, practice labs, and collaborative learning environments.",
      features: [
        "Interactive courses",
        "Hands-on tutorials",
        "Practice environments",
        "Study groups",
        "Content library",
      ],
    },
    {
      title: "Career Development",
      icon: Trophy,
      description:
        "Accelerate your career with skill assessments, goal tracking, and personalized learning paths.",
      features: [
        "Skill assessments",
        "Career goal setting",
        "Progress tracking",
        "Achievement system",
        "Project management",
      ],
    },
    {
      title: "Community",
      icon: Users,
      description:
        "Connect with peers, join discussions, and build your professional network in our vibrant community.",
      features: [
        "Professional networking",
        "Group discussions",
        "Peer messaging",
        "Leaderboards",
        "Blog sharing",
      ],
    },
    {
      title: "Smart Calendar",
      icon: Calendar,
      description:
        "Intelligent scheduling system that adapts to your learning goals and availability.",
      features: [
        "Smart scheduling",
        "Goal integration",
        "Reminder system",
        "Progress milestones",
      ],
    },
    {
      title: "Support System",
      icon: HelpCircle,
      description:
        "24/7 AI-powered support with comprehensive help resources and community assistance.",
      features: [
        "AI chat support",
        "Knowledge base",
        "Video tutorials",
        "Community help",
      ],
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Learners", icon: Users },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "500+", label: "Courses", icon: BookOpen },
    { number: "24/7", label: "AI Support", icon: Brain },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      quote:
        "The personalized learning paths and AI-driven insights helped me transition into a senior role within 8 months.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      quote:
        "The community features and peer learning made all the difference in my professional growth journey.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Data Scientist",
      quote:
        "Best investment in my career. The practice labs and real-world projects prepared me for industry challenges.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "0",
      period: "Free Forever",
      description: "Perfect for getting started with your learning journey",
      features: [
        "Basic dashboard access",
        "Limited course library",
        "Community participation",
        "Basic progress tracking",
        "Email support",
      ],
      popular: false,
      cta: "Start Free",
    },
    {
      name: "Professional",
      price: "29",
      period: "per month",
      description: "Complete access to accelerate your career growth",
      features: [
        "Full dashboard & analytics",
        "Unlimited course access",
        "Advanced career tools",
        "Priority community features",
        "AI-powered recommendations",
        "Live mentorship sessions",
        "Priority support",
      ],
      popular: true,
      cta: "Go Professional",
    },
    {
      name: "Enterprise",
      price: "99",
      period: "per month",
      description: "Advanced features for ambitious professionals",
      features: [
        "Everything in Professional",
        "Personal AI career coach",
        "Custom learning paths",
        "Advanced project tools",
        "API access",
        "Team collaboration",
        "White-label options",
        "Dedicated support",
      ],
      popular: false,
      cta: "Go Enterprise",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(59, 130, 246, 0.15) 0%,
            rgba(59, 130, 246, 0.08) 25%,
            rgba(59, 130, 246, 0.03) 50%,
            transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none fixed z-50 w-4 h-4 rounded-full bg-blue-400/40 blur-sm transition-all duration-75"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          boxShadow:
            "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)",
        }}
      />
      <div
        className="pointer-events-none fixed z-50 w-2 h-2 rounded-full bg-blue-300/60 transition-all duration-150"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
        }}
      />

      <div className="relative z-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Devix</h1>
                  <p className="text-xs text-muted-foreground">
                    Learn. Grow. Succeed.
                  </p>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {["Features", "Services", "Pricing", "Community"].map(
                  (item, index) => (
                    <motion.button
                      key={item}
                      className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  )
                )}
              </nav>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Link href={"/login"}>Get Started</Link>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  AI-Powered Career Platform
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="block text-foreground">Transform Your</span>
                <span className="block text-primary">Career Journey</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Experience the future of professional development with our
                comprehensive platform that combines AI-driven insights,
                interactive learning, and vibrant community support.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <Link href={"/register"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-primary/25 transition-all"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-border bg-background text-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-muted transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Explore Services</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Our Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and resources designed to accelerate your
                professional growth
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute -inset-1 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                  <div className="relative bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      className="absolute top-6 right-6 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Pricing Plans</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Choose Your Path Forward
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flexible plans designed to grow with your career ambitions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative group ${
                    plan.popular ? "md:scale-105" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: plan.popular ? 1.08 : 1.03 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="absolute -inset-1 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                  <div
                    className={`relative bg-card border-2 rounded-2xl p-8 h-full transition-all duration-300 ${
                      plan.popular
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-card-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="flex justify-center items-baseline mb-2">
                        <span className="text-4xl font-bold text-card-foreground">
                          ${plan.price}
                        </span>
                        {plan.period !== "Free Forever" && (
                          <span className="text-muted-foreground ml-2">
                            /{plan.period.split(" ")[1]}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {plan.period}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Success Stories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Trusted by Professionals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from professionals who transformed their careers
                with Devix
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -inset-1 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                  <div className="relative bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-card-foreground font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Ready to Start?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Begin Your Transformation Today
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of professionals who are accelerating their
                careers with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <Rocket className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-border bg-background text-foreground px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Sales
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 bg-card border-t border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      Devix
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Professional Development Platform
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Empowering professionals with AI-driven career development
                  tools, comprehensive learning resources, and vibrant community
                  support.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold text-card-foreground mb-4">
                  Platform
                </h4>
                <ul className="space-y-2">
                  {[
                    "Dashboard",
                    "Learning Center",
                    "Career Tools",
                    "Community",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-card-foreground mb-4">
                  Support
                </h4>
                <ul className="space-y-2">
                  {[
                    "Help Center",
                    "Documentation",
                    "Contact Us",
                    "Privacy Policy",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2025 Devix. All rights reserved. Built with passion for
                professional growth.
              </div>

              <div className="flex items-center gap-4">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Mail, href: "#", label: "Email" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernLandingPage;
