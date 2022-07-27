<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-11 col-md-10 col-lg-8 q-my-lg">
      <suspense>
        <searchdetail />
      </suspense>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import searchdetail from "../components/Searchdetail.vue";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  components: { searchdetail },

  setup() {
    return;
  },
};
</script>

<style></style>
