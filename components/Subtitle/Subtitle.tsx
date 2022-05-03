import { Box, Td, Tr, Text, Button, HStack } from "@chakra-ui/react";
import React from "react";

export const Subtitle = ({ Subtitle }) => {
  return (
    <Tr>
      <Td p={4}>
        <Text fontWeight={"bold"}>
          {Subtitle.text ? Subtitle.text : "Error Adding this subtitle"}
        </Text>
      </Td>

      <Td p={4}>
        <Text fontWeight={"bold"} className="inTime">
          {Subtitle.inTime ? Subtitle.inTimeVTT : "In Time Will Be Here"}
        </Text>
      </Td>

      <Td p={4}>
        <Text fontWeight={"bold"} className="outTime">
          {Subtitle.outTime ? Subtitle.outTimeVTT : "Out Time Will Be Here"}
        </Text>
      </Td>

      <Td p={4}>
        <HStack spacing={"4"}>
          <Button
            bgColor={"blue.100"}
            _hover={{ color: "white", bgColor: "blue.400" }}
          >
            Edit
          </Button>
          <Button
            bgColor={"red.100"}
            _hover={{ bgColor: "red.400", color: "white" }}
          >
            Delete
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
