import { useForm } from "react-hook-form";
import Link from "next/link";

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
  InputGroup,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";

type ProjectFormValues = {
  title: string;
  description: string;
  genre?: string;
  videoFile: File;
};

export const ProjectForm = ({ handleAddProjectToDB }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>();

  const onSubmit = (values: ProjectFormValues) => {
    let data = new FormData();

    data.append("title", values.title);
    data.append("description", values.description);
    data.append("videoFile", values.videoFile[0]);

    // data.append('genre', genre);

    handleAddProjectToDB(data).then((res) => {
      console.log("RES FROM CLIENT SUBMIT: ", res);
    });
  };

  return (
    <Flex
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} width={"xl"} maxW="xl" py={12} px={2}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Add A Project
        </Heading>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <FormControl id="title" isRequired>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <Input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    {...register("description", {
                      required: "Description of video is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </InputGroup>
              </FormControl>

              <FormControl id="videoFile" isRequired>
                <FormLabel>Add Your Video</FormLabel>
                <InputGroup>
                  <Input
                    type={"file"}
                    {...register("videoFile", {
                      required: "Video is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.videoFile && errors.videoFile.message}
                  </FormErrorMessage>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2} align={"center"}>
                <Button
                  type="submit"
                  maxW={"lg"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  isLoading={isSubmitting}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit Project
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
