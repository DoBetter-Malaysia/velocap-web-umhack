import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import { Container, Divider, Group, Table, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const StartUpProfile = () => {
  const [loading, setLoading] = useState(false);
  const [startUpProfile, setStartUpProfile] = useState<StartUpCardProps>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    setLoading(true);
    axios(`/api/startups/${id}`).then((res) => {
      setStartUpProfile(res.data);
      setLoading(false);
    });
  }, [router.isReady]);

  return (
    <Container py="1rem">
      <div className="grid grid-cols-[0.61803398875fr_1fr] gap-4 ">
        <div className="sticky top-[7rem] flex h-min flex-col gap-4 rounded-md bg-white p-4 shadow">
          <div className="h-auto w-auto">
            <img
              className="h-[300px] w-full object-cover rounded"
              src={startUpProfile?.imgUrl ?? "/logo.png"}
              alt=""
            />
          </div>
          <Text>Company Name</Text>
          <Text>Company Address</Text>
          <Text>Company Email</Text>
          <Text>Company Established</Text>
          <Text>Company No. of Employees</Text>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz={"lg"}>Heuristics Summary</Text>
            <Divider my="sm" />
          </div>
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz={"lg"}>Report Card</Text>
            <Divider my="sm" />
          </div>
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz={"lg"}>Founders</Text>
            <Divider my="sm" />
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Founder name</th>
                  <th>Stake %</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img className="h-[25px] w-[25px]" src="/hero.png" alt="" />
                  </td>
                  <td>John Doe</td>
                  <td>50%</td>
                  <td>Has criminal record</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StartUpProfile;
