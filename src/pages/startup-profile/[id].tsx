import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import {
  Accordion,
  ActionIcon,
  Badge,
  Container,
  Divider,
  Group,
  Table,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconPinned, IconPinnedOff } from "@tabler/icons-react";
import Link from "next/link";
import { Startup } from "@/interfaces/startup";
import MarketGrade from "@/features/Grading/MarketGrade";
import FounderGrade from "@/features/Grading/FounderGrade";
import CompanyProfileGrade from "@/features/Grading/CompanyProfileGrade";
import CompanyCredibility from "@/features/Grading/CompanyCredibility";
import CompanyFinanceGrade from "@/features/Grading/CompanyFinanceGrade";

export enum StartUpGrade {
  APlus,
  A,
  BPlus,
  B,
  CPlus,
  C,
  D,
  X,
}

const getStartUpGrade = (grade: StartUpGrade) => {
  let bgColor = "";
  let textColor = "";
  let gradeText = "?";
  switch (grade) {
    case StartUpGrade.APlus: {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-600";
      gradeText = "A+";
      break;
    }
    case StartUpGrade.A: {
      bgColor = "bg-green-200";
      textColor = "text-green-600";
      gradeText = "A";
      break;
    }
    case StartUpGrade.BPlus: {
      bgColor = "bg-emerald-200";
      textColor = "text-emerald-600";
      gradeText = "B+";
      break;
    }
    case StartUpGrade.B: {
      bgColor = "bg-teal-200";
      textColor = "text-teal-600";
      gradeText = "B";
      break;
    }
    case StartUpGrade.CPlus: {
      bgColor = "bg-violet-200";
      textColor = "text-violet-600";
      gradeText = "C+";
      break;
    }
    case StartUpGrade.C: {
      bgColor = "bg-pink-200";
      textColor = "text-pink-600";
      gradeText = "C";
      break;
    }
    case StartUpGrade.D: {
      bgColor = "";
      textColor = "";
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

const StartUpProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isProfilePinned, setIsProfilePinned] = useState<boolean>(false);
  const [startUpProfile, setStartUpProfile] = useState<Startup>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    setLoading(true);
    axios(`http://127.0.0.1:5000/startups/${id}`).then((res) => {
      setStartUpProfile(res.data);
      setLoading(false);
    });
  }, [router.isReady]);

  function toggleProfilePin(e: React.MouseEvent<HTMLButtonElement>) {
    setIsProfilePinned(!isProfilePinned);
  }

  return (
    <Container size="lg" py="1rem">
      <div className="grid grid-cols-[0.61803398875fr_1fr] gap-4 ">
        <div
          className={`${
            isProfilePinned ? "sticky top-[5rem]" : ""
          } h-min rounded-md bg-white p-4 shadow`}
        >
          <div className="flex justify-between">
            <Text fz="lg" fw="bold">
              StartUp Profile
            </Text>
            <ActionIcon onClick={toggleProfilePin}>
              {isProfilePinned ? <IconPinnedOff /> : <IconPinned />}
            </ActionIcon>
          </div>
          <Divider my="sm" />
          <div className=" flex flex-col gap-4">
            <div className="h-auto w-auto">
              <img
                className="h-[300px] w-full rounded object-cover"
                src={startUpProfile?.picture ?? "/logo.png"}
                alt=""
              />
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Name
              </Text>
              <Text>{startUpProfile?.name}</Text>
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Description
              </Text>
              <Text fz="sm">{startUpProfile?.description}</Text>
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Categories
              </Text>
              <Group position="left" mt="md" mb="xs" spacing="xs">
                {startUpProfile?.category_list.split("|").map((cat, key) => (
                  <Badge color="blue" variant="light" key={key}>
                    {cat}
                  </Badge>
                ))}
              </Group>
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Year Established
              </Text>
              <Text>2019</Text>
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                No. of Employees
              </Text>
              <Text>50-100</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz="lg" fw="bold">
              Metrics Summary
            </Text>
            <Divider my="sm" />
            <div className="pointer-events-none flex select-none justify-center">
              <div className="text-[9rem]">🤷‍♂️</div>
            </div>
          </div>
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz="lg" fw="bold">
              Velo Card
            </Text>
            <Divider my="sm" />
            <div className="pointer-events-none flex select-none justify-center">
              {getStartUpGrade(StartUpGrade.A)}
            </div>
            <div className="border-b-solid mb-2 mt-4 flex flex-row border-b-2 border-b-gray-100 px-5 pb-2">
              <div className="flex-[2] text-start text-lg">Aspect</div>
              <div className="flex-1 text-end text-lg">Analysis</div>
            </div>
            <Accordion multiple>
              <MarketGrade
                domain={startUpProfile?.market ?? ""}
                country={startUpProfile?.country_code ?? ""}
              />
              <FounderGrade founders={startUpProfile?.founders ?? []} />

              <CompanyProfileGrade />
              <CompanyCredibility />
              <CompanyFinanceGrade />
            </Accordion>
          </div>
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz="lg" fw="bold">
              Founders
            </Text>
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
        </div>
      </div>
    </Container>
  );
};

export default StartUpProfile;
