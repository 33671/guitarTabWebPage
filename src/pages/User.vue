<template>
  <div class="row justify-center">
    <div class="col-6 col-sm-5 col-md-5 col-lg-4 q-my-lg">
      <Userdetail />
    </div>
    <div class="col-6 col-sm-5 col-md-5 col-lg-4 q-my-lg">
      <div class="row">
        <Userpublish />
      </div>
      <div class="row">
        <Usertabhistory />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Userdetail from "../components/Userdetail.vue";
import Userpublish from "../components/Userpublish.vue";
import Usertabhistory from "../components/Usertabhistory.vue";

// import { RenderingResources } from "@coderline/alphatab";
export default {
  components: { Userdetail, Userpublish, Usertabhistory },

  setup() {
    return;
  },
};
</script>

<style></style>
