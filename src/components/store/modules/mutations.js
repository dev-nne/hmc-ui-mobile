import { router } from "@/router";
import axios from "axios";

const timeOutFun = state => {
  let curTime = new Date();
  let date = state.userInfo.getDate;
  let time = state.userInfo.bookTime;
  let timeSplit = time.split("-")[1];
  let pastTime = new Date(
    date.slice(0, 4),
    Number(date.slice(4, 6)) - 1,
    date.slice(6, 8),
    timeSplit.split(":")[0],
    timeSplit.split(":")[1]
  );
  if (curTime.getTime() > pastTime.getTime()) {
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("expireTime");
    localStorage.removeItem("site");
    router.replace("/login").catch(() => {});
  }
};

const sessionReload = state => {
  let savedUserInfo = localStorage.getItem("site");
  if (savedUserInfo === "provision") {
    router.replace("/provision").catch(() => {});
  } else if (savedUserInfo === "certification") {
    router.replace("/certification").catch(() => {});
  } else if (savedUserInfo === "userPage") {
    router.replace("/userPage").catch(() => {});
  } else if (savedUserInfo === "fellowPage") {
    router.replace("/fellowPage").catch(() => {});
  } else {
    router.replace("/login").catch(() => {});
  }
};

const sessionSavedPage = (state, payload) => {
  localStorage.setItem("site", payload);
  state.siteName = payload;
};
const userInfoSetting = (state, data) => {
  const infoData = data.resData.DisplayResponse;

  let bookingData = infoData.filter(v => {
    return v.tsrdPrctNo === data.booking;
  });
  let info = bookingData[0];
  let carNick = info.tsrdCar.split("/");

  const date = info.tsrdPrctYmd;

  let tsrdPrctYmd = date;
  let tsrdTim = info.tsrdTim;
  let tsrdTimArr = tsrdTim.split("-");
  let lastTimeStr = tsrdTimArr[1];
  let lastTimeArr = lastTimeStr.split(":");
  let bookDate = new Date(
    tsrdPrctYmd.substr(0, 4),
    tsrdPrctYmd.substr(4, 2),
    tsrdPrctYmd.substr(6, 2),
    lastTimeArr[0],
    lastTimeArr[1]
  );
  var pastDate = new Date(bookDate.getTime() - 30 * 60 * 1000);

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
    bookTimeStr:
      tsrdTimArr[0] + "-" + pastDate.getHours() + ":" + pastDate.getMinutes(),
    address: info.tsrdAdr,
    spaceNumber: info.tsrdTn,
    fellowNum: info.chanTsrdPrctNo,
    getDate: info.tsrdPrctYmd
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
          // .get("static/control.json")
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
                  axios.post(
                    "https://hyundai-driving.mocean.com/controls/controls/immobilizer.do",
                    {
                      tsrdPrctNo: this.$store.userInfo.bookNumber,
                      action: "unlock"
                    }
                  );
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
                  state.checkcarMsg = "재시동방지장치 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorOpenChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어에 실패하였습니다.";
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
        handleDoorOpen(state, res);
      }
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
                  // axios.post(
                  //   "https://hyundai-driving.mocean.com/controls/controls/immobilizer.do",
                  //   {
                  //     tsrdPrctNo: this.$store.userInfo.bookNumber,
                  //     action: "lock"
                  //   }
                  // );
                  break;
                case "IGN_ON":
                  state.checkcarMsg =
                    "차량 시동이 걸려 있어 제어에 실패하였습니다.";
                  state.doorCloseChecked = true;
                  state.checkcar = true;
                  break;
                case "DOOR_OPENED":
                  state.checkcarMsg =
                    "차량 문이 열려 있어 제어에 실패하였습니다.";
                  state.doorCloseChecked = true;
                  state.checkcar = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorCloseChecked = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg =
                    "트렁크가 열려 있어 제어에 실패하였습니다.";
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
        handleDoorClose(state, res);
      }
    }, 3000);
  }
};
const sessionEnd = state => {
  let sesstionTime = Number(sessionStorage.getItem("expireTime"));
  if (new Date().getTime() > sesstionTime && sesstionTime !== 0) {
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("expireTime");
    localStorage.removeItem("site");
    state.sessionEnd = true;
  }
  if (!state.sessionEnd) {
    sessionStorage.setItem("expireTime", new Date().getTime() + 60 * 60 * 1000);
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
                  state.checkcarMsg =
                    "차량 시동이 걸려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "DOOR_OPENED":
                  state.checkcarMsg =
                    "차량 문이 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "HOOD_OPENED":
                  state.checkcarMsg = "후드가 열려 있어 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "IGN_PROHIBIT_OUT_OF_CONTROL":
                  state.checkcarMsg = "재시동방지장치 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "FOB_OUT_OF_CONTROL":
                  state.checkcarMsg = "FOB 제어에 실패하였습니다.";
                  state.checkcar = true;
                  state.doorLightChecked = true;
                  break;
                case "TRUNK_OPENED":
                  state.checkcarMsg =
                    "트렁크가 열려 있어 제어에 실패하였습니다.";
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
        handleLightOnOff(state, res);
      }
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
  sessionEnd,
  sessionSavedPage,
  sessionReload,
  timeOutFun
};
