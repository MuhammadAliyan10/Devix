"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Sparkles,
  Rocket,
  Zap,
  ArrowRight,
  Play,
  ChevronDown,
  Check,
  TrendingUp,
  Users,
  Shield,
  Globe,
  Code,
  Cpu,
  Eye,
  Target,
  Headphones,
  GraduationCap,
  MessageCircle,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

import { QuantumParticles } from "./components/QuantumParticles";
import { GlassCard } from "./components/GlassCard";
import { Navigation } from "./components/Navigation";

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "services", ref: servicesRef },
        { id: "features", ref: featuresRef },
        { id: "pricing", ref: pricingRef },
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = section.ref.current;
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "AI-Powered Learning",
      icon: Brain,
      description:
        "Personalized learning paths that adapt to your unique style and pace, powered by advanced AI algorithms.",
      features: ["Custom Study Plans", "Progress Tracking", "Adaptive Content"],
    },
    {
      title: "Interactive Quizzes",
      icon: Cpu,
      description:
        "Engage with dynamic quizzes that provide instant feedback and track your knowledge progression.",
      features: [
        "Instant Feedback",
        "Dynamic Questions",
        "Performance Analytics",
      ],
    },
    {
      title: "Immersive Content",
      icon: Eye,
      description:
        "Rich, interactive learning materials that make complex concepts engaging and memorable.",
      features: ["3D Visualizations", "Video Lessons", "Interactive Modules"],
    },
    {
      title: "Secure Progress",
      icon: Shield,
      description:
        "Your learning data is protected with enterprise-grade security and privacy controls.",
      features: ["Encrypted Data", "Privacy Controls", "Secure Storage"],
    },
    {
      title: "Smart Guidance",
      icon: Target,
      description:
        "AI-powered recommendations and real-time guidance to keep you on track with your goals.",
      features: ["Goal Setting", "Milestone Alerts", "Personalized Tips"],
    },
    {
      title: "Mobile Learning",
      icon: Zap,
      description:
        "Learn anywhere with our responsive mobile platform, optimized for on-the-go education.",
      features: ["Offline Access", "Mobile Sync", "Cross-Device"],
    },
  ];

  const stats = [
    { number: "1M+", label: "Active Learners", icon: Users },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "10K+", label: "Learning Paths", icon: Brain },
    { number: "24/7", label: "AI Support", icon: Headphones },
  ];

  const features = [
    {
      icon: Code,
      title: "Advanced APIs",
      description:
        "Seamless integration with learning tools through our comprehensive API ecosystem.",
    },
    {
      icon: Zap,
      title: "Real-Time Feedback",
      description:
        "Instant assessment and progress updates powered by machine learning algorithms.",
    },
    {
      icon: Shield,
      title: "Data Security",
      description:
        "Enterprise-grade encryption and privacy controls protect your learning journey.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Learn from anywhere with our globally distributed, scalable platform.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free Explorer",
      price: "0",
      period: "Forever",
      description: "Perfect for getting started with AI learning",
      features: [
        "Basic study plans",
        "Community support",
        "3 weekly quizzes",
        "Standard security",
      ],
      cta: "Start Free",
      popular: false,
      icon: Rocket,
    },
    {
      name: "Pro Learner",
      price: "29",
      period: "month",
      description: "Advanced tools for serious learners",
      features: [
        "Unlimited study plans",
        "Advanced quizzes",
        "Priority support",
        "AI guidance",
        "Mobile access",
        "Analytics",
      ],
      cta: "Go Pro",
      popular: true,
      icon: Brain,
    },
    {
      name: "Elite Scholar",
      price: "99",
      period: "month",
      description: "Premium experience for academic excellence",
      features: [
        "Everything in Pro",
        "Personal AI tutor",
        "24/7 support",
        "Offline access",
        "Certification",
        "Group tools",
      ],
      cta: "Go Elite",
      popular: false,
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-slate-900">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.03),transparent_70%)]" />
        </motion.div>
      </div>

      {/* Quantum Particles */}
      <QuantumParticles count={80} />

      <div className="relative z-10">
        <Navigation activeSection={activeSection} />

        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center pt-20 relative"
        >
          <motion.div
            className="max-w-7xl mx-auto px-6 text-center relative z-10"
            style={{ y: textY }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-black/20 border border-white/10 rounded-full mb-8 backdrop-blur-xl hover:bg-black/30 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white/80" />
              </motion.div>
              <span className="text-sm font-medium text-white/90">
                Next-Generation Learning Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Unlock Your
                </motion.span>
                <motion.span
                  className="block text-white/90"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Learning Potential
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  with AI
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              Experience personalized learning with AI-driven paths, interactive
              content, and secure progress tracking.
              <span className="text-white font-semibold">
                {" "}
                Master your goals
              </span>{" "}
              with technology that adapts to
              <span className="text-white font-semibold">
                {" "}
                your unique needs
              </span>
              .
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold flex items-center space-x-3 text-lg shadow-2xl overflow-hidden hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6" />
                <span>Start Learning</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.button
                className="group px-8 py-4 bg-black/20 border border-white/10 rounded-full font-semibold flex items-center space-x-3 text-lg backdrop-blur-xl hover:bg-black/30 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group text-center cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    {stat.number}
                  </div>
                  <div className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center space-y-2 text-slate-400 cursor-pointer group">
              <span className="text-sm group-hover:text-white transition-colors duration-300">
                Explore Platform
              </span>
              <ChevronDown className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          ref={servicesRef}
          className="py-32 px-6 relative"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Learning
                <span className="block text-white/90">Solutions</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Comprehensive AI-powered tools designed to transform your
                educational experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <GlassCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={featuresRef}
          className="py-32 px-6 relative"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Platform
                <span className="block text-white/90">Features</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Advanced capabilities that power your learning journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group flex items-start space-x-6 p-8 rounded-2xl hover:bg-black/20 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white/90 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Choose Your
                <span className="block text-white/90">Learning Plan</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Flexible pricing options to match your educational goals
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative group ${
                    plan.popular ? "md:scale-105" : ""
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: plan.popular ? 1.08 : 1.05, y: -10 }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </motion.div>
                  )}

                  <div
                    className={`relative p-8 bg-black/20 border rounded-2xl backdrop-blur-xl transition-all duration-300 h-full ${
                      plan.popular
                        ? "border-white/30 bg-black/30"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-slate-300 text-sm mb-6">
                        {plan.description}
                      </p>
                      <div className="flex justify-center items-baseline mb-2">
                        <span className="text-4xl font-bold text-white">
                          ${plan.price}
                        </span>
                        {plan.period !== "Forever" && (
                          <span className="text-slate-300 ml-2">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-white/80 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative p-16 bg-black/20 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">
                  Ready to Transform
                  <span className="block text-white/90">Your Learning?</span>
                </h2>
                <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of learners who are already achieving their
                  goals with our AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold flex items-center justify-center space-x-3 text-lg shadow-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Rocket className="w-6 h-6" />
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    className="group px-8 py-4 bg-black/20 border border-white/10 rounded-full font-semibold flex items-center justify-center space-x-3 text-lg backdrop-blur-xl hover:bg-black/30 hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Contact Sales</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-white">Devix</span>
                </div>
                <p className="text-slate-300 max-w-md text-lg leading-relaxed mb-8">
                  Revolutionizing education with AI-powered personalized
                  learning experiences.
                </p>
                <div className="flex space-x-4">
                  {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                    <motion.button
                      key={index}
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  Platform
                </h4>
                <ul className="space-y-4">
                  {[
                    "AI Learning",
                    "Interactive Quizzes",
                    "Progress Tracking",
                    "Mobile App",
                  ].map((item) => (
                    <li key={item}>
                      <button className="text-slate-300 hover:text-white transition-colors duration-300">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  Support
                </h4>
                <ul className="space-y-4">
                  {["Help Center", "Documentation", "Community", "Contact"].map(
                    (item) => (
                      <li key={item}>
                        <button className="text-slate-300 hover:text-white transition-colors duration-300">
                          {item}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10">
              <div className="text-slate-400 text-sm mb-6 md:mb-0">
                © 2024 Devix Education. All rights reserved.
              </div>
              <div className="text-slate-400 text-sm">
                Built with ❤️ for learners worldwide
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
