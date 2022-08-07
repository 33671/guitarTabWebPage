<template>
  <q-page class="q-layout-padding">
    <div class="row justify-center">
      <div class="col-12 col-sm-5 col-md-5 col-lg-4 q-ma-lg">
        <Userdetail />
      </div>
      <div class="col-12 col-sm-5 col-md-5 col-lg-4 q-ma-lg">
        <Usertab />
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Userdetail from "../components/Userdetail.vue";
import Usertab from "../components/Usertab.vue";

// import { RenderingResources } from "@coderline/alphatab";
export default {
  components: { Userdetail, Usertab },

  setup() {
    return;
  },
};
</script>

<style></style>
