import { Box, Button, VStack } from "@chakra-ui/react";

export const ProjectPage = () => {
  return (
    <Box>
      <VStack>
        <video
          //   width={"400px"}
          src={`http://res.cloudinary.com/damclaohv/video/upload/v1615059847/subit/wc3nqgevi6veqr7ypxxs.mp4`}
          typeof="video/mp4"
          controls={true}
        />

        <Box>
          <Button>In Time</Button>
          <Button>Out Time</Button>
          <Button>Edit Project Info</Button>
          <Button>Delete Project</Button>
        </Box>
      </VStack>
    </Box>
  );
};
