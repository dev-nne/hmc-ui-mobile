<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="Choose Date"
    :min-date="minDate"
    :max-date="maxDate"
    confirm-button-text="Confirm"
    cancel-button-text="Cancel"
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
      this.$emit("childconfirm", this.show, data);
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
