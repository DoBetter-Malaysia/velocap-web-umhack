import Grade from "./Grade";
import { MetricType } from "../metrics/useGetMetrics";

interface FounderGradeProps {
  metrics: MetricType;
}

const FounderGrade = ({ metrics }: FounderGradeProps) => {
  const explanation =
    metrics[4].status && metrics[5].status
      ? "The founders clearly matched your requirements"
      : "The founders do not match all your requirements";
  return (
    <Grade
      explanation={explanation}
      loading={false}
      title="Founder Profile"
      grade={metrics[4].status && metrics[5].status}
    />
  );
};

export default FounderGrade;
