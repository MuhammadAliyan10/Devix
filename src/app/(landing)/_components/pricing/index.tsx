"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

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

  const plans = [
    {
      name: "Basic",
      description: "Perfect for students just getting started",
      price: billingCycle === "monthly" ? 0 : 0,
      features: [
        "Free for first 2 months of each semester",
        "Access to basic learning paths",
        "Limited resources per semester",
        "Progress tracking",
        "Basic analytics dashboard",
      ],
      recommended: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "Ideal for dedicated students",
      price: billingCycle === "monthly" ? 9.99 : 7.99,
      features: [
        "Everything in Basic",
        "Unlimited access to all learning paths",
        "Complete semester-specific resources",
        "Personalized recommendations",
        "Advanced analytics and insights",
        "Exclusive quizzes and exercises",
        "Study group creation",
      ],
      recommended: true,
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
    },
    {
      name: "Team",
      description: "For study groups and classes",
      price: billingCycle === "monthly" ? 19.99 : 16.99,
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Collaborative learning tools",
        "Team analytics dashboard",
        "Shared resources and notes",
        "Priority support",
        "Custom learning tracks",
      ],
      recommended: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  const frequentlyAskedQuestions = [
    {
      question: "How does the semester-based pricing work?",
      answer:
        "Devix offers free access for the first 2 months of each semester. After that, you can choose a paid plan to continue accessing premium features and resources tailored to your current semester.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "Yes! Students with a valid university email can receive additional discounts on our Pro and Team plans. Contact our support team for more information.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Absolutely! We offer a 14-day money-back guarantee if you're not satisfied with your Devix experience.",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Choose the Perfect Plan for Your Learning Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Affordable plans designed for students at every stage. First 2
            months of each semester are always free!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-medium ${
              billingCycle === "monthly"
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Monthly
          </Label>
          <div className="flex items-center gap-2">
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annually"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "annually" : "monthly")
              }
            />
            {billingCycle === "annually" && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                Save 20%
              </Badge>
            )}
          </div>
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-medium ${
              billingCycle === "annually"
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Annually
          </Label>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card
                className={`h-full overflow-hidden border-2 ${
                  plan.recommended
                    ? "border-blue-500 dark:border-blue-600"
                    : "border-gray-200 dark:border-gray-800"
                } transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/10`}
              >
                {plan.recommended && (
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-1 text-xs font-medium uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{plan.name}</span>
                      <Badge
                        variant={plan.recommended ? "default" : "secondary"}
                        className={
                          plan.recommended
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : ""
                        }
                      >
                        {plan.name === "Basic" ? "Limited" : "Full Access"}
                      </Badge>
                    </div>
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">
                        {plan.price === 0 ? "Free" : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 mb-1">
                          /
                          {billingCycle === "monthly"
                            ? "mo"
                            : "mo (billed annually)"}
                        </span>
                      )}
                    </div>
                    {plan.name === "Basic" && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        For first 2 months of each semester
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.recommended
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mt-16 shadow-md dark:shadow-blue-900/5"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frequentlyAskedQuestions.map((faq, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <h4 className="font-medium">{faq.question}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Need a custom plan?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We offer special pricing for educational institutions and larger
              study groups. Contact our sales team to discuss your specific
              requirements.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="lg">
                    Contact Enterprise Sales
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Special discounts for academic institutions!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
