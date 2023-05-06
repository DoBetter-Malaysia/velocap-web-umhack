import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StartUpCardProps[]>
) {
  res.status(200).json(
    Array.from({ length: 9 }, (v, i) => ({
      category_list: "Healthcare|Artificial Intelligence|E-Commerce",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quaerat autem dolores rem cum ut.",
      id: i.toString(),
      name: "Unicorn🦄 Inc.",
      imgUrl: "https://picsum.photos/200/300",
    }))
  );
}
