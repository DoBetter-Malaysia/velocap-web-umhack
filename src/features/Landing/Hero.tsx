import Button from "@/components/buttons/Button";
import Section from "./Section";
import { Image } from "@mantine/core";

const Hero = () => {
  return (
    <Section className="bg-rose-100/10 pt-16">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4 py-20">
          <div className="space-y-2">
            <p className="text-slate-400">
              Stay connected 24/7 with your loved ones
            </p>
            <div>
              <h2 className="text-6xl font-bold text-blue-500">Be there</h2>
              <p className="text-4xl font-semibold">when they need you most</p>
            </div>
            <p className="text-slate-600">
              Be alerted immediately when signs of struggles or distress are
              identified.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="text-xl">Get Started</Button>
            <Button className="text-xl" variant="outline">
              How it Works
            </Button>
          </div>
        </div>
        <div>
          <Image src="/hero.png" alt="Hero image" w="100%" />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
