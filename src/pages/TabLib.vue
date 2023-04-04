<template>
  <q-page
    padding
    ref="scrollTargetRef"
    style="max-height: 500px"
    class="scroll"
  >
    <q-infinite-scroll @load="onLoad">
      <div class="q-gutter-md row no-wrap">
        <q-select
          outlined
          v-model="selectModel.tabType"
          :options="['全部', '吉他谱', '贝斯谱', '乐队总谱']"
          label="谱类型"
          style="width: 150px"
          @update:model-value="reload"
        />
        <q-select
          outlined
          v-model="selectModel.sortMode"
          :options="[
            { label: '时间倒序', mode: 'time_desc' },
            { label: '热度倒序', mode: 'hot_desc' },
            { label: '收藏量倒序', mode: 'star_desc' },
          ]"
          label="排序方式"
          style="width: 150px"
          @update:model-value="reload"
        />
      </div>
      <div class="row">
        <div
          v-for="(item, index) in pageContents"
          :key="index"
          class="col-6 col-md-3 col-lg-2 col-sm-4 q-pa-sm-sm q-pa-lg-md q-pa-sm"
        >
          <tab-card
            :coverId="item.cover_file_id"
            :music-name="item.music_name"
            :publish-id="item._id"
            :uploader="item.uploader"
          >
          </tab-card>
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <div v-if="ReachToEnd" class="h6">到底了</div>
          <q-spinner-dots v-else color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
<script setup>
import axios from "axios";
import TabCard from "src/components/TabCard.vue";
import { reactive, ref } from "vue";
const selectModel = reactive({
  tabType: "全部",
  sortMode: { label: "时间倒序", mode: "time_desc" },
});
const scrollTargetRef = ref(null);
let pageContents = reactive([]);
const ReachToEnd = ref(false);
function onLoad(index, done) {
  if (ReachToEnd.value) {
    return;
  }
  console.log("继续加载");
  if (pageContents.length == 0) {
    refresh(null, done);
    return;
  }
  let last_mile_stone = pageContents[pageContents.length - 1]._id;
  if (selectModel.sortMode.mode == "hot_desc") {
    last_mile_stone = pageContents[pageContents.length - 1].click_times;
  }
  if (selectModel.sortMode.mode == "star_desc") {
    last_mile_stone = pageContents[pageContents.length - 1].fav_times;
  }
  refresh(last_mile_stone, done);
}
function reload() {
  ReachToEnd.value = false;
  pageContents = reactive([]);
  refresh();
}
function refresh(mile_stone = null, done = () => {}) {
  let config = `/api/tabs_publish?sort_mode=${selectModel.sortMode.mode}`;
  if (selectModel.tabType != "全部") {
    config += `&tab_type=${selectModel.tabType}`;
  }
  if (mile_stone) {
    config += `&mile_stone=${mile_stone}`;
  }

  axios(config)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response.data);
        if (response.data.length == 0) {
          ReachToEnd.value = true;
        }
        pageContents.push(...response.data);
        done();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>
