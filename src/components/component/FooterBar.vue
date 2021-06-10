<template>
  <!-- 푸터 -->
  <div class="footer">
    <div class="footer-logo-box">
      <img
        src="../../assets/logo_white.svg"
        alt=""
        class="footer-logo-box-img"
      />
    </div>
    <p class="footer-rights">
      © HYUNDAI MOTOR COMPANY. ALL RIGHTS RESERVED.
    </p>
  </div>
</template>

<style lang="less">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;

  &-logo-box {
    width: 30px;

    &-img {
      width: 100%;
      display: block;
    }
  }

  &-rights {
    font-size: 10px;
    color: #ebebeb;
    padding-top: 15px;
  }
}
</style>
