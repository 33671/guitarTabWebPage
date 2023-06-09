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
            class="col-12 col-md-7 isMobileTextCenter justify-center q-pl-md-lg row-md justify-md-start flex-wrap items-center"
          >
            <div class="text-h4 ellipsis col-md-7">
              {{ info.tab_name }}
            </div>
            <div class="text-caption col-md-9 wrap">
              <div
                class="row items-center justify-md-start justify-center"
                style="cursor: pointer; user-select: none"
                @click="router.push(`/user/${info.uploader}`)"
              >
                <q-avatar size="lg">
                  <img
                    :src="`/api/user/avator/${info.uploader_detail.avator_id}`"
                  />
                </q-avatar>
                <span class="text-h6 q-ml-md">
                  {{ `${info.uploader_detail.nick}` }}
                </span>
              </div>
              <br />
              收藏:{{ info.fav_times }} <br />

              标签：
              <q-chip
                clickable
                v-for="(item, key) in info.tags"
                @click="entersearch(item)"
                :key="key"
              >
                #{{ item }}</q-chip
              >
            </div>
          </div>
          <div class="col-12 col-md-2 flex items-center justify-center">
            <div class="row">
              <div class="col q-mx-sm">
                <q-btn
                  round
                  color="primary"
                  size="20px"
                  @click.stop.prevent="pushToPlay"
                >
                  <q-icon name="play_arrow" />
                </q-btn>
              </div>
              <div class="col q-mx-sm">
                <q-btn
                  round
                  color="primary"
                  size="20px"
                  @click.stop.prevent="pushToFav"
                >
                  <q-icon name="star" :color="isInMyFav ? 'red' : 'white'" />
                </q-btn>
              </div>
              <div class="col q-mx-sm">
                <q-btn round color="primary" size="20px" @click="shareClick">
                  <q-icon name="share" />
                </q-btn>
              </div>
            </div>
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
              <q-tab-panels v-model="tab" animated>
                <!-- vertical
                transition-prev="slide-down"
                transition-next="slide-up" -->
                <q-tab-panel class="q-pa-none q-pa-md-sm" name="简介">
                  <q-card-section
                    class="q-pa-lg"
                    v-if="finished"
                    v-html="info.description"
                  >
                  </q-card-section>
                </q-tab-panel>
                <q-tab-panel class="q-pa-none q-pa-md-sm" name="评论">
                  <CommentCard :publish-id="props.publishId"></CommentCard>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
      </div>
      <div class="col-md-3 col-12">
        <TabPublishInfoTable :info="info"></TabPublishInfoTable>
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
<script setup>
import { useQuasar, copyToClipboard } from "quasar";
import { axios } from "src/boot/axios";
import usefav from "src/composables/fav";
import useHistory from "src/composables/history";
import CommentCard from "src/components/CommentCard.vue";
import TabPublishInfoTable from "src/components/TabPublishInfoTable.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSearch from "./../search_input";

const route = useRoute();
const { pushToHistory } = useHistory();
const { searchText, search } = useSearch();
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
function entersearch(item) {
  searchText.value = item;
  search();
  if (route.path != "/search") {
    router.push("/search");
  }
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
  finished.value = true;
  pushToHistory(data);
});
function shareClick() {
  copyToClipboard(info.value.tab_name)
    .then(() => {
      $q.notify({
        color: "blue-5",
        textColor: "white",
        icon: "accessible_forward",
        message: "已复制链接",
      }); // 成功!
    })
    .catch(() => {
      $q.notify({
        color: "blue-5",
        textColor: "white",
        icon: "sentiment_very_dissatisfied",
        message: "复制链接失败，似乎是浏览器不兼容",
      });
    });
}
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

<style scoped>
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
