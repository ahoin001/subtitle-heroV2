import { useRef } from "react";
import Link from "next/link";

// import { Article, Header } from "./Project-Styles.jsx";
import { Box, Heading } from "@chakra-ui/react";
import {ProjectVideoContainer} from './ProjectVideoContainer'

// ! Videos appear as blank white

// const Project = ({ projectInfo,...props }) => {
export const Project = ({ project }) => {
  const videoRef = useRef(null);

  const hoverplayVideo = (e) => {
    // console.log(props.projectInfo)

    // References video with "vidRef" ref attribute, then plays the video
    videoRef.current.play();
    videoRef.current.currentTime = 0;

    //     // console.log('================================ Props: ', props)
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
          <Heading>
            <a className="text-primary-900 no-underline" href="#">
              {project.title}
            </a>
          </Heading>

          <p>{project.description}</p>
        </Box>
      </ProjectVideoContainer>
    </>
  );
};
