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
    <CopyrightIcp></CopyrightIcp>
  </q-page>
</template>
<script>
export default {
  name: "Home",
};
</script>
<script setup>
import carousel from "../components/carousel.vue";
import tabs from "../components/tabs.vue";
import { useQuasar } from "quasar";
import CopyrightIcp from "../components/copyright-icp.vue";

const $q = useQuasar();
$q.addressbarColor.set();
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
