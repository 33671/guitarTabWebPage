<template>
  <q-card class="my-card">
    <!-- class="bg-primary text-white shadow-2" -->
    <q-tabs v-model="tab" align="justify" :breakpoint="0" class="text-teal">
      <q-tab name="favorites" icon="favorite" />
      <q-tab name="userupload" icon="upload" />
    </q-tabs>

    <!-- transition-prev="slide-right"
      transition-next="slide-left" -->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel class="q-pa-none q-pa-md-sm" name="favorites">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-6"
            v-for="(score, index) in favs"
            :key="index"
          >
            <TabCard
              class="q-ma-lg-md q-ma-sm"
              :musicName="score.fav_info.tab_name"
              :uploader="score.fav_info.uploader"
              :publishId="score.publish_id"
              :coverId="score.fav_info.cover_file_id"
            />
          </div>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="currentFavPage" :max="pageCount" input />
        </div>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none q-pa-md-sm" name="userupload">
        <div class="row">
          <div
            class="col-lg-3 col-md-4 col-sm-4 col-6"
            v-for="(score, index) in uploads"
            :key="index"
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
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="currentuploadPage"
            :max="uploadPageCount"
            input
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { axios } from "boot/axios";
import TabCard from "./TabCard.vue";
import useSearch from "./../search_input";
import useHistory from "src/composables/history";
import usefav from "src/composables/fav";
import useUploads from "src/composables/uploads";
const currentFavPage = ref(1);
const { uploads, uploadPageCount, turnToUploadPage } = useUploads({
  user: "mine",
});
const currentuploadPage = ref(1);
const { history } = useHistory();
const { favs, turnToPage, pageCount } = usefav();
watch(currentFavPage, (page, prev) => {
  turnToPage(page);
});
watch(currentuploadPage, () => {
  turnToUploadPage(uploads.value[uploads.value.length - 1]._id);
});
const tab = ref("favorites");
</script>
<style lang="sass" scoped>
.my-card
  max-width: 600px
</style>
