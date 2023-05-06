import Grade from "./Grade";
import { MetricType } from "../metrics/useGetMetrics";

interface CompanyProfileGradeProps {
  metrics: MetricType;
}

const CompanyProfileGrade = ({ metrics }: CompanyProfileGradeProps) => {
  const explanation = metrics[1].status
    ? "The company is still very active"
    : "The company has been inactive for a long period of time";
  return (
    <Grade
      explanation={explanation}
      loading={false}
      title="Company Profile"
      grade={metrics[1].status}
    />
  );
};

export default CompanyProfileGrade;
