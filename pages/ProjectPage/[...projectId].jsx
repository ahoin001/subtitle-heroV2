import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { Subtitle } from "../../components/Subtitle/Subtitle";
import { SubtitleTable } from "../../components/UI Components/SubtitleTable";

import {
  timeToVTT,
  vttToSeconds,
} from "../../components/Subtitle/SubtitleUtilityFunctions";

import { CustomModal } from "../../components/UI Components/CustomModal/Modal";

const ProjectStation = () => {
  const router = useRouter();
  console.log("Project ================================");
  console.log(router.query);
  console.log("================================");
  // Get any needed info about project
  const { id, title, description, videoURL } = router.query;

  const [shouldAddSub, setShouldAddSub] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [subtitleRows, setSubtitleRows] = useState([]);

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

  //   Whenever a new subtitle is added, rerender table with added sub
  useEffect(() => {
    if (shouldAddSub) {
      listOneSubtitle(
        subTitleState.subtitles[subTitleState.subtitles.length - 1]
      );
    }
  }, [shouldAddSub]);

  useEffect(() => {
    const fetchData = () => {
      // console.log('Running Sub Creation Effect')

      if (shouldRefetch) {
        // console.log('Refecthing subtitles')

        // * Get subtitles that belong to project
        axios
          .get(`http://localhost:3000/api/Subtitles/${id}`)
          .then((response) => {
            console.log("====================================");
            console.log(
              "* Get Subtitles that belong to project",
              response.data
            );
            console.log("====================================");

            setSubTitleState({
              ...subTitleState,
              subtitles: response.data,
            });
            setShouldRefetch(false);
          })
          .catch(function (error) {
            console.log("FAILURE GETTING SUBTITLES OF PROJECT");
            console.log(error);
          });
      }

      listSubtitles();
    };

    fetchData();
  }, [shouldRefetch]);

  const listOneSubtitle = (mostRecentSavedSubtitle) => {
    let newSub = (
      <Subtitle
        key={mostRecentSavedSubtitle.id}
        Subtitle={mostRecentSavedSubtitle}
        // onDeleteClick={deleteSubtitle}
        // onSaveEdit={submitChanges}
        // refreshTable={setShouldRefetch}
      />
    );

    setSubtitleRows([...subtitleRows, newSub]);
    setShouldAddSub(false);

    listSubtitles();
  };

  const listSubtitles = () => {
    let tracks = document.querySelector("video").textTracks;

    // * Remove video cues before adding all from exsisiting subtitles
    if (tracks[0].cues === null) {
      return;
    } else if (tracks[0].cues.length) {
      // Must declare here since length is decreasing each loop since array is directly manipulated, so we use the static number of length
      const lengthOfCueList = tracks[0].cues.length - 1;

      for (let i = 0; i <= lengthOfCueList; i++) {
        // Keep removing first cue until there is no more
        if (tracks[0].cues[0]) {
          tracks[0].removeCue(tracks[0].cues[0]);
        }
      }
    }

    // * Keep Subs in order for user
    subTitleState.subtitles.sort((a, b) => a.inTime - b.inTime);

    // * Add cues on track from sorted subtitles array, otherwise VTTCue will sort it in its own messy way that conflicts with logic
    let theSubtitleRows = subTitleState.subtitles.map((subtitleObject) => {
      console.log("-----------------------------------------------");
      console.log("OBJECT BEING USED FOR RETURNED FROM POST: ", subtitleObject);
      let cue = new VTTCue(
        subtitleObject.inTime,
        subtitleObject.outTime,
        subtitleObject.text
      );
      tracks[0].addCue(cue);

      return (
        <Subtitle
          key={subtitleObject.id}
          Subtitle={subtitleObject}
          //   onDeleteClick={deleteSubtitle}
          //   onSaveEdit={submitChanges}
          // refreshTable={setShouldRefetch}
        />
      );
    });

    setSubtitleRows(theSubtitleRows);
  };

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

    document.getElementById("this-sub-text").value = "";

    // * Post request to push current subtitle to the database
    // * If successful then display to client
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("About to send post request");
    try {
      let savedSubtitle = await axios.post(
        `http://localhost:3000/api/Subtitles/${id}`,
        JSON.stringify(subtitleInformation),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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
            src={videoURL}
            // src={project.videoURL}
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

        {subtitleRows.length ? (
          <SubtitleTable>{subtitleRows}</SubtitleTable>
        ) : (
          <Spinner />
        )}
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
