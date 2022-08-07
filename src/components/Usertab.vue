<template>
  <q-card class="my-card">
    <!-- class="bg-primary text-white shadow-2" -->
    <q-tabs v-model="tab" align="justify" :breakpoint="0" class="text-teal">
      <q-tab name="favorites" icon="favorite" />
      <q-tab name="history" icon="history" />
      <q-tab name="userupload" icon="upload" />
    </q-tabs>

    <!-- transition-prev="slide-right"
      transition-next="slide-left" -->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        class="q-pa-none q-pa-md-sm"
        :name="index"
        v-for="(tablist, index) in scores"
        :key="index"
      >
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-4 col-6"
            v-for="score in tablist"
            :key="score.url"
          >
            <TabCard
              class="q-ma-lg-md q-ma-sm"
              :musicName="score.tab_name"
              :uploader="score.uploader"
              :publishId="score.publish_id"
              :coverId="score.cover_file_id"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { axios } from "boot/axios";
import TabCard from "./TabCard.vue";
import useSearch from "./../search_input";
const tab = ref("favorites");
const scores = ref({
  favorites: [],
  history: [],
  userupload: [],
});
onBeforeMount(async () => {
  for (let i of ["favorites", "history", "userupload"]) {
    scores.value[i] = (
      await axios.get("/api/tabs_publish?random=true")
    ).data.slice(0, 12);
  }
  console.log(scores.value);
});
</script>
<style lang="sass" scoped>
.my-card
  max-width: 600px
</style>
