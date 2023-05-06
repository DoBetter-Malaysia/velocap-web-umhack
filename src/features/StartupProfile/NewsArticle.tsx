import { Startup } from "@/interfaces/startup";
import { Badge, Text } from "@mantine/core";
import { IconTilde } from "@tabler/icons-react";
import React from "react";

interface NewsArticle {
  startUpProfile?: Startup;
}

const NewsArticle = ({ startUpProfile }: NewsArticle) => {
  return (
    <a
      className="flex h-auto w-1/3 flex-initial flex-col overflow-hidden rounded-md shadow transition-colors hover:bg-slate-50"
      href="https://www.techinasia.com/3-startups-making-waves-malaysian-fintech-space"
    >
      <div className="grid grid-rows-[1fr_1.5fr] ">
        <div
          style={{
            backgroundImage: `url(${startUpProfile?.picture ?? "/logo.png"})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-4 p-4">
          <Badge color="blue" variant="light">
            <IconTilde />
          </Badge>
          <Text fz="md">
            These 3 startups are making waves in the Malaysian fintech space
          </Text>
          <Text fz="xs" transform="uppercase">
            posted on 11/8/2021
          </Text>
        </div>
      </div>
    </a>
  );
};

export default NewsArticle;
