import { Code2, FileText, Globe, Layout } from "lucide-react";

export const features = [
  {
    icon: FileText,
    title: "Snippet Management",
    desc: "Organize, search, and share your code snippets with ease.",
  },
  {
    icon: Globe,
    title: "Cloud Sync",
    desc: "Access your snippets anywhere, anytime, on any device.",
  },
  {
    icon: Layout,
    title: "Syntax Highlighting",
    desc: "Beautiful, language-aware code display for every snippet.",
  },
  {
    icon: Code2,
    title: "Next.js & TypeScript",
    desc: "Built for modern web developers with best-in-class tech.",
  },
];

export const testimonials = [
  {
    name: "Alex J.",
    text: "Snippo AI has streamlined my workflow. The syntax highlighting and search are top-notch!",
  },
  {
    name: "Priya S.",
    text: "I love how clean and fast the UI is. Sharing snippets with my team is effortless.",
  },
  {
    name: "Devon K.",
    text: "The best snippet manager for developers. The pricing is super fair, too!",
  },
];

export const pricing = [
  {
    plan: "Free",
    price: "$0",
    features: [
      "Unlimited public snippets",
      "Basic search",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    plan: "Pro",
    price: "$8/mo",
    features: [
      "Unlimited private snippets",
      "Advanced search",
      "Team sharing",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    plan: "Team",
    price: "$20/mo",
    features: [
      "All Pro features",
      "Team management",
      "Usage analytics",
      "Custom domains",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];
