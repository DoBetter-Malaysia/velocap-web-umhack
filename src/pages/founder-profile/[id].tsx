import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import {
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

export interface FounderProfile {
  id: string;
  name: string;
  yearsOfExperience: number;
  specializedFields: string[];
  imgUrl?: string;
}

const FounderProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isProfilePinned, setIsProfilePinned] = useState<boolean>(false);
  const [founderProfile, setFounderProfile] = useState<FounderProfile>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    setLoading(true);
    axios(`/api/founders/${id}`).then((res) => {
      setFounderProfile(res.data);
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
              Founder Profile
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
                src={founderProfile?.imgUrl ?? "/logo.png"}
                alt=""
              />
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Name
              </Text>
              <Text>{founderProfile?.name}</Text>
            </div>
            <div>
              <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
                Specialized Fields
              </Text>
              <Group position="left" mt="md" mb="xs" spacing="xs">
                {founderProfile?.specializedFields.map((cat) => (
                  <Badge color="blue" variant="light">
                    {cat}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-white p-4 shadow">
            <Text fz="lg" fw="bold">
              StartUps Founded
            </Text>
            <Divider my="sm" />
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Startup name</th>
                  <th>Stake %</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      className="h-[25px] w-[25px] rounded-full"
                      src="/hero.png"
                      alt=""
                    />
                  </td>
                  <td>Unicorn🦄 Inc.</td>
                  <td>50%</td>
                  <td>Has criminal record</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="h-[25px] w-[25px] rounded-full"
                      src="/depression.png"
                      alt=""
                    />
                  </td>
                  <td>ToTheMoon🌚 Inc.</td>
                  <td>50%</td>
                  <td>Did not went to the moon.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FounderProfile;
