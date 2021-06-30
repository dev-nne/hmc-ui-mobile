<template>
  <div class="consent">
    <div class="consent-title">
      차량구입 관련 상담 및 각종 정보제공 안내 (마케팅 활용 및 광고성 정보 전송)
    </div>
    <div class="consent-box">
      <div class="consent-box-title">
        수집목적
      </div>
      <div class="consent-box-content">
        차량구입 안내 및 제품/서비스/이벤트 관련 정보 전송 등 마케팅∙홍보 목적
        활용
      </div>
    </div>

    <div class="consent-box">
      <div class="consent-box-title">
        수집항목
      </div>
      <div class="consent-box-content">
        고객성명, 휴대전화번호, 생년월일, 성별, 연계정보(CI), 주소(자택/직장)
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
        ※ 고객님은 위의 마케팅 활용 및 광고성 정보 전송에 대한 동의를 거부하실
        수 있습니다. 동의를 거부하시더라도 시승서비스 이용에는 제한이 없으나,
        차량구입 정보 등의 안내∙제공이 제한됩니다.
      </h5>
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
