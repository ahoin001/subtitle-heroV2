import { ProjectForm } from "../components/ProjectForm";

import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";

const AddProject = () => {
  return (
    <>
      <ProjectForm />
    </>
  );
};

export default AddProject;
