import React, { useEffect, useState } from "react";
import StartUpCard, { StartUpCardProps } from "./Landing/Card/StartupCard";
import SearchBar from "./Listings/SearchBar";
import { useDisclosure } from "@mantine/hooks";
import HeuristicFilter from "./Listings/HeuristicFilter";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import axios from "axios";
import { Container, Modal } from "@mantine/core";

const Listings = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startUpData, setStartUpData] = useState<StartUpCardProps[]>([]);

  const { heuristicFilterOptions, getOption, setOption } =
    useHeuristicFilterOptionsStore();
  const [
    isHeuristicFilterModalOpen,
    {
      open: openHeuristicFilterModalOpen,
      close: closeHeuristicFilterModalOpen,
    },
  ] = useDisclosure(!getOption("initialized") ?? true);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/startups", {
        ...heuristicFilterOptions,
        searchQuery,
      })
      .then((res) => {
        setStartUpData(res.data);
        setLoading(false);
      });
  }, [heuristicFilterOptions, searchQuery]);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFilter={openHeuristicFilterModalOpen}
      />
      <Container size={"xl"}>
        <div className="my-4 flex flex-wrap justify-center gap-4">
          {startUpData.map((item) => (
            <StartUpCard
              id={item.id}
              key={item.id}
              name={item.name}
              picture={item.picture}
              category_list={item.category_list}
              description={item.description}
            />
          ))}
        </div>
      </Container>

      <Modal
        opened={isHeuristicFilterModalOpen}
        onClose={closeHeuristicFilterModalOpen}
        withCloseButton={false}
        size="lg"
      >
        <HeuristicFilter close={closeHeuristicFilterModalOpen} />
      </Modal>
    </>
  );
};

export default Listings;
