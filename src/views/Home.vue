<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <h1>1.canvas</h1>
          <div>
            <canvas id="canvas1" width="500" height="500"></canvas>
          </div>
        </v-col>
        <v-col cols="6">
          <h1>2.fabric.js</h1>
          <div>
            <canvas id="canvas2" width="500" height="500"></canvas>
          </div>
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
    };
  },
  mounted: function () {
    // canvas
    const canvasEl = document.getElementById("canvas1");
    let ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 100, 100);


    // fablic.js
    // 初期化
    this.canvas = new fabric.Canvas("canvas2");

    // 四角を定義
    var rect = new fabric.Rect({
      left: 200,
      top: 100,
      fill: "red",
      width: 100,
      height: 100,
    });

    // 四角を追加
    this.canvas.add(rect);

    // // 円を定義
    // const circle = new fabric.Circle({
    //   radius: 20,
    //   fill: "green",
    //   left: 100,
    //   top: 100,
    // });
    // // 三角形を定義
    // const triangle = new fabric.Triangle({
    //   width: 20,
    //   height: 30,
    //   fill: "blue",
    //   left: 50,
    //   top: 50,
    // });

    // // 円と三角形をまとめて追加
    // this.canvas.add(circle, triangle);
  },
};
</script>

<style>
canvas {
  border: solid;
}
</style>
