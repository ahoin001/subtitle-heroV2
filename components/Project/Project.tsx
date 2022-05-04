import React, { useRef } from "react";

// import { Article, Header } from "./Project-Styles.jsx";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ProjectVideoContainer } from "./ProjectVideoContainer";

interface Project {
  id: Number;
  title: String;
  videoURL: String;
  description: String;
  cloudId: String;
}
interface PropType {
  project: Project;
}

// React.FowardRef was attempt to use Nextjs Link component with functional component child
export const Project = ({ project }: PropType) => {
  const videoRef = useRef(null);

  const hoverplayVideo = (e) => {
    // References video with "vidRef" ref attribute, then plays the video
    videoRef.current.play();
    videoRef.current.currentTime = 0;
  };

  const hoverpauseVideo = () => {
    // References video with "vidRef" ref attribute, then plays the video
    videoRef.current.pause();
  };

  //   let clippedTitleText;

  //   if (props.projectInfo.title.length > 19) {
  //     clippedTitleText = props.projectInfo.title.substr(0, 19) + "...";
  //   }

  return (
    <>
      <ProjectVideoContainer>
        <video
          //   width={"400px"}
          src={`${project.videoURL}`}
          typeof="video/mp4"
          ref={videoRef}
          controls={true}
          //   onLoadedData={props.onVideoLoaded}
          onMouseOver={hoverplayVideo}
          onMouseLeave={hoverpauseVideo}
        />

        <Box>
          {/* TODO should link to project detail page dynamically */}
          <Heading>{project.title}</Heading>

          <Text textAlign={"center"}>{project.description}</Text>
        </Box>
      </ProjectVideoContainer>
    </>
  );
};
