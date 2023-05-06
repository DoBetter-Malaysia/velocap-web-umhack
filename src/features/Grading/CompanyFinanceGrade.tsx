import Grade from "./Grade";
import { MetricType } from "../metrics/useGetMetrics";

interface CompanyFinanceGradeProps {
  metrics: MetricType;
}

const CompanyFinanceGrade = ({ metrics }: CompanyFinanceGradeProps) => {
  const explanation =
    metrics[2].status && metrics[3].status
      ? "The company has received a lot of funds and has a healthy financial status"
      : "The company has not receive much funds yet";
  return (
    <Grade
      explanation={explanation}
      loading={false}
      title="Company Finance"
      grade={metrics[2].status && metrics[3].status}
    />
  );
};

export default CompanyFinanceGrade;
