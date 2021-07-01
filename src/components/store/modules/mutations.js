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
    spaceNumber: info.tsrdTn,
    fellowNum: info.chanTsrdPrctNo
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
      if (!state.doorOpenChecked) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              let command = res.data.commandResultState;

              switch (command) {
                case "OK":
                  state.doorOpen = true;
                  state.doorOpenChecked = true;
                  break;
                case "IGN_ON":
                  state.checkcarMsg =
                    "차량 시동이 걸려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "DOOR_OPENED":
                  state.checkcarMsg =
                    "차량 문이 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg =
                    "트렁크가 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
              }
            }
          });
        state.openCount--;
      }

      handleDoorOpen(state, res);
    }, 3000);
  }
};

const handleDoorClose = (state, res) => {
  if (!state.doorClose && state.closeCount > 0) {
    setTimeout(() => {
      if (!state.doorCloseChecked) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              let command = res.data.commandResultState;
              switch (command) {
                case "OK":
                  state.doorClose = true;
                  state.doorCloseChecked = true;
                  break;
                case "IGN_ON":
                  state.checkcarMsg = "시동이 걸려있습니다.";
                  state.doorCloseChecked = true;
                  state.checkcar = true;
                  break;
                case "DOOR_OPENED":
                  state.checkcarMsg = "차문이 개방되어 있습니다.";
                  state.doorCloseChecked = true;
                  state.checkcar = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg = "트렁크 열려 있습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
              }
            }
          });
        state.closeCount--;
      }
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
  if (!state.light && state.lightCount > 0) {
    setTimeout(() => {
      if (!state.doorLightChecked) {
        axios
          .post(
            "https://hyundai-driving.mocean.com/controls/checkControlResponse.do",
            res
          )
          .then(res => {
            if (res.data.commandState === "DONE") {
              let command = res.data.commandResultState;

              switch (command) {
                case "OK":
                  state.light = true;
                  state.doorLightChecked = true;
                  break;
                case "IGN_ON":
                  state.checkcarMsg = "시동이 걸려있습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "DOOR_OPENED":
                  state.checkcarMsg = "차문이 개방되어 있습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg = "트렁크 열려 있습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                default:
                  state.checkcarMsg = "차량 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
              }
            }
          });
        state.lightCount--;
      }
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
