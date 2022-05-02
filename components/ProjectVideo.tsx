import { Box } from "@chakra-ui/react";

export const ProjectVideo = ({ project }) => {
  return (
    <>
      <Box>
        <video id="video" crossOrigin="anonymous" controls preload="metadata">
          <source
            src={
              "http://res.cloudinary.com/damclaohv/video/upload/v1615059847/subit/wc3nqgevi6veqr7ypxxs.mp4"
            }
          />
          <track
            id="my-subs"
            label="English"
            kind="subtitles"
            srcLang="en"
            src=""
            default
          />
        </video>
      </Box>
    </>
  );
};
