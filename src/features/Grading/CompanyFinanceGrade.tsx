import Grade from "./Grade";

interface CompanyFinanceGradeProps {}

const CompanyFinanceGrade = () => {
  return (
    <Grade
      explanation="Good"
      loading={false}
      title="Company Finance"
      grade={true}
    />
  );
};

export default CompanyFinanceGrade;
