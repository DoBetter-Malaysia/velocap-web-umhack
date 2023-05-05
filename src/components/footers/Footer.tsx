import { Container, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Container
      size="lg"
      className="sticky bottom-0 -z-10 h-[250px] bg-white py-6"
    >
      <div className="grid grid-cols-2">
        <div>
          <img
            className="h-min w-[130px] object-cover"
            src="/logo.png"
            alt="VeloCap Logo"
          />
          <Text color="gray.7" fz={"sm"}>
            Velocity meets venture capital.
          </Text>
          <Text color="gray.7" fz={"sm"}>
            Supercharge your venture capital with VeloCap.
          </Text>
        </div>
        <div className="mt-4 flex justify-between gap-4">
          {/* <div>
            <Text fw={"bold"} fz={"lg"}>
              About
            </Text>
            <div className="text-gray-500">
              <Text fz={"sm"}>Lorem, ipsum.</Text>
              <Text fz={"sm"}>Lorem, ipsum.</Text>
            </div>
          </div>
          <div>
            <Text fw={"bold"} fz={"lg"}>
              About
            </Text>
            <div className="text-gray-500">
              <Text fz={"sm"}>Lorem, ipsum.</Text>
              <Text fz={"sm"}>Lorem, ipsum.</Text>
            </div>
          </div>
          <div>
            <Text fw={"bold"} fz={"lg"}>
              About
            </Text>
            <div className="text-gray-500">
              <Text fz={"sm"}>Lorem, ipsum.</Text>
              <Text fz={"sm"}>Lorem, ipsum.</Text>
            </div>
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
