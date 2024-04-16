<template>
  <div
    class="row justify-center"
    style="
      background-image: url('/static/sakiko.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    "
  >
    <div class="col-12 col-sm-11 col-md-10 col-lg-8">
      <!-- <div v-show="sakiko">我是要显示的图片</div> -->
      <q-card class="my-card my-card-radius-10" style="opacity: 0.5">
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
import { ref } from "vue";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  props: ["id"],
  setup(props) {
    let TabLocation = "/api/tab_files/" + props.id;
    const sakiko = ref(true);

    localStorage.setItem("file", TabLocation);
    onMounted(() => {
      if (props.id == "a405ff85-369e-46ff-ad75-5bb3cce54d85") {
        sakiko.value = true;
      }
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
