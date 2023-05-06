import Button from "@/components/buttons/Button";
import { Badge, Card, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export enum StartUpStatus {
  Trending,
  RedFlag,
}

export interface StartUpCardProps {
  id: string;
  name: string;
  picture?: string;
  description: string;
  category_list: string;
}

const StartUpCard = ({
  id,
  name,
  picture: imgUrl,
  description,
  category_list,
}: StartUpCardProps) => {
  const categories = category_list.split("|");
  return (
    <Card
      w={"28%"}
      shadow="sm"
      padding="0"
      radius="md"
      withBorder
      className="flex flex-col justify-between"
    >
      <div>
        <Card.Section>
          <Image src={imgUrl ?? "/logo.png"} height={160} alt="Random Image" />
        </Card.Section>

        <div className="px-4">
          <Group position="left" mt="md" mb="xs" spacing="xs">
            {categories.slice(0, 3).map((cat, key) => (
              <Badge color="blue" variant="light" key={key}>
                {cat}
              </Badge>
            ))}
          </Group>

          <Text weight={500}>{name}</Text>
          <Text size="sm" color="dimmed" lineClamp={2}>
            {description}
          </Text>
        </div>
      </div>
      <Link href={`startup-profile/${id}`} className="mb-4 px-4">
        <Button className="text-sm" fullWidth mt="md">
          View Startup Profile
        </Button>
      </Link>
    </Card>
  );
};

export default StartUpCard;
