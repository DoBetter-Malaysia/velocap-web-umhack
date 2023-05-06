import { useEffect, useState } from "react";
import Grade from "./Grade";
import axios from "axios";

interface MarketGradeProps {
  domain: string;
  country: string;
}

const MarketGrade = ({ domain, country }: MarketGradeProps) => {
  const [res, setRes] = useState<null | string>(null);
  const [grade, setGrade] = useState<boolean>(false);

  const callBing = () => {
    axios
      .post("/api/bing", {
        question: `Return answer in the form as "Yes/No|Explanation". What is the market prospect of ${domain} domain in Malaysia`,
      })
      .then((output) => {
        const [grade, explanation] = output.data.response
          .replace(/\[\^\d+\^\]/g, "")
          .split("|");
        if (!explanation) {
          callBing();
          return;
        }
        setGrade(grade == "Yes" ? true : false);
        setRes(explanation);
      });
  };

  useEffect(() => {
    if (!domain) {
      return;
    }
    callBing();
  }, [domain]);

  return (
    <Grade
      title="Market Prospects"
      loading={!res}
      grade={grade}
      explanation={res ?? ""}
    />
  );
};

export default MarketGrade;
