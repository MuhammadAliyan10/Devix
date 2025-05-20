"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Learning Paths", href: "#path-selection" },
      { name: "Resources", href: "#resources" },
      { name: "Analytics", href: "#analytics" },
      { name: "Pricing", href: "#pricing" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Partner Program", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Community Forum", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold">Devix</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Empowering students to forge their ideal career path through
              personalized learning experiences, resources, and analytics.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Education Avenue, Tech Campus, CA 94103
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  contact@devix.education
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Desktop links */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 hidden md:grid"
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                {links.product.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {links.company.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {links.support.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Mobile accordion */}
          <div className="col-span-3 md:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="product">
                <AccordionTrigger className="font-semibold">
                  Product
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 ml-4">
                    {links.product.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                        >
                          <ChevronRight className="h-3 w-3 mr-1" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company">
                <AccordionTrigger className="font-semibold">
                  Company
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 ml-4">
                    {links.company.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                        >
                          <ChevronRight className="h-3 w-3 mr-1" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support">
                <AccordionTrigger className="font-semibold">
                  Support
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 ml-4">
                    {links.support.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center"
                        >
                          <ChevronRight className="h-3 w-3 mr-1" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get the latest news, updates and educational resources delivered
              straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none sm:rounded-r-none flex-grow"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-l-none sm:rounded-l-none">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from Devix.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © {currentYear} Devix. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
