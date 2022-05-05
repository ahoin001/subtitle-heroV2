import axios from "axios";
import { Subtitle } from "./Subtitle";

export const timeToVTT = (num) => {
  //   console.log("INTIME TOVTT NUMBER IS: ", num);
  //   console.log("NUMBER IS TYPE: ", typeof num);

  // Also Converts to String
  let stringNum = num.toFixed(3);

  let splitNum = stringNum.split(".");
  let totalSeconds = splitNum[0];
  let totalMilliseconds = splitNum[1];

  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  let timeVTT = hours + ":" + minutes + ":" + seconds + "." + totalMilliseconds;

  return timeVTT;
};

export const vttToSeconds = (timeAsVTT) => {
  const [hh = "0", mm = "0", ss = "0"] = (timeAsVTT || "0:0:0").split(":");
  const hour = parseInt(hh, 10) || 0;
  const minute = parseInt(mm, 10) || 0;
  const second = parseFloat(ss, 10) || 0;

  const timeInSeconds = hour * 3600 + minute * 60 + second;
  console.log("Time in Seconds: ", timeInSeconds);

  return timeInSeconds;
};

// TODO Change these functions to be able to be imported to slim the msubtitle creation component
export const deleteProject = (projectId) => {
  axios
    .get(`http://localhost:3000/api/Subtitles/${id}`)
    .then((response) => {
      console.log("* Response after deleting project", response.data);
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
};

export const listOneSubtitle = (mostRecentSavedSubtitle) => {
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
