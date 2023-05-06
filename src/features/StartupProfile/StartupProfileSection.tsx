import React, { useState } from "react";
import { ActionIcon, Badge, Divider, Group, Text } from "@mantine/core";
import {
  IconAddressBook,
  IconHeart,
  IconPinned,
  IconPinnedOff,
} from "@tabler/icons-react";
import { Startup } from "@/interfaces/startup";

interface StartupProfileSection {
  startUpProfile?: Startup;
}

const StartupProfileSection = ({ startUpProfile }: StartupProfileSection) => {
  const [isProfilePinned, setIsProfilePinned] = useState<boolean>(false);

  function toggleProfilePin(e: React.MouseEvent<HTMLButtonElement>) {
    setIsProfilePinned(!isProfilePinned);
  }
  return (
    <div
      className={`${
        isProfilePinned ? "sticky top-[5rem]" : ""
      } h-min rounded-md bg-white p-4 shadow`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <IconAddressBook />
          <Text fz="lg" fw="bold">
            StartUp Profile
          </Text>
        </div>
        <div className="flex flex-row">
          <ActionIcon>
            <IconHeart />
          </ActionIcon>{" "}
          <ActionIcon onClick={toggleProfilePin}>
            {isProfilePinned ? <IconPinnedOff /> : <IconPinned />}
          </ActionIcon>
        </div>
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
        {/* <div>
          <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
            Year Established
          </Text>
          <Text>
            {new Date(startUpProfile?.founded_at ?? "").getFullYear()}
          </Text>
        </div>
        <div>
          <Text fz="xs" fw="bold" className="uppercase" color="gray.6">
            Market Size
          </Text>
          <Text>
            {new Date(startUpProfile?.founded_at ?? "").getFullYear()}
          </Text>
        </div> */}
      </div>
    </div>
  );
};

export default StartupProfileSection;
