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

export const pricing = {
  monthly: [
    {
      plan: "Free Forever",
      price: "₹0",
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
      price: "₹249/mo",
      features: [
        "Unlimited private snippets",
        "Advanced search",
        "Team sharing",
        "Priority support",
      ],
      cta: "Get Started",
      highlight: true,
    },
  ],
  yearly: [
    {
      plan: "Free Forever",
      price: "₹0",
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
      price: "₹2,499/yr",
      features: [
        "Unlimited private snippets",
        "Advanced search",
        "Team sharing",
        "Priority support",
        "2 months free!",
      ],
      cta: "Get Started",
      highlight: true,
    },
  ],
};

export type SnipEntity = {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: string;
  folder?: string;
};

export const demoSnippets: SnipEntity[] = [
  {
    id: "1",
    title: "Hello World in Python",
    description: "A simple hello world script in Python.",
    code: "print('Hello, world!')",
    tags: ["python", "beginner"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "FizzBuzz in JavaScript",
    description: "Classic FizzBuzz implementation.",
    code: `for(let i=1;i<=100;i++){console.log((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)}`,
    tags: ["javascript", "interview"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Binary Search",
    description: "Binary search implementation in Python.",
    code: `def binary_search(arr, x):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] < x:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1`,
    tags: ["python", "algorithms"],
    createdAt: new Date().toISOString(),
    folder: "algorithms",
  },
  {
    id: "4",
    title: "Debounce Function",
    description: "Debounce utility in JavaScript.",
    code: `function debounce(fn, delay) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); }; }`,
    tags: ["javascript", "utils"],
    createdAt: new Date().toISOString(),
    folder: "utils",
  },
  {
    id: "5",
    title: "Throttle Function",
    description: "Throttle utility in JavaScript.",
    code: `function throttle(fn, limit) { let inThrottle; return function() { if (!inThrottle) { fn.apply(this, arguments); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }`,
    tags: ["javascript", "utils"],
    createdAt: new Date().toISOString(),
    folder: "utils",
  },
];
