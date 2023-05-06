import Grade from "./Grade";
import { MetricType } from "../metrics/useGetMetrics";
import { Startup } from "@/interfaces/startup";

interface CompanyFinanceGradeProps {
  metrics: MetricType;
  profile: Startup;
}

const CompanyFinanceGrade = ({
  metrics,
  profile,
}: CompanyFinanceGradeProps) => {
  const explanation =
    (profile &&
      new Date().getFullYear() - new Date(profile.founded_at).getFullYear() >=
        5) ||
    metrics[2].status
      ? "The company has been around for a long time and can be trusted with"
      : "The company is still relatively new to the field and there may be risk with unfamiliar founders";
  return (
    <Grade
      explanation={explanation}
      loading={false}
      title="Company Credibility"
      grade={metrics[0].status && metrics[2].status}
    />
  );
};

export default CompanyFinanceGrade;
