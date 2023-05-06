import { Founder } from "@/interfaces/founder";
import { Startup } from "@/interfaces/startup";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import { Loader, Tooltip } from "@mantine/core";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useMemo } from "react";
import useGetMetrics from "./useGetMetrics";

export const defaultSettings = {
  companyFoundedMinYear: new Date().getFullYear() - 3,
  companyFoundedMaxYear: new Date().getFullYear(),
  numberOfFounders: 3,
  lastEngagement: new Date(new Date().setDate(new Date().getDate() - 150)),
  companyStatus: "operating",
  fundingRounds: 2,
  fundingTotal: 120000,
  founderYearsOfExperience: 12,
  founderGender: "m",
  noOfPreviousStartups: 1,
};

interface MetricProps {
  profile?: Startup;
}

const Metric = ({ profile }: MetricProps) => {
  const { heuristicFilterOptions } = useHeuristicFilterOptionsStore();

  const val = useGetMetrics({ profile });

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1 flex-col items-start text-sm">
      {val.map(
        (
          r: { key: string; details: string; status: boolean },
          index: number
        ) => (
          <div key={index} className="grid w-full grid-cols-4 gap-x-4 gap-y-1">
            <div className="col-span-3">{r.key}</div>
            <div className="col-span-1">
              <Tooltip label={r.details}>
                {r.status ? (
                  <IconCircleCheckFilled className="text-green-500" />
                ) : (
                  <IconCircleXFilled className="text-red-500" />
                )}
              </Tooltip>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Metric;
