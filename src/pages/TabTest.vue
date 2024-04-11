<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-11 col-md-10 col-lg-8">
      <q-card class="my-card my-card-radius-10">
        <q-card-section class="q-pa-none q-my-lg">
          <div class="q-pa-none" style="height: 100%">
            <iframe
              class="bg-white my-card-radius-10"
              src="/static/alphaTab/"
              frameborder="0"
              id="tab-iframe"
              width="100%"
              scrolling="no"
              style="vertical-align: bottom"
            ></iframe>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";

// import { RenderingResources } from "@coderline/alphatab";
export default {
  props: ["id"],
  setup(props) {
    let TabLocation = "/api/tab_files/" + props.id;

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

<style>
.my-card-radius-20 {
  border-radius: 20px;
}
.my-card-radius-10 {
  border-radius: 10px;
}
</style>
