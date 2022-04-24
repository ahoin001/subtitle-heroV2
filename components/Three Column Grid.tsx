import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

export const ThreeColumnGrid = () => {
  const Feature = (props) => {
    return (
      <Box>
        <Icon
          boxSize={12}
          color={useColorModeValue("brand.700", "white")}
          mb={4}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </Icon>
        <Heading
          mb={3}
          fontSize="lg"
          lineHeight="shorter"
          fontWeight="bold"
          color={useColorModeValue("gray.900", "white")}
        >
          {props.title}
        </Heading>
        <Text
          lineHeight="tall"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {props.children}
        </Text>
      </Box>
    );
  };

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
    //   p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    //   border={"1px solid blue"}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={20}
        // px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        // shadow="xl"
      >
        <Feature
          title="100% Free"
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          }
        >
          Free demo for any one to try out. Create an account, upload videos,
          and subtitle away! Or use provided account info to hop right in and
          try it out. 
        </Feature>

        <Feature
          title="Easy To Edit Process"
          icon={
            <path
              fillRule="evenodd"
              d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
              clipRule="evenodd"
            />
          }
        >
          Down to the millisecond timing! Easy to edit subtitles, easy to delete
          them. You can focus on your quantity of projects and less on your
          process of finishing them.
        </Feature>

        <Feature
          title="Proffesionally Ready Files"
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            />
          }
        >
          Easily download files that will be imediately ready to use in .vtt
          format. Once you're finished with your subtitiles, simply press
          download and you're good to go!
        </Feature>
      </SimpleGrid>
    </Flex>
  );
};
