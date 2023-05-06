import Button from "@/components/buttons/Button";
import Section from "./Section";
import { Image } from "@mantine/core";
import Link from "next/link";

const Hero = () => {
  return (
    <Section className="bg-rose-100/10 pt-16">
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="space-y-4 py-20">
          <div className="space-y-2">
            <p className="text-slate-400">Velocity meets venture capital</p>
            <div>
              <h2 className="text-6xl font-bold text-blue-500">Supercharge</h2>
              <p className="text-4xl font-semibold">your venture capital</p>
            </div>
            <p className="text-slate-600">
              with faster, smarter, data-driven investment optimizations
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/listings">
              <Button className="text-xl">Get Started</Button>
            </Link>
            <Button className="text-xl" variant="outline">
              How it Works
            </Button>
          </div>
        </div>
        <div>
          <Image src="/hero.png" alt="Hero image" w="100%" h="50%" />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
