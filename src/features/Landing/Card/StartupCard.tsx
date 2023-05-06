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
    <Card w={"28%"} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imgUrl ?? "/logo.png"} height={160} alt="Random Image" />
      </Card.Section>
      <Group position="left" mt="md" mb="xs" spacing="xs">
        {categories.map((cat, key) => (
          <Badge color="blue" variant="light" key={key}>
            {cat}
          </Badge>
        ))}
      </Group>
      <Text weight={500}>{name}</Text>
      <Text size="sm" color="dimmed" lineClamp={2}>
        {description}
      </Text>

      <Link href={`startup-profile/${id}`}>
        <Button className="text-sm" fullWidth mt="md">
          View Startup Profile
        </Button>
      </Link>
    </Card>
  );
};

export default StartUpCard;
