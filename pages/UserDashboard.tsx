import { ProjectsList } from "../components/Project/ProjectsList";

import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";

const UserDashboard = () => {
  return (
    <Flex
      minH={"100%"}
      //   align={"center"}
      //   justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack bgColor={"purple.100"} w={"full"} alignItems={"center"} p={8}>
        <Heading> Your Projects</Heading>

        <ProjectsList />
      </Stack>
    </Flex>
  );
};

export default UserDashboard;
