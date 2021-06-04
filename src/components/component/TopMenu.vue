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
      this.$router.push("login");
    }
  }
};
</script>
