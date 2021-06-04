<template>
  <div class="consent">
    <div class="consent-title">개인정보 수집 · 이용에 대한 동의</div>
    <div class="consent-box">
      <div class="consent-box-title">
        수집 목적
      </div>
      <div class="consent-box-content">
        시승서비스 제공, 시승차량 사고발생 시 보험처리 등 사고 대응, 시승차량
        도난 방지 및 운행관리, 고객불만 등 민원사항 처리, 분쟁 발생 시 대응,
        소비자 의견 조사, 고객관리서비스 제공, 교통법규 미준수로 인한 벌금,
        과태료처리
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        수집 항목
      </div>
      <div class="consent-box-content">
        고객성명, 휴대전화번호, 생년월일, 성별, 인계정보(CI), 주소(자택/직장),
        시승정보(시승차종, 차량번호, 시승일시), 시승차량 위치 정보
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        보유기간
      </div>
      <div class="consent-box-content">
        2년
      </div>
    </div>

    <div class="consent-button">
      <h5>
        ※고객님은 위의 개인정보 수집 이용에 대한 동의를 거부하실 수 있습니다.
        그러나, 동의 거부 시 시승서비스 이용이 불가합니다.
      </h5>
      <p>본인은 위와 같이 개인정보 수집·이용에 동의합니다.</p>
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

<style></style>
