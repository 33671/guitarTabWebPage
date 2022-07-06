<template>
  <div class="at-viewport">
    <div id="alphaTab" data-tex="true"></div>
  </div>
</template>

<script>
import { AlphaTabApi, Settings } from "@coderline/alphatab";
import { onMounted } from "@vue/runtime-core";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  setup() {
    onMounted(() => {
      // RenderingResources()
      var point = document.querySelector("#alphaTab");
      var scorlEle = document.querySelector(".at-viewport");
      const settings = new Settings();
      settings.core.engine = "html5";
      // settings.core.logLevel = this.CONSTS.LOG;
      settings.core.useWorkers = true;
      settings.core.file = "canon.gp";
      settings.player.enablePlayer = true;
      settings.player.enableCursor = true;
      settings.player.enable = true;
      settings.player.soundFont = "./soundfont/sonivox.sf2";
      settings.player.scrollElement = scorlEle;
      // if (viewport === undefined) return;
      // settings.player.scrollElement = viewport;
      var alpha = new AlphaTabApi(point, settings);
      setTimeout(() => {
        alpha.play();
      }, 5000);
      // debugger;
      // for (var i = 0; i < 10; i++) {
      //   point.append("qweiufkbew");
      // }
      // var alpha = new AlphaTabApi(point, settings);
    });
  },
};
</script>

<style></style>
