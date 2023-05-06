import {
  Accordion,
  Badge,
  Container,
  Divider,
  Group,
  Loader,
  List,
  Table,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { IconHeart, IconPinned, IconPinnedOff } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import {
  IconMenu2,
  IconNews,
  IconReportSearch,
  IconRulerMeasure,
  IconTilde,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { Startup } from "@/interfaces/startup";
import MarketGrade from "@/features/Grading/MarketGrade";
import FounderGrade from "@/features/Grading/FounderGrade";
import CompanyProfileGrade from "@/features/Grading/CompanyProfileGrade";
import CompanyCredibility from "@/features/Grading/CompanyCredibility";
import CompanyFinanceGrade from "@/features/Grading/CompanyFinanceGrade";
import Metric from "@/features/metrics/Metric";
import useGetMetrics, { MetricType } from "@/features/metrics/useGetMetrics";
import Recommendations from "@/features/Recommendations/Recommendations";
import StartupProfileSection from "@/features/StartupProfile/StartupProfileSection";
import NewsArticle from "@/features/StartupProfile/NewsArticle";
import NewsSection from "@/features/StartupProfile/NewsSection";

export enum StartUpGrade {
  A,
  B,
  C,
  D,
  X,
  Loading,
}

const getStartUpGrade = (grade: StartUpGrade) => {
  let bgColor = "";
  let textColor = "";
  let gradeText = "?";
  switch (grade) {
    case StartUpGrade.A: {
      bgColor = "bg-green-200";
      textColor = "text-green-600";
      gradeText = "A";
      break;
    }
    case StartUpGrade.B: {
      bgColor = "bg-teal-200";
      textColor = "text-teal-600";
      gradeText = "B";
      break;
    }
    case StartUpGrade.C: {
      bgColor = "bg-pink-200";
      textColor = "text-pink-600";
      gradeText = "C";
      break;
    }
    case StartUpGrade.D: {
      bgColor = "bg-orange-200";
      textColor = "text-orange-600";
      gradeText = "D";
      break;
    }
    case StartUpGrade.X: {
      bgColor = "bg-black";
      textColor = "text-red-600";
      gradeText = "X";
      break;
    }
  }

  return (
    <div
      className={`flex h-[150px] w-[150px] items-center justify-center rounded-full ${bgColor} ${textColor}`}
    >
      <Text className="mt-[-0.75rem] text-[4rem]">{gradeText}</Text>
    </div>
  );
};

const checkGrade = (arr: MetricType, marketProspect?: boolean | null) => {
  let res = 0;
  if (arr.length < 5) {
    return StartUpGrade.Loading;
  }
  if (arr[4].status && arr[5].status) {
    res++;
  }
  if (arr[1].status) {
    res++;
  }
  if (arr[2].status && arr[3].status) {
    res += 2;
  }
  if (marketProspect == undefined || marketProspect == null) {
    return StartUpGrade.Loading;
  }
  if (marketProspect) {
    res += 1;
  }
  switch (res) {
    case 0:
      return StartUpGrade.X;
    case 1:
      return StartUpGrade.D;
    case 2:
      return StartUpGrade.C;
    case 3:
      return StartUpGrade.B;
    case 4:
    case 5:
      return StartUpGrade.A;
  }
};

const StartUpProfile = () => {
  const [loading, setLoading] = useState(false);
  const [startUpProfile, setStartUpProfile] = useState<Startup>();
  const router = useRouter();
  const { id } = router.query;
  const [pros, setPros] = useState<undefined | boolean>(undefined);
  const [isProfilePinned, setIsProfilePinned] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;

    setLoading(true);
    axios(`http://127.0.0.1:5000/startups/${id}`).then((res) => {
      setStartUpProfile(res.data);
      setLoading(false);
    });
  }, [router.isReady]);

  const metrics = useGetMetrics({ profile: startUpProfile });
  const grade = checkGrade(metrics, pros);
  const navItems = [
    {
      href: "#metrics",
      label: "Performance Metrics",
      icon: IconRulerMeasure,
    },
    { href: "#velocard", label: "VeloCard", icon: IconReportSearch },
    { href: "#founders", label: "Founders List", icon: IconUsers },
    { href: "#news", label: "News Section", icon: IconNews },
  ];

  return (
    <>
      <Accordion className="sticky top-[0.5rem] z-20 mx-auto mt-[-5rem] w-1/2 rounded-md bg-white">
        <Accordion.Item value="nav">
          <Accordion.Control icon={<IconMenu2 />}>
            Table of Contents
          </Accordion.Control>
          <Accordion.Panel>
            <List>
              {navItems.map((nav) => (
                <List.Item key={nav.href}>
                  <div className="flex items-center gap-4">
                    <nav.icon size="16px" />
                    <Link className="text-blue-500" href={nav.href}>
                      {nav.label}
                    </Link>
                  </div>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Container size="lg" py="2rem">
        <div className="grid grid-cols-[0.61803398875fr_1fr] gap-4 ">
          <StartupProfileSection startUpProfile={startUpProfile} />
          <div className="flex flex-col gap-4">
            <div id="metrics" className="rounded-md bg-white p-4 shadow">
              <div className="flex items-center gap-2">
                <IconRulerMeasure />
                <Text fz="lg" fw="bold">
                  Preference Metrics
                </Text>
              </div>
              <Divider my="sm" />
              <div className="flex justify-center">
                <Metric profile={startUpProfile} />
              </div>
            </div>
            <div id="velocard" className="rounded-md bg-white p-4 shadow">
              <div className="flex items-center gap-2">
                <IconReportSearch />
                <Text fz="lg" fw="bold" className="">
                  VeloCard
                </Text>
              </div>
              <Divider my="sm" />
              <div className=" flex justify-center">
                {grade == StartUpGrade.Loading ? (
                  <Loader />
                ) : (
                  getStartUpGrade(grade)
                )}
              </div>
              <div className="border-b-solid mb-2 mt-4 flex flex-row border-b-2 border-b-gray-100 px-5 pb-2">
                <div className="flex-[2] text-start text-lg">Aspect</div>
                <div className="flex-1 text-end text-lg">Analysis</div>
              </div>
              <Accordion multiple>
                <MarketGrade
                  domain={startUpProfile?.market ?? ""}
                  country={startUpProfile?.country_code ?? ""}
                  setter={setPros}
                />
                {metrics.length >= 5 ? (
                  <>
                    <FounderGrade metrics={metrics} />
                    <CompanyProfileGrade metrics={metrics} />
                    <CompanyCredibility
                      metrics={metrics}
                      profile={startUpProfile}
                    />
                    <CompanyFinanceGrade metrics={metrics} />
                  </>
                ) : (
                  <Loader />
                )}
              </Accordion>
            </div>
            <div id="founders" className="rounded-md bg-white p-4 shadow">
              <div className="flex items-center gap-2">
                <IconUsers />
                <Text fz="lg" fw="bold" className="">
                  Founders
                </Text>
              </div>
              <Divider my="sm" />
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Founder name</th>
                    <th>Years of experience</th>
                    <th>No. of previous startups</th>
                  </tr>
                </thead>
                <tbody>
                  {startUpProfile?.founders.map((f, key) => (
                    <tr key={key}>
                      <td>
                        <img
                          className="h-[25px] w-[25px] rounded-full"
                          src={f.picture}
                          alt=""
                        />
                      </td>
                      <td>
                        <a href={f.linkedin} className="text-blue-500">
                          {f.name}
                        </a>
                      </td>
                      <td>{f.years_of_experience}</td>
                      <td>{f.prev_founded}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <NewsSection startUpProfile={startUpProfile} />
            <div className="rounded-md bg-white p-4 shadow">
              <Text fz="lg" fw="bold">
                Recommendations
              </Text>
              <Divider my="sm" />
              <div className="flex justify-center">
                <Recommendations id={id} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StartUpProfile;
