import React, { useEffect, useState } from "react";
import { StartUpCardProps } from "./Landing/Card/StartupCard";
import SearchBar from "./Listings/SearchBar";
import StartUpGridView from "./Listings/GridView";
import { useDisclosure } from "@mantine/hooks";
import HeuristicFilter from "./Listings/HeuristicFilter";
import useHeuristicFilterOptionsStore from "@/stores/useHeuristicFilterOptionsStore";
import axios from "axios";

const Listings = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startUpData, setStartUpData] = useState<StartUpCardProps[]>([]);

  const { getOption, setOption } = useHeuristicFilterOptionsStore();
  const [
    isHeuristicFilterModalOpen,
    {
      open: openHeuristicFilterModalOpen,
      close: closeHeuristicFilterModalOpen,
    },
  ] = useDisclosure(!getOption("initialized") ?? true);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    axios("/api/startups").then((res) => {
      setStartUpData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFilter={openHeuristicFilterModalOpen}
      />
      <StartUpGridView items={startUpData} />
      <HeuristicFilter
        opened={isHeuristicFilterModalOpen}
        open={openHeuristicFilterModalOpen}
        close={closeHeuristicFilterModalOpen}
      />
    </>
  );
};

export default Listings;
