<template>
  <iframe
    class="bg-white"
    src="/static/metronome"
    frameborder="0"
    id="tab-iframe"
    width="100%"
    scrolling="no"
    style="vertical-align: bottom"
  ></iframe>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.getElementById("tab-iframe").onload = function () {
    this.style.height = 95 + "vh";
  };
});
</script>
