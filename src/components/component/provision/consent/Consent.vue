<template>
  <div class="consent">
    <div class="consent-title">서비스 이용약관</div>
    <div class="consent-box">
      <div class="consent-box-title">
        보험사항
      </div>
      <div class="consent-box-content">
        상기차량은 대인배상(Ⅰ,Ⅱ), 대율배상, 자기신체, 자기차량, 무보험 등의
        보험에 가입되어 있으나, 보험가액을 초과하는 부분 및 보험 미적용 부분
        (운전자연령 한정 운전특약 위반,
        <span>차량사고시 자차부담금 최대 10만원 고객부담</span>)등에 대해서는
        본인이 스스로 책임을 지는 동시에 귀사에 발생한 모든 손해를 배상할 것을
        약속합니다.
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        금지사항
      </div>
      <div class="consent-box-content">
        본인은 귀사가 제공한 상기 차량을 상업적으로 이용하는 등 비정상적으로
        운행하거나, 본인 외 제3자에게 운행, 양도, 대여, 담보의 목적으로 제공하는
        등의 행위를 일절 하지 않을 것을 약속합니다. 또한
        <span>주행 보조 기능</span> (AEB 자동 긴급 제동 시스템,FCA 전방 충돌
        방지 보조 등) 작동을 위하여
        <span
          >위험한 운전을 시도하지 않으며, 항상 안전하게 운전할 것을
          약속합니다.</span
        >
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        유의사항
      </div>
      <div class="consent-box-content">
        ① 고객님의
        <span
          >시승차 운전이 불가하다고 판단 시 귀사 직원의 판단에 따라 즉시 시승이
          중단</span
        >될 수 이씅며 <span>향후 시승 이용이 제한</span>될 수 있습니다.
        <br />
        ② 시승 서비스 이용을ㄹ 위해서는
        <span>시승 전 반드시 운전면허증을 제시해야 합니다.</span>
        <br />
        ③ 시승차는 보험 적용 기준에 따라
        <span>만 21세 이상만 운행 가능</span>합니다
        <br />
        ④ 시승 시간에는 차량 준비 및 차량 이동 시간이 포함됩니다.
        <br />
        ⑤ 찾아가는 시승서비스의 경우 시승 구간은 시승 희망지 주변이며, 그 외의
        경우 시승 구간은 드라이빙라운지 주변입니다.
        <br />시승 후에는 출발지로 돌아와 반드시 차량을 반납해야 합니다.
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        책임사항
      </div>
      <div class="consent-box-content">
        ① 본인은 위 보험사항 및 금기사항, 유의사항을 위반하여 발생한 모든
        민·형사상 책임을 부담합니다.<br />
        ② 본인은 약정된 차량반납 일시까지 상기 차량을 지정된 반납장소에 반납하지
        않거나 차량반납시 차량상태가 변동된 경우, 이로 인해 발생한 모든 손해에
        대한 배상책임을 부담합니다.<br />
        ③ 본인은 교통법규 미준수로 인한 벌금, 과태료 및 시승 운행시 발생한
        도로교통비 등을 부담합니다.<br />
      </div>
    </div>

    <div class="consent-button">
      <p>본인은 시승차 이용에 따른 고지사항 전체 및 약관에 동의합니다.</p>
      <button @click="checkAgree">동의합니다</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkAgree() {
      this.$emit("sentToAgreement");
    }
  }
};
</script>

<style lang="less">
.consent {
  width: 100%;

  &-title {
    font-weight: 800;
    font-size: 18px;
    padding: 10px 0;
    font-family: "HyundaiSansHead";
  }

  &-box {
    &-title {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
      font-family: "HyundaiSansHead";
    }

    &-content {
      font-size: 14px;
      padding: 10px;
      line-height: 18px;
      background: #eeeeee;
      border-radius: 10px;
      margin-bottom: 10px;

      span {
        color: #ce1212;
        font-weight: 600;
      }
    }
  }

  &-button {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p,
    h5 {
      font-size: 12px;
      color: rgb(99, 99, 99);
      margin-bottom: 10px;
    }

    h5 {
      font-weight: 400;
      line-height: 14px;
      color: #ce1212;
    }

    button {
      padding: 10px 0;
      border: none;
      outline: none;
      border-radius: 20px;
      background: #012c5f;
      color: white;
      width: 60%;
    }
  }
}
</style>
