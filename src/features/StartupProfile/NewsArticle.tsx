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
        <Badge color="red" variant="light">
          <IconThumbDown />
        </Badge>
      );
    case 1:
      return (
        <Badge color="green" variant="light">
          <IconThumbUp />
        </Badge>
      );
    case 0:
    default:
      return (
        <Badge color="blue" variant="light">
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
      <div className="grid grid-rows-[1fr_1.5fr] ">
        <div
          style={{
            backgroundImage: `url(${startUpProfile?.picture ?? "/logo.png"})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-4 p-4">
          {getBadgeBySentiment(news?.sentiment_result ?? 0)}
          <Text fz="md" fw="bold">
            {news?.headline}
          </Text>
          <Text fz="xs" transform="uppercase">
            posted on {news?.date_posted}
          </Text>
        </div>
      </div>
    </a>
  );
};

export default NewsArticle;
