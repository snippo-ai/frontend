import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/lib/mocks/home-page";
import Image from "next/image";

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
