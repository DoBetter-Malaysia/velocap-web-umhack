import { StartUpCardProps } from "@/features/Landing/Card/StartupCard";
import { FounderProfile } from "@/pages/founder-profile/[id]";
import type { NextApiRequest, NextApiResponse } from "next";

const founders = [
  {
    id: "0",
    name: "John Doe",
    specializedFields: ["Artificial Intelligence", "E-Commerce", "Healthtech"],
    yearsOfExperience: 9,
    imgUrl: "https://picsum.photos/200/300",
  },
  {
    id: "1",
    name: "Jane Doe",
    specializedFields: ["Artificial Intelligence", "E-Commerce", "Agriculture"],
    yearsOfExperience: 12,
    imgUrl: "https://picsum.photos/200/300",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FounderProfile>
) {
  const { id } = req.query;

  res
    .status(200)
    .json(founders.find((x) => x.id == id) ?? ({} as FounderProfile));
}
