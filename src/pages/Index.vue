<template>
  <q-page>
    <div class="carousel">
      <carousel />
    </div>

    <q-card class="tabs">
      <q-card-section>
        <tabs />
      </q-card-section>
    </q-card>
    <div style="height: 30px"></div>
  </q-page>
</template>
<script>
export default {
  name: "Home",
};
</script>
<script setup>
import { defineComponent } from "vue";
import carousel from "../components/carousel.vue";
import tabs from "../components/tabs.vue";
// const tab = "tabs";
</script>
<style lang="scss" scoped>
.carousel {
  margin: 0 auto;
  margin-top: 30px;
}
@media (min-width: 768px) {
  .tabs {
    max-width: 80%;
  }
}
.tabs {
  margin: 0 auto;
  margin-top: 30px;
}
</style>
