<template>
  <div class="fellow">
    <TopMenu />
    <div class="fellow-main">
      <div class="fellow-main-text">
        동승 운전자로 등록이 <br />완료되었습니다.
      </div>
      <div class="fellow-main-img">
        <img src="@/assets/fellow.png" alt="" />
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
  }
};
</script>

<style lang="less">
.fellow {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &-main {
    margin-top: 50px;
    margin-bottom: 100px;
    width: 100%;
    background: #f7f3f2;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-text {
      width: 100%;
      text-align: center;
      line-height: 20px;
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 14px;
    }

    &-img {
      width: 40%;
      margin-top: 10px;
      margin-bottom: 50px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
