import { useQuery } from "react-query";
import axios from "axios";

import { ProjectsList } from "../components/Project/ProjectsList";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const UserDashboard = () => {
  // TODO make it dynamice to accept userid and retrieve their projects
  // TODO so need to apply an authenticaion and authorization soon. for now just user with id 1
  const { isLoading, error, data, isFetching } = useQuery(
    "projectsFromUser",
    async () => await axios.get(`/api/UserProjects/${1}`)
  );

  const bg = useColorModeValue("gray.50", "gray.800");

  if (isLoading) {
    return (
      <Center minH={"100%"}>
        <Spinner boxSize={64} thickness="4px" color="pink.400" />
      </Center>
    );
  }

  return (
    <Box
      minH={"100%"}
      //   align={"center"}
      //   justify={"center"}
      bg={bg}
    >
      <Stack bgColor={"purple.100"} w={"full"} alignItems={"center"} p={8}>
        <>
          <Heading> Your Projects</Heading>

          <ProjectsList allProjects={data.data} />
        </>
      </Stack>
    </Box>
  );
};

export default UserDashboard;
