<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="8">
          <div>
            <canvas id="canvas" width="600" height="600"></canvas>
          </div>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-btn @click="undo">undo</v-btn>
              <v-btn @click="redo">redo</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn color="black" dark @click="onChangeDrawingColor('black')"
                >black</v-btn
              >
              <v-btn color="green" @click="onChangeDrawingColor('green')"
                >green</v-btn
              >
              <v-btn color="red" @click="onChangeDrawingColor('red')"
                >red</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn @click="onChangeDrawingWidth(1)">small</v-btn>
              <v-btn @click="onChangeDrawingWidth(5)">medium</v-btn>
              <v-btn @click="onChangeDrawingWidth(10)">large</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn @click="onChangeMode()">mode change</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
      imageUrl: "https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_1280.jpg",
    };
  },
  mounted: function () {
    // fablic.js
    // 初期化
    this.canvas = new fabric.Canvas("canvas", {
      isDrawingMode: true, //手書き入力ON
      selection: true,
      stateful: true,
    });
    // 設定
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = "red";
    this.canvas.freeDrawingBrush.width = 5;
    this.canvas.freeDrawingBrush.shadowBlur = 0;
    this.canvas.hoverCursor = "move";

    // 背景画像指定
    fabric.Image.fromURL(
      this.imageUrl,
      (image) => {
        this.canvas.setBackgroundImage(image);
        this.canvas.backgroundImage.scaleToWidth("600");
        this.canvas.backgroundImage.scaleToHeight("600");
        this.canvas.renderAll();
      },
      { crossOrigin: "Anonymous" }
    );

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
    onChangeMode() {
      this.canvas.isDrawingMode = this.canvas.isDrawingMode ? false : true;
    },
  },
};
</script>

<style>
canvas {
  border: solid;
}
</style>
