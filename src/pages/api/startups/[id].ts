import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StartUpCardProps>
) {
  const { id } = req.query;

  res.status(200).json({
    categories: ["Healthcare", "Artificial Intelligence", "E-Commerce"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, quaerat autem dolores rem cum ut.",
    id: id?.toString() ?? "-1",
    name: "Unicorn🦄 Inc.",
    imgUrl: "https://picsum.photos/200/300",
  });
}
