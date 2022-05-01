import { useForm } from "react-hook-form";
import axios from "axios";

import { Box, Heading, VStack, Textarea, Button } from "@chakra-ui/react";

export const CustomModal = ({ modalToggle }) => {
  return (
    <>
      {/* Backdrop for modal */}
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        backgroundColor={"rgba(0, 0, 0, 0.6)"}
      >
        {/* Modal Container, may change to other method of centering */}
        <Box
          p={"8"}
          pos={"fixed"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%,-50%);"}
          width={"50%"}
          maxW="lg"
          borderColor={"gray.200"}
          rounded={"md"}
          backgroundColor={"white"}
        >
          <VStack>
            <Box>
              <Heading>Enter A Subtitle</Heading>
            </Box>

            <Textarea
              placeholder="Enter subtitle here..."
              name="subtitleToSave"
              id="this-sub-text"
            />

            <Box>
              <Button mr={3} onClick={() => modalToggle(false)}>
                Close
              </Button>
              <Button
                variant="outline"
                backgroundColor={"green.100"}
                _hover={{
                  background: "green.300",
                  color: "gray.5=900",
                }}
              >
                Submit
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
