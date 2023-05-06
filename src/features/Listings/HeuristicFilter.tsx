import Button from "@/components/buttons/Button";
import useHeuristicFilterOptionsStore, {
  HeuristicFilterOptions,
} from "@/stores/useHeuristicFilterOptionsStore";
import {
  ActionIcon,
  Avatar,
  Divider,
  Grid,
  Group,
  Header,
  Modal,
  MultiSelect,
  NumberInput,
  RangeSlider,
  Select,
  SelectItem,
  Text,
} from "@mantine/core";
import {
  IconTrendingUp,
  IconSeeding,
  IconCrown,
  IconX,
} from "@tabler/icons-react";
import React, { forwardRef, useEffect, useState } from "react";
import PresetDropdownItem from "./PresetDropdownItem";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useSetState } from "@mantine/hooks";

interface HeuristicFilterProps {
  close: () => void;
}

const presets: SelectItem[] = [
  {
    label: "Fastest Growing",
    value: "Fastest Growing",
    content: "Show the fastest growing startups now.",
    preset: {},
    icon: (
      <Avatar color="grape">
        <IconTrendingUp />
      </Avatar>
    ),
  },
  {
    label: "Early Potential",
    value: "Early Potential",
    content: "Show the young startups with the most potential.",
    preset: {},
    icon: (
      <Avatar color="green">
        <IconSeeding />
      </Avatar>
    ),
  },
  {
    label: "Seasoned Founders",
    value: "Seasoned Founders",
    content: "Show the startups helmed by strong founders.",
    preset: {},
    icon: (
      <Avatar color="yellow">
        <IconCrown />
      </Avatar>
    ),
  },
];

const HeuristicFilter = ({ close }: HeuristicFilterProps) => {
  const { getOption, setOption, setOptions, heuristicFilterOptions } =
    useHeuristicFilterOptionsStore();

  const heuristicFilterForm = useForm({
    initialValues: heuristicFilterOptions,
    validate: {
      companyFoundedMinYear: (value: number) => {
        if (!value) return null;

        return value < new Date().getFullYear() - 5
          ? "Company cannot be older than 5 years old."
          : null;
      },
      companyFoundedMaxYear: (value: number) => {
        if (!value) return null;

        return value > new Date().getFullYear()
          ? "Company cannot founded after this year."
          : null;
      },
    },
  });

  function updateHeuristicFilters(e: HeuristicFilterOptions) {
    setOptions({ ...e, initialized: true });
    close();
  }

  function onFormCancel() {
    heuristicFilterForm.reset();
    close();
  }

  function onClearFilters(): void {
    onFormCancel();
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Text fz="xl">Ranking Metrics</Text>
        <Select
          className="flex-grow"
          placeholder="Presets..."
          itemComponent={PresetDropdownItem}
          data={presets}
        />
        <ActionIcon onClick={() => onFormCancel()}>
          <IconX />
        </ActionIcon>
      </div>
      <Divider my="sm" />
      {(() => {
        if (getOption("initialized")) return;

        return (
          <div className="mb-4 flex flex-col gap-4">
            <Text fz="lg" fw="bold">
              Welcome to VeloCap!
            </Text>
            <Text>
              Please take a few moments of your time to provide us your metrics
              for your preferred startup by filling up the optional fields below
              so that we can better serve your ideals.
            </Text>
            <Text>
              Do note that all the fields below are optional which means that we
              will not take that metric into account if it is empty when finding
              your dream startup.
            </Text>
          </div>
        );
      })()}
      <form
        className="flex flex-col gap-2"
        onSubmit={heuristicFilterForm.onSubmit(updateHeuristicFilters)}
        onReset={() => onFormCancel()}
      >
        <div className="flex min-h-[16rem] flex-col gap-2">
          <div>
            <Text fz="lg" fw="bold">
              Company Profile
            </Text>
            <Group grow className="items-start">
              <NumberInput
                {...heuristicFilterForm.getInputProps("companyFoundedMinYear")}
                placeholder="Minimum year"
                label="Minimum year founded"
              />
              <NumberInput
                {...heuristicFilterForm.getInputProps("companyFoundedMaxYear")}
                placeholder="Maximum year"
                label="Maximum year founded"
              />
            </Group>
          </div>
          <NumberInput
            {...heuristicFilterForm.getInputProps("numberOfFounders")}
            min={1}
            placeholder="Number of founders"
            label="Number of founders"
          />
          <DateInput
            {...heuristicFilterForm.getInputProps("lastEngagement")}
            label="Last engagement"
            placeholder="Last Engagement"
            maxDate={new Date()}
          />
          <MultiSelect
            data={[
              { label: "Operating", value: "operating" },
              { label: "Acquired", value: "acquired" },
              { label: "Closed", value: "closed" },
              { label: "IPO", value: "ipo" },
            ]}
            {...heuristicFilterForm.getInputProps("companyStatus")}
            min={1}
            placeholder="Company status"
            label="Company status"
          />
          <div className="space-y-2">
            <Text fz="lg" fw="bold" className="mt-2">
              Finances
            </Text>
            <NumberInput
              {...heuristicFilterForm.getInputProps("fundingRounds")}
              min={1}
              placeholder="Funding rounds"
              label="Number of founders"
            />
            <NumberInput
              {...heuristicFilterForm.getInputProps("fundingTotal")}
              min={1}
              placeholder="Funding total"
              label="Funding total"
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
            />
          </div>
          <div className="space-y-2">
            <Text fz="lg" fw="bold" className="mt-2">
              Founder Profile
            </Text>
            <NumberInput
              {...heuristicFilterForm.getInputProps("founderYearsOfExperience")}
              min={1}
              placeholder="Years of experience"
              label="Years of experience"
            />
            <Select
              label="Gender"
              placeholder="Pick one"
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              {...heuristicFilterForm.getInputProps("founderGender")}
            />
            <NumberInput
              {...heuristicFilterForm.getInputProps("noOfPreviousStartups")}
              min={1}
              placeholder="No. of previous startups"
              label="No. of previous startups"
            />
          </div>
        </div>
        <div className="my-2 flex justify-end gap-2">
          <Button
            onClick={onClearFilters}
            color="gray"
            className="px-6 py-2 text-lg"
          >
            Clear Filters
          </Button>
          <Button type="reset" color="red" className="px-6 py-2 text-lg">
            Cancel
          </Button>
          <Button type="submit" className="px-6 py-2 text-lg">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default HeuristicFilter;
