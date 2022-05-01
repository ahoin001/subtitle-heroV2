import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  VStack,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tfoot,
  Tbody,
} from "@chakra-ui/react";

const ProjectPage = () => {
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const [shouldAddSub, setShouldAddSub] = useState();

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

  useEffect(() => {
    // ? Get the most recent added subtitle after user submits subtitle and lists it

    if (shouldAddSub) {
      console.log("BEFORE LISTING: ", subTitleState);
      listOneSubtitle(
        subTitleState.subtitles[subTitleState.subtitles.length - 1]
      );
    }
  }, [shouldAddSub]);

  useEffect(() => {
    console.log("About to fetch data")
    const fetchData = () => {
      // console.log('Running Sub Creation Effect')

      if (shouldRefetch) {
        // console.log('INSIDE Effect IF')

        // * Get subtitles that belong to project
        // * Will have to change to point to api route
        axios
          .get(
            `${process.env.REACT_APP_API_URL}projects/api/subtitles/1`
            // `${process.env.REACT_APP_API_URL}projects/api/subtitles/${props.projectId}`
          )
          .then((response) => {
            // console.log("* Get Subtitles that belong to signed in user", response.data);

            setSubTitleState({
              ...subTitleState,
              subtitles: response.data.results,
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

  const createSub = () => {
    let tracks = document.querySelector("video").textTracks;
    let video = document.getElementById("video");
    let button = document.getElementById("creation-button");

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

      // button.innerHTML = 'Out Time';

      // if inTime has already been defined, set cue endTime to current video time and pause video
    } else {
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

      setTheCreateSubModalVisible(true);

      button.innerHTML = "In Time";
    }
  };

  const listOneSubtitle = (mostRecentSavedSubtitle) => {
    let newSub = (
      <Subtitle
        key={mostRecentSavedSubtitle.id}
        Subtitle={mostRecentSavedSubtitle}
        onDeleteClick={deleteSubtitle}
        onSaveEdit={submitChanges}
        refreshTable={setShouldRefetch}
      />
    );

    setSubtitleRows([...subtitleRows, newSub]);
    setShouldAddSub(false);

    listSubtitles();
  };
  const listSubtitles = () => {
    // ? Activates chrome debug for react
    // debugger;

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
          // console.log('IN FOR LOOP, CUE BEING REMOVED : ', tracks[0].cues[0])
          tracks[0].removeCue(tracks[0].cues[0]);
        }
      }
    }

    // * Keep Subs in order for user
    subTitleState.subtitles.sort((a, b) => a.inTime - b.inTime);

    // * Add cues on track from sorted subtitles array, otherwise VTTCue will sort it in its own messy way that conflicts with logic
    let theSubtitleRows = subTitleState.subtitles.map((sub) => {
      let cue = new VTTCue(sub.inTime, sub.outTime, sub.text);
      tracks[0].addCue(cue);

      return (
        <Subtitle
          key={sub.id}
          Subtitle={sub}
          onDeleteClick={deleteSubtitle}
          onSaveEdit={submitChanges}
          refreshTable={setShouldRefetch}
        />
      );
    });

    setSubtitleRows(theSubtitleRows);
  };

  const genericSync = (event) => {
    const { name, value } = event.target;
    setSubTitleState({ ...subTitleState, [name]: value });
  };

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
          <Button id="creation-button" onClick={createSub}>
            In Time
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Subtitle</Th>
              <Th>In Time</Th>
              <Th>Out Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Footer?</Th>
            </Tr>
          </Tfoot>
        </Table>
      </VStack>
    </Box>
  );
};

export default ProjectPage;
