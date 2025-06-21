import Typography from "@/components/shared/typography";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/mocks/home-page";

const TestimonialsSection = () => {
  return (
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
              <span className="text-xl font-mono text-primary mb-4">"</span>
              <Typography as="p" className="mb-4 text-center">
                {t.text}
              </Typography>
              <span className="font-semibold text-primary">{t.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection; 