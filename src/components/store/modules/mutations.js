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
              switch (res.data.commandResultState) {
                case "OK":
                  state.light = true;
                  break;
                case "DOOR_OPENED":
                  state.state.checkcarMsg = "차문이 개방되어 있습니다.";
                  state.checkcar = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있습니다.";
                  state.checkcar = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg = "트렁크 열려 있습니다.";
                  state.checkcar = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  break;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.openCount--;

      handleDoorOpen(state, res);
    }, 3000);
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
              switch (res.data.commandResultState) {
                case "OK":
                  state.light = true;
                  break;
                case "IGN_ON":
                  state.state.checkcarMsg = "시동이 걸려있습니다.";
                  state.checkcar = true;
                  break;
                case "DOOR_OPENED":
                  state.state.checkcarMsg = "차문이 개방되어 있습니다.";
                  state.checkcar = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있습니다.";
                  state.checkcar = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg = "트렁크 열려 있습니다.";
                  state.checkcar = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  break;
              }
            } else {
              state.checkcarMsg =
                "차량 제어에 실패하였습니다. 잠시 후 다시 시도해 주세요.";
              state.checkcar = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.closeCount--;
      handleDoorClose(state, res);
    }, 3000);
  }
};
const sessionEnd = state => {
  let sesstionTime = Number(sessionStorage.getItem("expireTime"));
  if (new Date().getTime() > sesstionTime && sesstionTime !== 0) {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("expireTime");
    state.sessionEnd = true;
    console.log(state.sessionEnd);
  }
  if (!state.sessionEnd) {
    sessionStorage.setItem("expireTime", new Date().getTime() + 15 * 60 * 1000);
  }
};

const handleLightOnOff = (state, res) => {
  if (!state.light) {
    setTimeout(() => {
      if (!state.light && state.lightCount > 0) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              switch (res.data.commandResultState) {
                case "OK":
                  state.light = true;
                  break;
                case "DOOR_OPENED":
                  state.state.checkcarMsg = "차문이 개방되어 있습니다.";
                  state.checkcar = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있습니다.";
                  state.checkcar = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg = "트렁크 열려 있습니다.";
                  state.checkcar = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  break;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      state.lightCount--;
      handleLightOnOff(state, res);
    }, 3000);
  }
};

export {
  userInfoSetting,
  felloInfoSetting,
  agreementRes,
  handleDoorOpen,
  handleDoorClose,
  handleLightOnOff,
  sessionEnd
};
