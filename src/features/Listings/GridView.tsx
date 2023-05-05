import { Container } from "@mantine/core";
import React from "react";
import StartUpCard, { StartUpCardProps } from "../Landing/Card/StartupCard";

interface GridViewProps {
  items: StartUpCardProps[];
}

const StartUpGridView = ({ items }: GridViewProps) => {
  return (
    <Container size={"xl"}>
      <div className="my-4 flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <StartUpCard
            id={item.id}
            key={item.id}
            name={item.name}
            imgUrl={item.imgUrl}
            categories={item.categories}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default StartUpGridView;
