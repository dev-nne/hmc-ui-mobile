<template>
  <div class="drawing-board">
    <canvas
      ref="drawing-board"
      class="drawing-board__canvas"
      v-on:mousedown="handleMouseDown"
      v-on:mouseup="handleMouseUp"
      v-on:mousemove="handleMouseMove"
      :width="`${WIDTH}px`"
      :height="`${height}px`"
    ></canvas>
  </div>
</template>

<script>
const data = () => ({
  ref: null,
  current: {
    x: 0,
    y: 0
  },
  previous: {
    x: 0,
    y: 0
  },
  WIDTH: 0,
  mouseDown: false
});
const props = {
  msg: String,
  width: {
    default: this.WIDTH,
    type: Number
  },
  height: {
    default: 100,
    type: Number
  },
  strokeColor: {
    default: "#2c2c2c",
    type: String
  },
  strokeWidth: {
    default: 2,
    type: Number
  }
};
const computed = {
  currentMouse() {
    const rect = this.ref.getBoundingClientRect();
    const pos = {
      x: this.current.x - rect.left,
      y: this.current.y - rect.top
    };
    return pos;
  },
  ctx() {
    return this.ref.getContext("2d");
  }
};
const methods = {
  startDrawing() {
    if (this.mouseDown) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.stroke();
    }
  },
  handleMouseMove(event) {
    this.current = {
      x: event.pageX,
      y: event.pageY
    };
    this.startDrawing(event);
  },
  handleMouseDown(event) {
    this.mouseDown = true;
    this.current = {
      x: event.pageX,
      y: event.pageY
    };
    console.log(this.WIDTH);
    this.ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
  },
  handleMouseUp() {
    this.mouseDown = false;
  }
};
export default {
  name: "DrawingBoard",
  data,
  props,
  computed,
  methods,
  mounted() {
    this.ref = this.$refs["drawing-board"];
    this.ctx.translate(0.5, 0.5);
    this.ctx.imageSmoothingEnabled = false;
    this.WIDTH = document.querySelector(".drawing-board").clientWidth;
  }
};
</script>

<style>
.drawing-board {
  width: 100%;
}
</style>
