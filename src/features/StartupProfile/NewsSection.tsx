import { Divider, Text } from "@mantine/core";
import { IconNews } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import NewsArticle from "./NewsArticle";
import { Startup } from "@/interfaces/startup";
import { News } from "@/interfaces/news";
import axios from "axios";

interface NewsSectionProp {
  startUpProfile?: Startup;
}

const NewsSection = ({ startUpProfile }: NewsSectionProp) => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    if (startUpProfile == null) return;

    axios(`http://127.0.0.1:5000/news/${startUpProfile.id}`).then((res) => {
      setNews(res.data);
    });
  }, [startUpProfile]);

  return (
    <div id="news" className="rounded-md bg-white p-4 shadow">
      <div className="flex items-center gap-2">
        <IconNews />
        <Text fz="lg" fw="bold">
          News Section
        </Text>
      </div>
      <Divider my="sm" />
      <div className="flex gap-4">
        {(() => {
          if (news.length == 0) {
            return (
              <Text color="gray" className="mx-auto">
                There is no news ready for this startup.
              </Text>
            );
          }

          return news.map((n) => (
            <NewsArticle key={n.id} news={n} startUpProfile={startUpProfile} />
          ));
        })()}
      </div>
    </div>
  );
};

export default NewsSection;
