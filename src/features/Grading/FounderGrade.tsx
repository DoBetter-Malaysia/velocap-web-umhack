import { Founder } from "@/interfaces/founder";
import Grade from "./Grade";

interface FounderGradeProps {
  founders: Founder[];
}

const FounderGrade = ({ founders }: FounderGradeProps) => {
  return (
    <Grade
      explanation="Good"
      loading={false}
      title="Founder Profile"
      grade={true}
    />
  );
};

export default FounderGrade;
