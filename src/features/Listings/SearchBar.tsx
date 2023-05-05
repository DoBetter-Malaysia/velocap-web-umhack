import Button from "@/components/buttons/Button";
import { Container, Input } from "@mantine/core";
import { IconSearch, IconAdjustments } from "@tabler/icons-react";
import React, { Dispatch, FormEvent, SetStateAction } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  openFilter: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  openFilter,
}: SearchBarProps) => {
  function handleSearchQueryChanged(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchQuery(event.target.value);
  }

  function handleFilterClicked(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    openFilter();
  }

  return (
    <Container>
      <div className="my-4 flex gap-2">
        <Input
          type="text"
          placeholder="Unicorn🦄 Corp."
          radius={"xl"}
          w={"100%"}
          value={searchQuery}
          onInput={handleSearchQueryChanged}
        ></Input>
        <Button
          onClick={handleFilterClicked}
          leftIcon={<IconAdjustments />}
          variant="filled"
        >
          Filters
        </Button>
        <Button variant="filled">
          <IconSearch />
        </Button>
      </div>
    </Container>
  );
};

export default SearchBar;
