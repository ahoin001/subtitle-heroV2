import { useState } from "react";
import axios from "axios";
import { Box, Container, Heading, VStack, Button } from "@chakra-ui/react";

import {
  timeToVTT,
  vttToSeconds,
} from "../components/Subtitle/SubtitleUtilityFunctions";

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

  const genericSync = (event) => {
    const { name, value } = event.target;
    setSubTitleState({ ...subTitleState, [name]: value });
  };

  const createSub = () => {
    let video = document.getElementById("video");
    let tracks = video.textTracks;

    // if inTime has not been defined, create a new cue with startTime set to current video time
    if (subTitleState.subInit === false) {
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

  const saveSubtitle = async () => {
    // ? Activates chrome debug for react
    // debugger;

    let tracks = document.querySelector("video").textTracks;
    let video = document.getElementById("video");
    let cuesLength = tracks[0].cues.length;

    console.log("THE TRACK CUE THING: ", tracks);

    // * Set Subtitle info
    let textToSave = subTitleState.subtitleToSave;
    let inVTT = timeToVTT(subTitleState.inTime);
    let outVTT = timeToVTT(subTitleState.outTime);

    // ? Define body to fill the VTTCue and also send to Database
    const subtitleInformation = {
      inTime: subTitleState.inTime,
      outTime: subTitleState.outTime,
      text: textToSave,
      inTimeVTT: inVTT,
      outTimeVTT: outVTT,
    };

    // ? ENDTIME MUST BE FIRST OR SELECTING LAST CUE WON"T WORK
    // ? CUES ARE AUTOMATICALLY SORTED BY START TIME, CHANGING START TIME WILL POTENTIALLY MOVE LAST CUE MAKING GETTER LOGIC ERROR
    tracks[0].cues[cuesLength - 1].text = textToSave;
    tracks[0].cues[cuesLength - 1].endTime = subtitleInformation.outTime;
    tracks[0].cues[cuesLength - 1].startTime = subtitleInformation.inTime;

    // console.log('THE CUE TRACK AFTER CHANGING WHERE I MAKE IT: ', tracks[0].cues[cuesLength - 1])

    // clear modal text
    document.getElementById("this-sub-text").value = "";

    // * Post request to push current subtitle to the database
    // * If successful then display to client

    try {
      let savedSubtitle = await axios.post(
        `api/Subtitles_Routes`,
        subtitleInformation
      );

      console.log("SAVED SUBTITLE: ", savedSubtitle.data);

      setSubTitleState({
        ...subTitleState,
        subtitles: [...subTitleState.subtitles, savedSubtitle.data],
        inTimeVTT: inVTT,
        outTimeVTT: outVTT,
      });
      setShouldAddSub(true);
      setIsModalOpen(false);
      video.play();
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
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

      {isModalOpen && (
        <CustomModal
          modalToggle={setIsModalOpen}
          saveSubtitle={saveSubtitle}
          subtitleOperation={"create"}
          onTextChange={genericSync}
        />
      )}
    </Container>
  );
};

export default ProjectStation;
