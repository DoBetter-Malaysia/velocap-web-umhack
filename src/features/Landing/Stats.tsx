import StatCard from "./Card/StatCard";
import Section from "./Section";
import Image from "next/image";

const Stats = () => {
  return (
    <Section>
      <div>
        <div>
          <div className="flex flex-row justify-center">
            <StatCard
              title="Depression is Common"
              content={[
                "Approximately 280 million individuals globally are depressed.",
                "Every 1 out of 20 adults suffer from depression.",
              ]}
              link=""
            />
            <Image
              src="/depression.png"
              alt="depression"
              width="300"
              height="300"
              className="relative -ml-8 mt-8"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Stats;
