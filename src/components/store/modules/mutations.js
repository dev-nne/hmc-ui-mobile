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
export { userInfoSetting, felloInfoSetting, agreementRes };
