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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-8">
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
              className="font-bold mb-4 text-foreground"
            >
              Supercharge Your
            </Typography>
            <Typography
              as="h1"
              fluidSize="4xl"
              className="font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-5 bg-clip-text text-transparent  delay-200"
            >
              Coding Workflow
            </Typography>
          </div>

          {/* Subtitle with enhanced styling */}
          <Typography
            as="p"
            fluidSize="lg"
            className="mb-8 text-muted-foreground  delay-300"
          >
            The modern, AI-powered code snippet manager for developers.
            <span className="text-chart-1 font-semibold"> Organize</span>,
            <span className="text-chart-2 font-semibold"> search</span>, and
            <span className="text-chart-3 font-semibold"> share</span> code with
            ease.
          </Typography>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-4 mb-8  delay-400">
            {[
              { icon: Sparkles, text: "AI-Powered", color: "text-chart-1" },
              { icon: Code, text: "Smart Search", color: "text-chart-2" },
              { icon: Zap, text: "Lightning Fast", color: "text-chart-3" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border hover:bg-card/80 transition-all duration-300 group"
              >
                <feature.icon
                  className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-foreground font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button with enhanced styling */}
          <div className="relative group  delay-500">
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
          <div className="mt-8 flex flex-wrap items-center gap-6 text-muted-foreground  delay-600">
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
        <div className="relative flex items-center justify-center  delay-300">
          <div className="relative w-full max-w-lg">
            {/* Enhanced main illustration container */}
            <div className="relative bg-gradient-to-br from-card/95 via-background/90 to-card/95 backdrop-blur-xl rounded-3xl border border-border/60 p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              {/* Animated background grid */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10"></div>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.1) 1px, transparent 1px),
                                   radial-gradient(circle at 75% 75%, hsl(var(--chart-2)/0.1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>

              {/* Floating code blocks with enhanced styling */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-chart-5 to-chart-4 rounded-xl p-4 shadow-xl animate-float-slow border border-primary/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-semibold">
                      React Hook
                    </div>
                    <div className="text-xs opacity-80">Custom Logic</div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-chart-5 to-chart-4 rounded-xl p-4 shadow-xl animate-float-slow delay-1000 border border-chart-2/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-semibold">Utils</div>
                    <div className="text-xs opacity-80">Helper Functions</div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-chart-2 rounded-full animate-pulse delay-500"></div>
              </div>

              <div className="absolute -bottom-6 left-1/4 bg-gradient-to-r from-chart-5 to-chart-4 rounded-xl p-4 shadow-xl animate-float-slow delay-500 border border-chart-3/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-semibold">API</div>
                    <div className="text-xs opacity-80">Endpoints</div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-chart-3 rounded-full animate-pulse delay-1000"></div>
              </div>

              {/* Central AI brain with enhanced neural network */}
              <div className="relative flex items-center justify-center mb-8">
                {/* Outer glow rings */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-chart-2/30 to-chart-3/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-chart-3/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

                {/* Main brain container */}
                <div className="relative bg-gradient-to-br from-card/98 to-background/98 rounded-full p-8 shadow-2xl border border-primary/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300 z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                  <Brain className="w-16 h-16 text-primary-foreground animate-pulse relative z-10" />

                  {/* Orbiting particles around brain */}
                  {/* <div className="absolute inset-0 animate-orbit">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
                  </div>
                  <div
                    className="absolute inset-0 animate-orbit-reverse"
                    style={{ animationDuration: "6s" }}
                  >
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-chart-3 rounded-full animate-pulse delay-1000"></div>
                  </div> */}
                </div>
              </div>

              {/* Enhanced neural network connections */}
              {/* <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 300 250">
                  <defs>
                    <linearGradient
                      id="connectionGradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                    <linearGradient
                      id="connectionGradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--chart-3))"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                    <linearGradient
                      id="connectionGradient3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--chart-3))"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 50 50 Q 150 25 250 50"
                    stroke="url(#connectionGradient1)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 50 200 Q 150 225 250 200"
                    stroke="url(#connectionGradient2)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse delay-500"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 50 50 Q 150 125 50 200"
                    stroke="url(#connectionGradient3)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse delay-1000"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 250 50 Q 150 125 250 200"
                    stroke="url(#connectionGradient1)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse delay-1500"
                    strokeDasharray="5,5"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="4"
                    fill="hsl(var(--primary))"
                    className="animate-pulse"
                  />
                  <circle
                    cx="250"
                    cy="50"
                    r="4"
                    fill="hsl(var(--chart-2))"
                    className="animate-pulse delay-200"
                  />
                  <circle
                    cx="50"
                    cy="200"
                    r="4"
                    fill="hsl(var(--chart-3))"
                    className="animate-pulse delay-400"
                  />
                  <circle
                    cx="250"
                    cy="200"
                    r="4"
                    fill="hsl(var(--primary))"
                    className="animate-pulse delay-600"
                  />
                  <circle
                    cx="150"
                    cy="125"
                    r="6"
                    fill="hsl(var(--chart-2))"
                    className="animate-pulse delay-800"
                  />
                </svg>
              </div> */}

              {/* Enhanced search functionality representation */}
              <div className="relative bg-gradient-to-br from-card/95 via-background/90 to-card/95 rounded-xl p-6 border border-border/60 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-gradient-to-r from-primary to-chart-2 rounded-lg">
                    <Search className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full animate-pulse"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      AI-powered search...
                    </div>
                  </div>
                </div>

                {/* Search results preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/80 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-muted-foreground/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/80 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-200"></div>
                    <div className="flex-1">
                      <div
                        className="h-3 bg-muted-foreground/20 rounded animate-pulse delay-200"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/80 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-400"></div>
                    <div className="flex-1">
                      <div
                        className="h-3 bg-muted-foreground/20 rounded animate-pulse delay-400"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating code snippets */}
              <div className="absolute -right-10 top-1/4 opacity-90 animate-float-slow">
                <div className="bg-gradient-to-br from-card/98 to-background/98 p-3 rounded-lg border border-border/60 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-xs font-mono text-muted-foreground">
                      snippet.ts
                    </span>
                  </div>
                  <pre className="text-xs text-muted-foreground font-mono">
                    {`const snippet = {
  name: "useAuth",
  language: "tsx",
  tags: ["react", "auth"]
}`}
                  </pre>
                </div>
              </div>

              <div className="absolute -left-10 bottom-1/4 opacity-90 animate-float-slow delay-1000">
                <div className="bg-gradient-to-br from-card/98 to-background/98 p-3 rounded-lg border border-border/60 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-xs font-mono text-muted-foreground">
                      utils.js
                    </span>
                  </div>
                  <pre className="text-xs text-muted-foreground font-mono">
                    {`function createSnippet() {
  return "Magic"
}`}
                  </pre>
                </div>
              </div>

              {/* Additional floating elements */}
              <div className="absolute top-1/2 -right-16 opacity-80 animate-float-slow delay-1500">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              <div className="absolute bottom-1/2 -left-16 opacity-80 animate-float-slow delay-2000">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
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
        @keyframes orbit-reverse {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(40px) rotate(360deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 6s linear infinite;
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
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
