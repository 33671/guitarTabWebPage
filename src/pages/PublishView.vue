<script setup>
import { axios } from "src/boot/axios";
import { onMounted, ref, defineProps } from "vue";
const props = defineProps({
  publishId: String,
});
const info = ref({});
const scores = ref([]);
const finished = ref(false);
onMounted(async () => {
  const res = await axios.get(`/api/tabs_publish/${props.publishId}`);
  const data = res.data;
  // console.log(data);
  info.value = data;
  data["files_id"].forEach(async (file) => {
    scores.value.push((await axios.get(`/api/tab_files/${file}/info`)).data);
  });
  info.value.tags = data.tags.map((x) => "#" + x).join(" ");
  finished.value = true;
});
const tab = ref("简介");
const splitterModel = ref(12);
</script>

<template>
  <q-page padding>
    <div class="back-div">
      <div class="col-md-9 filter-div" flat>
        <div class="flex row" style="height: 100%">
          <div
            class="col-12 col-md-3 flex justify-center justify-sm-center justify-md-end q-py-sm"
          >
            <q-skeleton width="180px" height="180px" />
          </div>
          <div
            v-if="finished"
            class="col-12 col-md-7 justify-center justify-md-start row flex-wrap items-center"
          >
            <div class="text-h4 ellipsis col-12">{{ info.tab_name }}</div>
            <div class="text-caption ellipsis col-12">
              收藏:1277 标签：{{ info.tags }}
            </div>
          </div>
          <div class="col-12 col-md-2 flex items-center justify-center">
            <q-btn color="primary">
              <q-icon size="2" name="star" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-separator spaced />
    <div class="row justify-between q-gutter-y-md">
      <div class="q-px-sm col-md-9">
        <q-card class="q-px-lg" style="height: 100%">
          <q-splitter v-model="splitterModel" horizontal>
            <template v-slot:before>
              <q-tabs v-model="tab" align="left" horizontal class="text-teal">
                <q-tab class="text-purple" name="简介" label="简介" />
                <q-tab class="text-orange" name="评论" label="评论" />
                <!-- <q-tab class="text-teal" name="乐队总谱" label="乐队总谱" /> -->
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel class="q-pa-none q-pa-md-sm" name="简介">
                  <q-card-section
                    class="q-pa-lg"
                    v-if="finished"
                    v-html="info.description"
                  >
                  </q-card-section>
                </q-tab-panel>
                <q-tab-panel
                  class="q-pa-none q-pa-md-sm"
                  name="评论"
                ></q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              关于
              <q-icon name="report" size="1em" />
            </div>
            <div style="width: 100%">
              <q-list dense class="rounded-borders" v-if="finished">
                <q-item>
                  <q-item-section> ID </q-item-section>
                  <q-item-section side> {{ props.publishId }} </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 最后修改 </q-item-section>
                  <q-item-section side>
                    {{ info.modified_date }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 上传时间 </q-item-section>
                  <q-item-section side>
                    {{ info.publish_date }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 点击量 </q-item-section>
                  <q-item-section side> 27232736 </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>下载量 </q-item-section>
                  <q-item-section side> 21823 </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>歌曲名 </q-item-section>
                  <q-item-section side> {{ info.music_name }} </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 原曲地址 </q-item-section>
                  <q-item-section side>
                    {{ info.original_music_url }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 类型 </q-item-section>
                  <q-item-section side> {{ info.tab_type }} </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm">
          <q-card-section>
            <div class="text-subtitle1">谱文件</div>
            <q-list>
              <q-item
                v-for="score in scores"
                :key="score.file_name"
                class="q-my-sm q-px-none"
              >
                <q-item-section avatar>
                  <q-btn color="primary" flat round>
                    <q-icon name="play_arrow" color="green" />
                  </q-btn>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ score.file_name }}</q-item-label>
                  <q-item-label caption lines="1"
                    >{{ score.file_size }} Bytes</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <q-btn color="primary" flat round>
                    <q-icon name="download" color="green" />
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<style>
@media (min-width: 1024px) {
  .justify-md-start {
    justify-content: start;
    padding-left: 30px;
  }
  .justify-md-end {
    justify-content: end;
  }
}
/* .back-div {
  background-size: cover;
  background-position-x: center;
}

.filter-div {
  animation: filter-animation ease-in 1s;
  animation-fill-mode: forwards;
}

@keyframes filter-animation {
  0% {
    backdrop-filter: blur(10px) brightness(0.1);
  }

  100% {
    backdrop-filter: blur(15px) brightness(0.6);
  }
} */
</style>
