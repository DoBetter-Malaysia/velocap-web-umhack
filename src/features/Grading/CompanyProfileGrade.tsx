import Grade from "./Grade";

interface CompanyProfileGradeProps {}

const CompanyProfileGrade = () => {
  return (
    <Grade
      explanation="Good"
      loading={false}
      title="Company Profile"
      grade={true}
    />
  );
};

export default CompanyProfileGrade;
