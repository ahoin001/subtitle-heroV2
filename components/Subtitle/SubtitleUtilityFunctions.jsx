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
