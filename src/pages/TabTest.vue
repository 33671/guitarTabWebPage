<template>
  <iframe
    src="./alphaTab"
    frameborder="0"
    width="100%"
    height="1000px"
    scrolling="no"
  ></iframe>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  setup() {
    onMounted(() => {
      localStorage.setItem("file", "./ふわふわ时间.gp5");
    });
    return {};
  },
};
</script>

<style></style>
