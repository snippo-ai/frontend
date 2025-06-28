import { auth } from "@/auth";
import { Metadata } from "next";
import DemoSection from "./_components/home/demo-section";
import Faqs from "./_components/home/faqs";
import FeaturesSection from "./_components/home/features-section";
import HeroSection from "./_components/home/hero-section";
import PricingSection from "./_components/home/pricing-section";
import TestimonialsSection from "./_components/home/testimonials-section";

export const metadata: Metadata = {
  title: "Snippo AI - Supercharge Your Coding Workflow",
  description:
    "The modern, AI-powered code snippet manager for developers. Organize, search, and share code with ease.",
  keywords: [
    "code snippets",
    "developer tools",
    "AI",
    "coding workflow",
    "snippet manager",
  ],
  authors: [{ name: "Snippo Team" }],
  creator: "Snippo",
  publisher: "Snippo",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snippo.app",
    title: "Snippo AI - Supercharge Your Coding Workflow",
    description:
      "The modern, AI-powered code snippet manager for developers. Organize, search, and share code with ease.",
    siteName: "Snippo AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snippo AI - Supercharge Your Coding Workflow",
    description:
      "The modern, AI-powered code snippet manager for developers. Organize, search, and share code with ease.",
  },
};

const HomePage = async () => {
  const session = await auth();
  console.log({ session });

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <TestimonialsSection />
      <Faqs />
    </main>
  );
};

export default HomePage;
