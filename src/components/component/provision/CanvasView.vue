<template>
  <div class="drawing-board">
    <canvas
      ref="drawing-board"
      class="drawing-board__canvas"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
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
  mouseDown: false,
  drawing: false
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
    this.ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
  },
  handleMouseUp() {
    this.mouseDown = false;
  },

  // 모바일 터치 이벤트
  handleTouchStart(event) {
    this.drawing = true;
    const touch = event.touches[0];
    const rect = this.ref.getBoundingClientRect();
    this.ctx.beginPath();
    this.ctx.moveTo(touch.clientX - rect.x, touch.clientY - rect.y);
  },
  handleTouchMove(event) {
    if (this.drawing) {
      event.preventDefault();
    }
    this.drawing = true;
    const touch = event.touches[0];
    const rect = this.ref.getBoundingClientRect();
    this.ctx.lineTo(touch.clientX - rect.x, touch.clientY - rect.y);
    this.ctx.stroke();
    this.$emit("drawingTrue", true);
  },
  handleTouchEnd(event) {
    this.drawing = false;
    this.ctx.closePath();
    this.ctx.save();
  },
  sendImgCode() {
    let dataURL = this.ref.toDataURL("image/png");
    return dataURL;
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
