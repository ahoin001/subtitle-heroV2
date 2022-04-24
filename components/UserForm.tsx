import {
  Box,
  Stack,
  Heading,
  Text,
  HStack,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Link as ChakraLink,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";

type FormProps = {
  formType: string;
  paragraph?: string;
};
export const UserForm = ({ formType }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={"100%"}
      // minW={"700px"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} width={"xl"} maxW="xl" py={12} px={2}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Create An Account
        </Heading>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
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
                maxW={"lg"}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
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
            <Stack pt={6}>
              {}
              <Text align={"center"}>
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
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
