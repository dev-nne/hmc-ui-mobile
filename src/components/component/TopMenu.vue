<template>
  <div class="nav">
    <div class="nav-navBar">
      <div class="nav-navBar-logobox" @click="gohome">
        <img
          src="@/assets/logo.svg"
          alt=""
          class="nav-navBar-logobox-logoImg"
        />
      </div>
      <div class="nav-navBar-title">Hyundai Driving Lounge</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gohome() {
      this.$router.push("login").catch(() => {});
    }
  }
};
</script>

<style lang="less">
.nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;

  &-navBar {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-weight: 800;
    height: 50px;
    font-family: "HyundaiSansHead";

    &-logobox {
      position: absolute;
      top: 50%;
      left: 20px;
      width: 36px;
      transform: translateY(-50%);

      &-logoImg {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
