import Grade from "./Grade";

interface CompanyCredibility {}

const CompanyCredibility = () => {
  return (
    <Grade
      explanation="Good"
      loading={false}
      title="Company Credibility"
      grade={true}
    />
  );
};

export default CompanyCredibility;
