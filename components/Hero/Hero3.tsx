import {
    Flex,
    Box,
    Button,
    HStack,
    useColorModeValue,
    Heading,
    Text,
  } from "@chakra-ui/react";
  
  export const Hero = () => {
    return (
      <Flex px={4} py={32} mx="auto">
        <Box mx="auto" w={{ lg: 8 / 12, xl: 5 / 12 }}>
          <Text
            mb={2}
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            color="gray.400"
            textTransform="uppercase"
          >
            For Developers
          </Text>
          <Heading
            mb={3}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="shorter"
            color={useColorModeValue("gray.900", "white")}
          >
            Focus on your apps
          </Heading>
          <Text>
            Today every company needs apps to engage their customers and run their
            businesses. Step up your ability to build, manage, and deploy great
            apps at scale with us.
          </Text>
          <HStack>
            <Button
              as="a"
              w={{ base: "full", sm: "auto" }}
              variant="solid"
            //   backgroundColor={"hsl(234,34%,75%)"}
            //   colorScheme="brand"
              size="lg"
              mb={{ base: 2, sm: 0 }}
              cursor="pointer"
            >
              Sign up for free
            </Button>
            <Button
              as="a"
              w={{ base: "full", sm: "auto" }}
              size="lg"
              mb={{ base: 2, sm: 0 }}
              cursor="pointer"
            >
              Read our blog
            </Button>
          </HStack>
        </Box>
      </Flex>
    );
  };
  