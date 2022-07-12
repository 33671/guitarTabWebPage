<template>
  <div class="row justify-center">
    <div class="col-8">
      <iframe
        class="rounded-borders bg-white q-mt-sm"
        src="./alphaTab"
        frameborder="0"
        id="tab-iframe"
        width="100%"
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  props: ["id"],
  setup(props) {
    let TabLocation = "./tabs/" + props.id;
    localStorage.setItem("file", TabLocation);
    onMounted(() => {
      // function setIframeHeight(iframe) {
      //   if (iframe) {
      //     var iframeWin =
      //       iframe.contentWindow || iframe.contentDocument.parentWindow;
      //     if (iframeWin.document.body) {
      //       iframe.height =
      //         iframeWin.document.documentElement.scrollHeight ||
      //         iframeWin.document.body.scrollHeight;
      //     }
      //   }
      // }
      document.getElementById("tab-iframe").onload = function () {
        this.style.height = 90 + "vh";
      };

      // window.onload = function () {
      //   setIframeHeight();
      // };
    });
    return {};
  },
};
</script>

<style></style>
