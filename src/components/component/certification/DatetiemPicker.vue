<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="날짜 선택"
    :min-date="minDate"
    :max-date="maxDate"
    confirm-button-text="확인"
    cancel-button-text="취소"
    @confirm="confirmDate"
    @cancel="cancelPick"
  />
</template>

<script>
import getDate from "../commonJS/getDate";
import { DatetimePicker } from "vant";

export default {
  components: {
    [DatetimePicker.name]: DatetimePicker
  },
  data() {
    return {
      minDate: new Date(1910, 0, 1),
      maxDate: new Date(2025, 11, 25),
      currentDate: new Date(2021, 0, 17),
      show: false
    };
  },
  methods: {
    confirmDate(data) {
      this.$emit("childconfirm", this.show, data, true);
    },
    cancelPick() {
      this.$emit("childcancel", this.show);
    }
  },
  created() {
    this.currentDate = new Date(getDate().year, getDate().month, getDate().day);

    this.minDate = new Date(getDate().year - 80, 0, 1);
    this.maxDate = new Date(getDate().year, 11, 25);
  }
};
</script>

<style></style>
