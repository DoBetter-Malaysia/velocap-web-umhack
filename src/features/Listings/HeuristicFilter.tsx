import Button from "@/components/buttons/Button";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import { Header, Modal, Text } from "@mantine/core";
import React from "react";

interface HeuristicFilterProps {
  opened: boolean;
  open: () => void;
  close: () => void;
}

const HeuristicFilter = ({ opened, open, close }: HeuristicFilterProps) => {
  const { getOption, setOption } = useHeuristicFilterOptionsStore();

  function handleOptionsSave(e: React.MouseEvent<HTMLButtonElement>) {
    setOption("initialized", true);
    close();
  }

  return (
    <Modal opened={opened} onClose={close} title="Heuristic Filters" size="lg">
      <div className="flex flex-col gap-2">
        <Text fz="sm">
          What are your heuristics in ranking successful startups?
        </Text>

        <div className="flex justify-end">
          <Button onClick={handleOptionsSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default HeuristicFilter;
