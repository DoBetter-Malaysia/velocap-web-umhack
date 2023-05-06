import { Startup } from "@/interfaces/startup";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import { useMemo } from "react";
import { defaultSettings } from "./Metric";

interface MetricProps {
  profile?: Startup;
}

export type MetricType = Array<{
  key: string;
  status: boolean;
  details: string;
}>;

const useGetMetrics = ({ profile }: MetricProps) => {
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
      const temp = total.toFixed(2);

      if (total - cur.founderYearsOfExperience >= -3) {
        data.push({
          key: `Founder average year of experience: ${temp}`,
          details:
            "Founder average year of experience is close to your expectation",
          status: true,
        });
      } else {
        data.push({
          key: `Founder average year of experience: ${temp}`,
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
      const x = total.toFixed(2);

      if (Math.abs(cur.noOfPreviousStartups - total) <= 3) {
        data.push({
          key: `Founders Average No. of previous startups: ${x}`,
          details:
            "Founders Average No. of previous startups is close to your expectation",
          status: true,
        });
      } else {
        data.push({
          key: `Founders Average No. of previous startups: ${x}`,
          details:
            "Founders Average No. of previous startups is far from your expectation",
          status: false,
        });
      }
    }
    return data;
  }, [heuristicFilterOptions, profile]);

  return val;
};

export default useGetMetrics;
