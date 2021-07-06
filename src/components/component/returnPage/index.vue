<template>
  <div class="return">
    <TopMenu />
    <div class="return-main">
      <div class="return-main-title">
        <h1>현대자동차 시승서비스</h1>
        <span>이용해 주셔서 감사합니다.</span>
      </div>
      <div class="return-main-img">
        <img src="/static/carMap1.png" alt="" />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import TopMenu from "../TopMenu";
import FooterBar from "../FooterBar";
export default {
  components: {
    TopMenu,
    FooterBar
  },
  mounted() {}
};
</script>

<style></style>
