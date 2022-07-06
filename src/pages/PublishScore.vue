<template>
  <div class="row q-mt-xl">
    <div class="col-3"></div>
    <div class="col-6">
      <uploadtabs />
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
import uploadtabs from "../components/Uploadtabs.vue";

export default {
  name: "Index",
  components: {
    uploadtabs,
  },
};
</script>

<style></style>
