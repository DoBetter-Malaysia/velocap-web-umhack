import { clsx } from "@mantine/core";
import { ReactNode } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Section = ({ children, ...props }: SectionProps) => {
  return (
    <section
      {...props}
      className={clsx("flex flex-row justify-center", props.className)}
    >
      <div className="max-w-6xl flex-1 py-12">{children}</div>
    </section>
  );
};

export default Section;
