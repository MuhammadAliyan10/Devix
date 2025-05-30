"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Rocket,
  Shield,
  Zap,
  Target,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
  Check,
  Network,
  Layers,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  User,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Building,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const UltraModernLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Modern gradient animations

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      {/* Ultra-Modern Cursor Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-all duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(139, 92, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 20%,
            transparent 50%)`,
        }}
      />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            y: backgroundY,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-sm"
            style={{
              width: el.size,
              height: el.size,
              left: `${el.x}%`,
              top: `${el.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-20">
        {/* Revolutionary Header */}
        <motion.header
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-40 backdrop-blur-2xl bg-slate-950/80 border-b border-violet-500/20"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo with Holographic Effect */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                        "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <GraduationCap className="w-6 h-6 text-white relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: [-100, 100] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-30 blur-lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                    Devix
                  </h1>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {["Home", "Features", "Pricing", "About"].map((item, index) => (
                  <motion.button
                    key={item}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </motion.button>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button className="relative bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 overflow-hidden group">
                  <Link
                    href={"/login"}
                    className="relative z-10 flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Revolutionary Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 relative">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span className="text-violet-200 font-medium">
                  AI-Powered Career Evolution
                </span>
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-6xl md:text-8xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.span
                  className="block bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Transform Your
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                >
                  Career Journey
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Experience the future of professional development with our{" "}
                <span className="text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text font-semibold">
                  AI-driven platform
                </span>{" "}
                that adapts to your unique career aspirations and learning
                style.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button className="relative bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 overflow-hidden">
                    <Link
                      href={"/login"}
                      className="relative z-10 flex items-center gap-3"
                    >
                      <Rocket className="w-6 h-6" />
                      Launch Your Future
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                      animate={{ x: [-200, 200] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button
                    variant="outline"
                    className="relative border-2 border-violet-500/50 bg-slate-900/50 backdrop-blur-xl text-white px-12 py-6 text-lg font-bold rounded-2xl hover:bg-violet-500/10 transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {[
                  { number: "50K+", label: "Active Users", icon: Users },
                  { number: "98%", label: "Success Rate", icon: TrendingUp },
                  { number: "500+", label: "Companies", icon: Building },
                  { number: "24/7", label: "AI Support", icon: Brain },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3 group-hover:text-blue-400 transition-colors" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
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
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </motion.div>
        </section>

        {/* Revolutionary Features Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Zap className="w-4 h-4 text-violet-400" />
                <span className="text-violet-200 text-sm font-medium">
                  Revolutionary Features
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                Redefine Your Potential
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience cutting-edge features powered by advanced AI that
                adapts to your unique journey
              </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI Career Intelligence",
                  description:
                    "Advanced machine learning algorithms analyze your skills, preferences, and market trends to provide personalized career recommendations.",
                  gradient: "from-violet-500 to-purple-600",
                  features: [
                    "Real-time market analysis",
                    "Skill gap identification",
                    "Personalized roadmaps",
                  ],
                },
                {
                  icon: Target,
                  title: "Smart Goal Setting",
                  description:
                    "Set intelligent goals that adapt to your progress and external factors, ensuring you stay on the optimal path to success.",
                  gradient: "from-blue-500 to-cyan-600",
                  features: [
                    "Dynamic goal adjustment",
                    "Progress tracking",
                    "Milestone celebrations",
                  ],
                },
                {
                  icon: Network,
                  title: "Quantum Networking",
                  description:
                    "Connect with the right people at the right time using our AI-powered networking engine that matches based on career synergy.",
                  gradient: "from-emerald-500 to-teal-600",
                  features: [
                    "Smart introductions",
                    "Mentorship matching",
                    "Collaborative projects",
                  ],
                },
                {
                  icon: Layers,
                  title: "Adaptive Learning",
                  description:
                    "Our platform learns from your interactions and continuously improves your experience with personalized content curation.",
                  gradient: "from-orange-500 to-red-600",
                  features: [
                    "Content personalization",
                    "Learning path optimization",
                    "Skill development tracking",
                  ],
                },
                {
                  icon: Shield,
                  title: "Future-Proof Skills",
                  description:
                    "Stay ahead of industry changes with our predictive analytics that identify emerging skills and technologies.",
                  gradient: "from-pink-500 to-rose-600",
                  features: [
                    "Trend prediction",
                    "Skill forecasting",
                    "Industry insights",
                  ],
                },
                {
                  icon: Rocket,
                  title: "Career Acceleration",
                  description:
                    "Accelerate your career growth with AI-driven strategies that optimize your professional development journey.",
                  gradient: "from-indigo-500 to-blue-600",
                  features: [
                    "Growth optimization",
                    "Opportunity identification",
                    "Performance analytics",
                  ],
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full group-hover:border-slate-600/50 transition-all duration-500">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-violet-200 group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}
                          />
                          <span className="text-sm text-gray-400">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute top-8 right-8 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6 text-violet-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Futuristic Pricing Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-200 text-sm font-medium">
                  Investment Plans
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
                Invest in Your Future
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the perfect plan to accelerate your career transformation
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "0",
                  period: "Free Forever",
                  tagline: "Perfect for exploration",
                  gradient: "from-slate-600 to-slate-800",
                  features: [
                    "AI Career Assessment",
                    "Basic Progress Tracking",
                    "Community Access",
                    "Weekly Insights",
                    "5 Skill Evaluations",
                  ],
                  popular: false,
                  cta: "Start Free",
                  description: "Begin your journey with essential tools",
                },
                {
                  name: "Professional",
                  price: "29",
                  period: "per month",
                  tagline: "Most popular choice",
                  gradient: "from-violet-600 to-blue-600",
                  features: [
                    "Everything in Starter",
                    "Advanced AI Coaching",
                    "Personalized Learning Paths",
                    "Priority Support",
                    "Unlimited Assessments",
                    "Industry Networking",
                    "Goal Optimization",
                  ],
                  popular: true,
                  cta: "Go Professional",
                  description:
                    "Accelerate your career with AI-powered insights",
                },
                {
                  name: "Enterprise",
                  price: "99",
                  period: "per month",
                  tagline: "For ambitious professionals",
                  gradient: "from-emerald-600 to-teal-600",
                  features: [
                    "Everything in Professional",
                    "Personal AI Career Coach",
                    "Executive Mentorship",
                    "Custom Learning Modules",
                    "API Access",
                    "Team Collaboration",
                    "Advanced Analytics",
                    "White-label Options",
                  ],
                  popular: false,
                  cta: "Go Enterprise",
                  description: "Maximum acceleration for career leaders",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative group ${
                    plan.popular ? "md:scale-105" : ""
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: plan.popular ? 1.08 : 1.03, y: -10 }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500`}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-slate-900/90 backdrop-blur-xl border-2 rounded-3xl p-8 h-full transition-all duration-500 ${
                      plan.popular
                        ? "border-violet-500/50 group-hover:border-violet-400/70"
                        : "border-slate-700/50 group-hover:border-slate-600/70"
                    }`}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Pricing Card Content */}
                    <div className="text-center mb-8">
                      <div className="flex justify-center items-baseline mb-4">
                        <span className="text-5xl font-black text-white">
                          ${plan.price}
                        </span>
                        {plan.period !== "Free Forever" && (
                          <span className="text-gray-400 ml-2 text-lg">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm max-w-xs mx-auto">
                        {plan.description}
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-violet-400" />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Button
                        className={`relative w-full bg-gradient-to-r ${plan.gradient} text-white px-8 py-4 text-lg font-bold rounded-xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 overflow-hidden group`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {plan.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                          animate={{ x: [-200, 200] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </Button>
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Heart className="w-4 h-4 text-blue-400" />
                <span className="text-blue-200 text-sm font-medium">
                  Trusted by Professionals
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Hear from professionals who transformed their careers with
                DevixAI
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Carter",
                  role: "Software Engineer",
                  quote:
                    "DevixAI's personalized career path helped me land my dream job at a top tech company in just 6 months!",
                  avatarGradient: "from-violet-500 to-blue-600",
                  rating: 5,
                },
                {
                  name: "Sarah Nguyen",
                  role: "Product Manager",
                  quote:
                    "The AI-driven insights and networking opportunities gave me the confidence to pivot into a leadership role.",
                  avatarGradient: "from-emerald-500 to-teal-600",
                  rating: 4,
                },
                {
                  name: "Michael Brown",
                  role: "Data Scientist",
                  quote:
                    "The adaptive learning system kept me ahead of industry trends, making me indispensable at work.",
                  avatarGradient: "from-pink-500 to-rose-600",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${testimonial.avatarGradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full group-hover:border-slate-600/50 transition-all duration-500">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-300 mb-6 leading-relaxed italic">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.avatarGradient} flex items-center justify-center`}
                      >
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 text-sm">
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

        {/* Final Call-to-Action Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Rocket className="w-4 h-4 text-violet-400" />
                <span className="text-violet-200 text-sm font-medium">
                  Ready to Transform?
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Join thousands of professionals who are accelerating their
                careers with Devix AI-powered platform.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button className="relative bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <Rocket className="w-6 h-6" />
                      Get Started Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                      animate={{ x: [-200, 200] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button
                    variant="outline"
                    className="relative border-2 border-violet-500/50 bg-slate-900/50 backdrop-blur-xl text-white px-12 py-6 text-lg font-bold rounded-2xl hover:bg-violet-500/10 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5" />
                      Contact Us
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 relative bg-slate-900/90 backdrop-blur-xl border-t border-violet-500/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                          "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                          "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <GraduationCap className="w-6 h-6 text-white relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        animate={{ x: [-100, 100] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-30 blur-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                      Devix
                    </h3>
                    <p className="text-xs text-violet-400">Next-Gen Platform</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Empowering professionals with AI-driven career transformation
                  tools.
                </p>
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h4 className="text-lg font-bold text-white mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {["Home", "Features", "Pricing", "About"].map(
                    (item, index) => (
                      <li key={index}>
                        <motion.a
                          href={`#${item.toLowerCase()}`}
                          className="text-gray-400 hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h4 className="text-lg font-bold text-white mb-4">Support</h4>
                <ul className="space-y-2">
                  {["Help Center", "Contact Us", "FAQ", "Terms of Service"].map(
                    (item, index) => (
                      <li key={index}>
                        <motion.a
                          href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                          className="text-gray-400 hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/MuhammadAliyan10"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="mailto:support@devixai.com"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              className="mt-12 pt-8 border-t border-slate-700/50 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p>
                &copy; {new Date().getFullYear()} DevixAI. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UltraModernLanding;
