import { Box, Td, Tr, Text, Button, HStack } from "@chakra-ui/react";
import React from "react";

export const Subtitle = ({ Subtitle }) => {
  return (
    <Tr>
      <Td>
        <Text>
          {Subtitle.text ? Subtitle.text : "Error Adding this subtitle"}
        </Text>
      </Td>

      <Td>
        <Text className="inTime">
          {Subtitle.inTime ? Subtitle.inTimeVTT : "In Time Will Be Here"}
        </Text>
      </Td>

      <Td>
        <Text className="outTime">
          {Subtitle.outTime ? Subtitle.outTimeVTT : "Out Time Will Be Here"}
        </Text>
      </Td>

      <Td>
        <HStack spacing={"4"}>
          <Button
            bgColor={"blue.100"}
            _hover={{ fontWeight: "bold", bgColor: "blue.400" }}
          >
            Edit
          </Button>
          <Button
            bgColor={"red.100"}
            _hover={{ fontWeight: "bold", bgColor: "red.400" }}
          >
            Delete
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
