import { Accordion, Loader } from "@mantine/core";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { ReactNode } from "react";

interface GradeProps {
  explanation: ReactNode;
  title: string;
  grade: boolean;
  loading: boolean;
}

const Grade = ({ explanation, title, grade, loading }: GradeProps) => {
  return (
    <Accordion.Item value={title}>
      <Accordion.Control disabled={loading}>
        <div className="flex flex-row">
          <div className="flex-[2] text-start">{title}</div>
          <div className="flex flex-1 justify-end">
            {loading ? (
              <Loader size="sm" />
            ) : grade ? (
              <IconCircleCheckFilled className="text-green-500" />
            ) : (
              <IconCircleXFilled className="text-red-500" />
            )}
          </div>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="text-sm text-zinc-600">{explanation}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default Grade;
