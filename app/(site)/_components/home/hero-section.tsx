import Logo from "@/components/shared/logo";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
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
      <Button size="lg" className="px-8 py-4 text-lg animate-bounce shadow-md">
        Get Started Free
      </Button>
    </section>
  );
};

export default HeroSection;
