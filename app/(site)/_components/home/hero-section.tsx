"use client";

import { Container } from "@/components/shared/container";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Code,
  FileText,
  Search,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-8">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-chart-3/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              i % 4 === 0
                ? "bg-primary/40"
                : i % 4 === 1
                ? "bg-primary/30"
                : i % 4 === 2
                ? "bg-primary/20"
                : "bg-primary/10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Content */}
        <div className="text-left">
          {/* Main heading with gradient text */}
          <div className="mb-6">
            <Typography
              as="h1"
              fluidSize="4xl"
              className="font-bold mb-4 bg-gradient-to-r from-chart-3 via-primary to-chart-2 dark:from-white dark:via-primary dark:to-chart-2 bg-clip-text text-transparent animate-fade-in-up"
            >
              Supercharge Your
            </Typography>
            <Typography
              as="h1"
              fluidSize="4xl"
              className="font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 dark:from-primary dark:via-chart-2 dark:to-chart-3 bg-clip-text text-transparent animate-fade-in-up delay-200"
            >
              Coding Workflow
            </Typography>
          </div>

          {/* Subtitle with enhanced styling */}
          <Typography
            as="p"
            fluidSize="xl"
            className="mb-8 text-muted-foreground dark:text-gray-300 animate-fade-in-up delay-300"
          >
            The modern, AI-powered code snippet manager for developers.
            <span className="text-primary font-semibold"> Organize</span>,
            <span className="text-chart-2 font-semibold"> search</span>, and
            <span className="text-chart-3 font-semibold"> share</span> code with
            ease.
          </Typography>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up delay-400">
            {[
              { icon: Sparkles, text: "AI-Powered", color: "text-primary" },
              { icon: Code, text: "Smart Search", color: "text-chart-2" },
              { icon: Zap, text: "Lightning Fast", color: "text-chart-3" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-border dark:border-gray-700 hover:bg-card/80 dark:hover:bg-gray-800/80 transition-all duration-300 group"
              >
                <feature.icon
                  className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-foreground dark:text-white font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button with enhanced styling */}
          <div className="relative group animate-fade-in-up delay-500">
            <Button
              size="lg"
              className="relative px-10 py-6 text-xl font-semibold bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 border-0 shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 group"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-muted-foreground dark:text-gray-400 animate-fade-in-up delay-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
              <span className="text-sm">Trusted by 10K+ developers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse delay-500"></div>
              <span className="text-sm">99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-1000"></div>
              <span className="text-sm">Free forever plan</span>
            </div>
          </div>
        </div>

        {/* Right Section - Creative Illustration */}
        <div className="relative flex items-center justify-center animate-fade-in-up delay-300">
          <div className="relative w-full max-w-lg">
            {/* Main illustration container */}
            <div className="relative bg-gradient-to-br from-card/50 to-background/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl border border-border dark:border-gray-700 p-8 shadow-2xl">
              {/* Floating code blocks */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-primary to-chart-2 rounded-lg p-3 shadow-lg animate-float-slow">
                <div className="flex items-center gap-2 text-primary-foreground text-sm">
                  <Code className="w-4 h-4" />
                  <span className="font-mono">React Hook</span>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-chart-2 to-chart-3 rounded-lg p-3 shadow-lg animate-float-slow delay-1000">
                <div className="flex items-center gap-2 text-primary-foreground text-sm">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono">Utils</span>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/4 bg-gradient-to-r from-chart-3 to-chart-4 rounded-lg p-3 shadow-lg animate-float-slow delay-500">
                <div className="flex items-center gap-2 text-primary-foreground text-sm">
                  <Share2 className="w-4 h-4" />
                  <span className="font-mono">API</span>
                </div>
              </div>

              {/* Central AI brain with neural network */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-primary to-chart-2 rounded-full p-6 shadow-xl">
                  <Brain className="w-12 h-12 text-primary-foreground animate-pulse" />
                </div>
              </div>

              {/* Neural network connections */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  <defs>
                    <linearGradient
                      id="connectionGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 50 Q 150 25 250 50"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 50 150 Q 150 175 250 150"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse delay-500"
                  />
                  <path
                    d="M 50 50 Q 150 100 50 150"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse delay-1000"
                  />
                  <path
                    d="M 250 50 Q 150 100 250 150"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse delay-1500"
                  />
                </svg>
              </div>

              {/* Search functionality representation */}
              <div className="relative bg-card/80 dark:bg-gray-800/80 rounded-lg p-4 border border-border dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <Search className="w-5 h-5 text-primary" />
                  <div className="flex-1 h-2 bg-muted dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted dark:bg-gray-600 rounded animate-pulse"></div>
                  <div
                    className="h-3 bg-muted dark:bg-gray-600 rounded animate-pulse delay-200"
                    style={{ width: "80%" }}
                  ></div>
                  <div
                    className="h-3 bg-muted dark:bg-gray-600 rounded animate-pulse delay-400"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>

              {/* Floating code snippets */}
              <div className="absolute -right-8 top-1/4 opacity-80 animate-float-slow">
                <pre className="text-xs text-muted-foreground dark:text-gray-400 font-mono bg-card/80 dark:bg-gray-800/80 p-2 rounded border border-border dark:border-gray-700">
                  {`const snippet = {
  name: "useAuth",
  language: "tsx",
  tags: ["react", "auth"]
}`}
                </pre>
              </div>

              <div className="absolute -left-8 bottom-1/4 opacity-80 animate-float-slow delay-1000">
                <pre className="text-xs text-muted-foreground dark:text-gray-400 font-mono bg-card/80 dark:bg-gray-800/80 p-2 rounded border border-border dark:border-gray-700">
                  {`function createSnippet() {
  return "✨ Magic ✨"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(60px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(60px) rotate(-360deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
