"use client";

import { useState, useEffect } from "react";

import { NavbarDemo } from "./_components/navbar/Nabar";
import Hero from "./_components/hero";
import Features from "./_components/features";
import PathSelection from "./_components/pathSelection";
import Resources from "./_components/resources";
import Analytics from "./_components/analytics";
import Testimonials from "./_components/testimonials";
import Pricing from "./_components/pricing";
import Footer from "./_components/footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDemo />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <Features />
          <PathSelection />
          <Resources />
          <Analytics />
          <Testimonials />
          <Pricing />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
