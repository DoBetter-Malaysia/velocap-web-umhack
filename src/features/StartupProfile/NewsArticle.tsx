import { News } from "@/interfaces/news";
import { Startup } from "@/interfaces/startup";
import { Badge, Text } from "@mantine/core";
import { IconThumbDown, IconThumbUp, IconTilde } from "@tabler/icons-react";
import React from "react";

interface NewsArticleProps {
  news?: News;
  startUpProfile?: Startup;
}

const getBadgeBySentiment = (sentiment: number) => {
  switch (sentiment) {
    case -1:
      return (
        <Badge py="sm" color="red" variant="light">
          <IconThumbDown />
        </Badge>
      );
    case 1:
      return (
        <Badge py="sm" color="green" variant="light">
          <IconThumbUp />
        </Badge>
      );
    case 0:
    default:
      return (
        <Badge py="sm" color="blue" variant="light">
          <IconTilde />
        </Badge>
      );
  }
};

const NewsArticle = ({ news, startUpProfile }: NewsArticleProps) => {
  return (
    <a
      className="flex h-auto w-1/3 flex-initial flex-col overflow-hidden rounded-md shadow transition-colors hover:bg-slate-50"
      href={news?.source}
    >
      <div className="grid h-full grid-rows-[125px_1.5fr]">
        <div
          style={{
            backgroundImage: `url(${startUpProfile?.picture ?? "/logo.png"})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4">
            {getBadgeBySentiment(news?.sentiment_result ?? 0)}
            <Text fz="md">{news?.headline}</Text>
          </div>
          <div className="flex-grow"></div>
          <Text fz="xs" transform="uppercase" color="gray.5" fw="bold">
            posted on{" "}
            {new Date(news?.date_posted ?? Date.now()).toLocaleDateString()}
          </Text>
        </div>
      </div>
    </a>
  );
};

export default NewsArticle;
