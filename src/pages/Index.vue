<template>
  <q-page padding>
    <div class="carousel">
      <!-- <carousel /> -->
    </div>

    <q-card class="tabs">
      <q-card-section>
        <suspense>
          <tabs />
        </suspense>
      </q-card-section>
    </q-card>
    <div style="height: 30px"></div>
  </q-page>
</template>

<script>
import carousel from "../components/carousel.vue";
import tabs from "../components/tabs.vue";

export default {
  name: "Index",
  components: {
    // carousel,
    tabs,
  },
};
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
