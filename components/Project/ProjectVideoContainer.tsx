import { Box, Flex, VStack } from "@chakra-ui/react";
import { Children } from "react";

export const ProjectVideoContainer = (props) => {
  return (
    <VStack
      alignItems={"center"}
      justify="center"
      bgColor={"gray.100"}
      overflow={"hidden"}
      borderRadius={"lg"}
      boxShadow={"dark-lg"}
      p={4}
    >
      {props.children}
    </VStack>
  );
};
