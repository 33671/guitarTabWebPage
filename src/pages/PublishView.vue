<script setup>
import { useQuasar } from "quasar";
import { axios } from "src/boot/axios";
import usefav from "src/composables/fav";
import useHistory from "src/composables/history";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const { pushToHistory } = useHistory();

const { isInfav, removefav, addTofav } = usefav();
const props = defineProps({
  publishId: String,
});
const $q = useQuasar();
const isInMyFav = ref(false);
async function refreshFavStatus() {
  const r = await isInfav(props.publishId);
  isInMyFav.value = r;
}
async function pushToFav() {
  if (isInMyFav.value) {
    await removefav(props.publishId);
    await refreshFavStatus();
    if (!isInMyFav.value) {
      $q.notify({
        color: "blue-5",
        textColor: "white",
        icon: "star",
        message: "已取消收藏",
      });
    }
    return;
  }
  const r = await addTofav(props.publishId);
  if (r) {
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "star",
      message: "收藏成功！",
    });
    refreshFavStatus();
  }
}
const info = ref({});
const scores = ref([]);
const finished = ref(false);
onMounted(async () => {
  const res = await axios.get(`/api/tabs_publish/${props.publishId}`);
  const data = res.data;
  // console.log(data);
  info.value = data;
  data["files_id"].forEach(async (file_id) => {
    const _data = (await axios.get(`/api/tab_files/${file_id}/info`)).data;
    _data["file_id"] = file_id;
    scores.value.push(_data);
  });
  info.value.tags = data.tags.map((x) => "#" + x).join(" ");
  finished.value = true;
  pushToHistory(data);
});
const router = useRouter();
const pushToPlay = () => {
  const gps = scores.value
    .filter(
      (x) =>
        x.file_name.endsWith(".gp") ||
        x.file_name.endsWith(".gp5") ||
        x.file_name.endsWith(".gpx") ||
        x.file_name.endsWith(".gp3") ||
        x.file_name.endsWith(".gp4") ||
        x.file_name.endsWith(".gp7")
    )
    .map((x) => x.file_id);

  if (gps.length == 0) return;
  router.push(`/tabs/${gps[0]}`);
};
const pushToPlayFile = (x) => {
  if (
    !(
      x.file_name.endsWith(".gp") ||
      x.file_name.endsWith(".gp5") ||
      x.file_name.endsWith(".gpx") ||
      x.file_name.endsWith(".gp3") ||
      x.file_name.endsWith(".gp4") ||
      x.file_name.endsWith(".gp7")
    )
  )
    return;
  router.push(`/tabs/${x.file_id}`);
};
const download = (x) => {
  window.location = `/api/tab_files/${x.file_id}`;
};
const tab = ref("简介");
const splitterModel = ref(12);
refreshFavStatus();
</script>

<template>
  <q-page padding>
    <div class="back-div">
      <div class="col-md-9 filter-div" flat>
        <div class="flex row" style="height: 100%">
          <div
            class="col-12 col-md-3 flex justify-center justify-sm-center justify-md-end q-py-sm"
          >
            <q-img
              v-if="info.cover_file_id != undefined || info.cover_file_id == ''"
              :src="'/api/cover_files/' + info.cover_file_id"
              width="180px"
              height="180px"
            />
            <q-skeleton v-else width="180px" height="180px" />
          </div>
          <div
            v-if="finished"
            class="col-12 col-md-7 isMobileTextCenter justify-center q-pl-lg row-md justify-md-start flex-wrap items-center"
          >
            <div class="text-h4 ellipsis col-md-7">
              {{ info.tab_name }}
            </div>
            <div class="text-caption ellipsis col-md-7">
              收藏:1277 标签：{{ info.tags }}
            </div>
          </div>
          <div
            class="col-12 col-md-2 flex items-center justify-center no-wrap q-gutter-md"
          >
            <!-- <div class=""> -->
            <q-btn
              round
              color="primary"
              size="20px"
              @click.stop.prevent="pushToPlay"
            >
              <q-icon name="play_arrow" />
            </q-btn>
            <q-btn
              round
              color="primary"
              size="20px"
              @click.stop.prevent="pushToFav"
            >
              <q-icon name="star" :color="isInMyFav ? 'red' : 'white'" />
            </q-btn>
            <q-btn round color="primary" size="20px">
              <q-icon name="open_in_new" />
            </q-btn>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <q-separator spaced />
    <div class="row justify-between q-gutter-y-md">
      <div class="q-px-sm col-md-9 col-12">
        <q-card class="q-px-lg" style="height: 100%">
          <q-splitter v-model="splitterModel" horizontal>
            <template v-slot:before>
              <q-tabs v-model="tab" align="left" horizontal class="text-teal">
                <q-tab class="text-purple" name="简介" label="简介" />
                <q-tab class="text-orange" name="评论" label="评论" />
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
      <div class="col-md-3 col-12">
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
                  <q-btn
                    color="primary"
                    flat
                    round
                    @click.stop.prevent="pushToPlayFile(score)"
                  >
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
                  <q-btn
                    color="primary"
                    flat
                    round
                    @click.stop.prevent="download(score)"
                  >
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
@media (max-width: 1024px) {
  /* .justify-md-start {
    justify-content: start;
    padding-left: 30px;
  }
  .justify-md-end {
    justify-content: end;
  } */
  .isMobileTextCenter {
    text-align: center;
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
