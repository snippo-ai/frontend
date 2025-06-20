import { auth } from "@/auth";
import Logo from "@/components/shared/logo";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features, pricing, testimonials } from "@/lib/mocks/home-page";
import Image from "next/image";

const HomePage = async () => {
  const session = await auth();
  console.log({ session });

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 pt-16 pb-20 flex flex-col items-center text-center">
        <Logo iconSize={48} className="mb-4" center />
        <Typography as="h1" fluidSize="fluid-4xl" className="font-bold mb-4">
          Supercharge Your Coding Workflow
        </Typography>
        <Typography
          as="p"
          fluidSize="fluid-lg"
          className="mb-8 text-muted-foreground"
        >
          The modern, AI-powered code snippet manager for developers. Organize,
          search, and share code with ease.
        </Typography>
        <Button
          size="lg"
          className="px-8 py-4 text-lg animate-bounce shadow-md"
        >
          Get Started Free
        </Button>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="items-center text-center hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-col items-center">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="mb-2"
              />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Code Demo Section */}
      <section className="w-full max-w-4xl px-4 py-16 flex flex-col items-center">
        <Typography
          as="h2"
          fluidSize="fluid-2xl"
          className="font-semibold mb-4"
        >
          See Snippo AI in Action
        </Typography>
        <div className="w-full bg-zinc-950 rounded-xl shadow-lg overflow-auto border border-zinc-200 dark:border-zinc-800 mb-4 animate-fade-in">
          <pre
            className="text-left text-sm md:text-base p-6 text-zinc-100 overflow-x-auto whitespace-pre language-ts"
            style={{ background: "#18181b" }}
          >
            <code>
              {`// Save and search your code instantly
const snippet = await snippo.save({
  title: "Debounce Hook",
  code: "function useDebounce(fn, delay) { ... }",
  language: "js",
});
const results = await snippo.search("debounce");
console.log(results); // [ { title: "Debounce Hook", ... } ]`}
            </code>
          </pre>
        </div>
        <Typography as="p" className="text-muted-foreground">
          Developer-friendly, syntax-highlighted, and blazing fast.
        </Typography>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl px-4 py-16">
        <Typography
          as="h2"
          fluidSize="fluid-2xl"
          className="font-semibold mb-8 text-center"
        >
          What Developers Say
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="hover:scale-[1.03] transition-transform"
            >
              <CardContent className="flex flex-col items-center py-8">
                <span className="text-xl font-mono text-primary mb-4">“</span>
                <Typography as="p" className="mb-4 text-center">
                  {t.text}
                </Typography>
                <span className="font-semibold text-primary">{t.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full max-w-5xl px-4 py-16">
        <Typography
          as="h2"
          fluidSize="fluid-2xl"
          className="font-semibold mb-8 text-center"
        >
          Simple, Transparent Pricing
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((tier) => (
            <Card
              key={tier.plan}
              className={`flex flex-col items-center text-center border-2 ${
                tier.highlight
                  ? "border-primary shadow-xl scale-105"
                  : "border-zinc-200 dark:border-zinc-800"
              } transition-all`}
            >
              <CardHeader>
                <CardTitle className="text-xl mb-2">{tier.plan}</CardTitle>
                <span className="text-3xl font-bold mb-2">{tier.price}</span>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-2">
                {tier.features.map((f) => (
                  <Typography as="p" key={f} className="text-muted-foreground">
                    {f}
                  </Typography>
                ))}
              </CardContent>
              <Button
                size="lg"
                className={`w-4/5 mb-6 mt-2 ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
