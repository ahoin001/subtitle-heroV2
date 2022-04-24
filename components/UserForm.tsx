import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type FormProps = {
  formType: string;
  onSubmitToDB?: Function;
};

type UserFormValues = {
  email: string;
  password: string;
};

export const UserForm = ({ formType, onSubmitToDB }: FormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTTTTT");
    handleSubmit((data) => {
      console.log(data);

      onSubmitToDB(data).then((res) => {
        console.log(res);
      });
    })();
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
          {formType === "signup" ? "Create An Account" : "Welcome Back"}
        </Heading>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={onSubmit}>
              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
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
                  {formType === "signup"
                    ? "Sign up"
                    : formType === "login"
                    ? "Login"
                    : "How was this rendered lol"}
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              {}
              <Box textAlign={"center"}>
                {formType === "signup" ? (
                  <>
                    <Text>Already a user?</Text>{" "}
                    <ChakraLink as={Link} href={"/Login"}>
                      <Text color={"blue.400"}>Login</Text>
                    </ChakraLink>
                  </>
                ) : (
                  ""
                )}
              </Box>
              <Box textAlign={"center"}>
                {formType === "login" ? (
                  <>
                    <Text>Dont' have an account?</Text>{" "}
                    <ChakraLink as={Link} href={"/SignUpForm"}>
                      <Text color={"blue.400"}>Sign Up</Text>
                    </ChakraLink>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
