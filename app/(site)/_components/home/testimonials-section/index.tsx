"use client";

import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import { testimonials } from "@/lib/mocks/home-page";
import { TestimonialsColumn } from "./testimonials-column";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-background my-20 relative">
      <Container className="z-10">
        <SectionHeading
          as="h2"
          subtitle="See how Snippo transforms developer productivity and collaboration."
        >
          Loved by Developers Worldwide
        </SectionHeading>
        <Divider />
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
