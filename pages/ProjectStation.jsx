import { Box, Container, Heading, VStack, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { CustomModal } from "../components/UI Components/CustomModal/Modal";

const ProjectStation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [subTitleState, setSubTitleState] = useState({
    subInit: false,
    subtitleToSave: "",
    inTime: null,
    outTime: null,
    inTimeVTT: "",
    outTimeVTT: "",
    subtitles: [],
    download: [],
  });

  const createSub = () => {
    let video = document.getElementById("video");
    let tracks = video.textTracks;
    // let button = document.getElementById("creation-button");

    // if inTime has not been defined, create a new cue with startTime set to current video time
    if (subTitleState.subInit === false) {
      //   let inTime = video.currentTime;

      let inTime = video.currentTime;

      console.log(
        "****************************************************** CURRENT IN TIME: ",
        inTime
      );

      let cue = new VTTCue(9999999999, 99999999999, "");

      console.log(cue);

      //   *replaced with ref for now
      tracks[0].addCue(cue);

      setSubTitleState({
        ...subTitleState,
        subInit: true,
        inTime: inTime,
      });

      // if inTime has already been defined, set cue endTime to current video time and pause video
    } else {
      //   let outTime = video.currentTime;
      let outTime = video.currentTime;

      console.log(
        "****************************************************** CURRENT OUT TIME: ",
        outTime
      );

      video.pause();

      setSubTitleState({
        ...subTitleState,
        subInit: false,
        outTime: outTime,
      });

      setIsModalOpen(true);
    }
  };

  return (
    <Container maxW={"container.xl"}>
      <VStack>
        <Heading> Project Station</Heading>

        <Box>
          <Button
            id="creation-button"
            onClick={createSub}
            backgroundColor={!subTitleState.subInit ? "green.100" : "red.200"}
          >
            {!subTitleState.subInit ? "In Time" : "Out Time"}
          </Button>
        </Box>

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
      </VStack>

      {isModalOpen && <CustomModal modalToggle={setIsModalOpen} />}
    </Container>
  );
};

export default ProjectStation;
