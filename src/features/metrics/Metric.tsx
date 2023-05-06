import { Founder } from "@/interfaces/founder";
import { Startup } from "@/interfaces/startup";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import { Loader, Tooltip } from "@mantine/core";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { useMemo } from "react";

export const defaultSettings = {
  companyFoundedMinYear: new Date().getFullYear() - 2,
  companyFoundedMaxYear: new Date().getFullYear() + 4,
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

  const val = useMemo(() => {
    if (!profile) {
      return [];
    }
    const data = [];
    const cur = { ...heuristicFilterOptions };
    const foundYear = new Date(profile.founded_at).getFullYear();
    // Founded Year
    if (cur.companyFoundedMinYear && cur.companyFoundedMaxYear) {
      if (
        foundYear <= cur.companyFoundedMaxYear &&
        foundYear >= cur.companyFoundedMinYear
      ) {
        data.push({
          key: `Founded Year: ${foundYear}`,
          details: `Less than ${cur.companyFoundedMaxYear} and more than ${cur.companyFoundedMinYear}`,
          status: true,
        });
      } else {
        data.push({
          key: `Founded Year: ${foundYear}`,
          details:
            foundYear > cur.companyFoundedMaxYear
              ? `More than ${cur.companyFoundedMaxYear}`
              : `Less than ${cur.companyFoundedMinYear}`,
          status: false,
        });
      }
    } else {
      if (cur.companyFoundedMinYear) {
        if (cur.companyFoundedMinYear > foundYear) {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `Less than ${cur.companyFoundedMinYear}`,
            status: false,
          });
        } else {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `More than ${cur.companyFoundedMinYear}`,
            status: true,
          });
        }
      } else if (cur.companyFoundedMaxYear) {
        if (cur.companyFoundedMaxYear < foundYear) {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `More than ${cur.companyFoundedMaxYear}`,
            status: false,
          });
        } else {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `Less than ${cur.companyFoundedMaxYear}`,
            status: true,
          });
        }
      } else {
        if (defaultSettings.companyFoundedMinYear > foundYear) {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `Less than ${defaultSettings.companyFoundedMinYear}`,
            status: false,
          });
        } else {
          data.push({
            key: `Founded Year: ${foundYear}`,
            details: `More than ${defaultSettings.companyFoundedMinYear}`,
            status: true,
          });
        }
      }
      // Engagements
      if (cur.lastEngagement == "") {
        cur.lastEngagement = defaultSettings.lastEngagement;
      }
      if (
        new Date(cur.lastEngagement).getTime() >
        new Date(profile.last_engagement_at).getTime()
      ) {
        data.push({
          key: `Last Engagement: ${new Date(
            profile.last_engagement_at
          ).toDateString()}`,
          details: "Last Engagement was too long ago",
          status: false,
        });
      } else {
        data.push({
          key: `Last Engagement: ${new Date(
            profile.last_engagement_at
          ).toDateString()}`,
          details: "Last Engagement was recent",
          status: true,
        });
      }
      // fundingRounds
      if (cur.fundingRounds == "") {
        cur.fundingRounds = defaultSettings.fundingRounds;
      }
      if (cur.fundingRounds == profile.funding_rounds) {
        data.push({
          key: `Funding Rounds: ${profile.funding_rounds}`,
          details: "Funding Rounds match your metrics",
          status: true,
        });
      } else {
        data.push({
          key: `Funding Rounds: ${profile.funding_rounds}`,
          details: "Funding Rounds do not match your metrics",
          status: false,
        });
      }
      // fundingTotal
      if (cur.fundingTotal == "") {
        cur.fundingTotal = defaultSettings.fundingTotal;
      }
      if (Math.abs(cur.fundingTotal - profile.funding_total_usd) < 10_000) {
        data.push({
          key: `Funding Total: \$${profile.funding_total_usd}`,
          details: "Funding Total was close to your metrics",
          status: true,
        });
      } else {
        data.push({
          key: `Funding Total: \$${profile.funding_total_usd}`,
          details: "Funding Total was far from your metrics",
          status: false,
        });
      }
      // Founders yoe
      if (cur.founderYearsOfExperience == "") {
        cur.founderYearsOfExperience = defaultSettings.founderYearsOfExperience;
      }
      let total = 0;
      profile.founders.forEach((f) => {
        total += f.years_of_experience;
      });
      total /= profile.founders.length;

      if (total - cur.founderYearsOfExperience >= -3) {
        data.push({
          key: `Founder average year of experience: ${total}`,
          details:
            "Founder average year of experience is close to your expectation",
          status: true,
        });
      } else {
        data.push({
          key: `Founder average year of experience: ${total}`,
          details:
            "Founder average year of experience is far from your expectation",
          status: false,
        });
      }

      // previously founded
      if (cur.noOfPreviousStartups == "") {
        cur.noOfPreviousStartups = defaultSettings.noOfPreviousStartups;
      }
      total = 0;
      profile.founders.forEach((f) => {
        total += f.prev_founded;
      });
      total /= profile.founders.length;

      if (Math.abs(cur.noOfPreviousStartups - total) <= 3) {
        data.push({
          key: `Founders Average No. of previous startups: ${total}`,
          details:
            "Founders Average No. of previous startups is close to your expectation",
          status: true,
        });
      } else {
        data.push({
          key: `Founders Average No. of previous startups: ${total}`,
          details:
            "Founders Average No. of previous startups is far from your expectation",
          status: false,
        });
      }
    }
    return data;
  }, [heuristicFilterOptions, profile]);

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
