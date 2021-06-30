<template>
  <div>
    <div class="canvas-wrapper">
      <canvas id="canvas" width="600" height="600"></canvas>
    </div>
    <div class="button-wrapper">
      <div>
        <button @click="undo">undo</button>
        <button @click="redo">redo</button>
      </div>
      <div>
        <button @click="onChangeDrawingColor('black')">black</button>
        <button @click="onChangeDrawingColor('red')">red</button>
        <button @click="onChangeDrawingColor('green')">green</button>
      </div>
      <div>
        <button @click="onChangeDrawingWidth(1)">small</button>
        <button @click="onChangeDrawingWidth(5)">medium</button>
        <button @click="onChangeDrawingWidth(15)">large</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  data: function () {
    return {
      canvas: null,
      canvasHistory: [],
      isRedoing: false,
    };
  },
  mounted: function () {
    // fablic.js
    // 初期化
    this.canvas = new fabric.Canvas("canvas", {
      isDrawingMode: true,
      selection: true,
      stateful: true,
    });
    // 設定
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = "red";
    this.canvas.freeDrawingBrush.width = 5;
    this.canvas.freeDrawingBrush.shadowBlur = 0;
    this.canvas.hoverCursor = "move";
    // 新しいオブジェクトが追加されたかを監視
    this.canvas.on("object:added", () => {
      if (!this.isRedoing) {
        this.canvasHistory = [];
      }
      this.isRedoing = false;
    });
  },
  methods: {
    // 戻る
    undo() {
      if (this.canvas._objects.length > 0) {
        const undoObject = this.canvas._objects.pop();
        this.canvasHistory.push(undoObject);
        this.canvas.renderAll();
      }
    },
    // 進む
    redo() {
      if (this.canvasHistory.length > 0) {
        this.isRedoing = true;
        const redoObject = this.canvasHistory.pop();
        this.canvas.add(redoObject);
      }
    },
    onChangeDrawingColor(color) {
      this.canvas.freeDrawingBrush.color = color || "#000000";
    },
    onChangeDrawingWidth(width) {
      this.canvas.freeDrawingBrush.width = width || 5;
    },
  },
};
</script>

<style>
canvas {
  border: solid;
}
.canvas-container {
  margin: auto;
}
.canvas-wrapper {
  margin: 0 0 20px 0;
}
.button-wrapper > div {
  display: inline-block;
  margin: 0 10px;
}
</style>
