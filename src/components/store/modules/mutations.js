import axios from "axios";

const userInfoSetting = (state, data) => {
  const infoData = data.resData.DisplayResponse;

  let bookingData = infoData.filter(v => {
    return v.tsrdPrctNo === data.booking;
  });
  let info = bookingData[0];
  let carNick = info.tsrdCar.split("/");

  const date = info.tsrdPrctYmd;
  return (state.userInfo = {
    bookNumber: info.tsrdPrctNo,
    centerName: info.tsrdCtrNm,
    spaceName: info.tsrdStrgNm,
    carName: carNick[0],
    carNumber: info.carNumber,
    bookDay: `${date.substr(0, 4)}년 ${date.substr(4, 2)}월 ${date.substr(
      6,
      2
    )}일 `,
    bookTime: info.tsrdTim,
    address: info.tsrdAdr,
    spaceNumber: info.tsrdTn
  });
};

const agreementRes = (state, data) => {
  console.log(data);
  state.agreementInfo = data;
};

const felloInfoSetting = (state, res, req) => {
  console.log(res, req);
};

const handleDoorOpen = (state, res) => {
  if (!state.doorOpen && state.openCount > 0) {
    setTimeout(() => {
      if (!state.doorOpen) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              state.doorOpen = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.openCount--;

      handleDoorOpen(state, res);
    }, 2000);
  }
};

const handleDoorClose = (state, res) => {
  if (!state.doorClose && state.closeCount > 0) {
    setTimeout(() => {
      if (!state.doorClose) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              state.doorClose = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.closeCount--;
      handleDoorClose(state, res);
    }, 2000);
  }
};

const handleLightOnOff = (state, res) => {
  if (!state.light && state.lightCount > 0) {
    setTimeout(() => {
      if (!state.light) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              state.light = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.lightCount--;
      handleLightOnOff(state, res);
    }, 2000);
  }
};

export {
  userInfoSetting,
  felloInfoSetting,
  agreementRes,
  handleDoorOpen,
  handleDoorClose,
  handleLightOnOff
};
