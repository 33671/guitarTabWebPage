<template>
  <div class="row">
    <div class="col-lg-3 col-12"></div>
    <div
      class="col-lg-6 col-12 q-pa-xl-xl q-pa-lg-xl q-pa-md-xl q-pa-sm-xl q-pa-xs-lg"
    >
      <DynamicScroller
        :items="items"
        :min-item-size="200"
        class="scroller"
        key-field="result"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          >
            <div class="newtab" :key="index">
              <q-separator spaced="lg" color="blue-8" class="q-mb-none" />
              <q-card class="q-mb-md" flat bordered>
                <q-card-section>
                  <div class="row">
                    <div class="col-sm-8 col-12">
                      <q-card
                        class="my-card-radius-10 q-ma-md"
                        v-ripple
                        flat
                        bordered
                        @click="
                          ($event) => {
                            router.push(`/publishView/${item.result._id}`);
                          }
                        "
                      >
                        <q-img
                          :ratio="16 / 9"
                          class="tabimg"
                          :src="`/api/cover_files/${item.result.cover_file_id}`"
                        >
                          <!-- 谱封面card -->
                          <div
                            class="absolute-bottom row justify-between items-center"
                            style="filter: none"
                          >
                            <div class="text-h6">
                              {{ item.result.tab_name }}
                            </div>
                            <div class="text-subtitle1">
                              {{ item.result.publish_date }}
                            </div>
                          </div>
                        </q-img>
                      </q-card>
                      <q-card class="my-card-radius-10 q-ma-md" flat bordered>
                        <!-- {{ user_infos.get(item.result.uploader) }} -->
                        <q-card-section class="q-pa-xs"
                          ><div class="row items-center justify-around">
                            <q-avatar size="lg">
                              <img
                                v-if="!user_infos.has(item.result.uploader)"
                                src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                              />
                              <img
                                v-else
                                :src="`/api/user/avator/${
                                  user_infos.get(item.result.uploader).avator_id
                                }`"
                              />
                            </q-avatar>
                            <div class="text-h6" v-if="user_infos.has(item.fo)">
                              {{
                                user_infos.get(item.result.uploader).nick ??
                                `@${item.fo}`
                              }}
                            </div>
                            <q-btn
                              flat
                              bordered
                              round
                              color="primary"
                              size="15px"
                              @click="pushToPlay(item.result.files_id)"
                            >
                              <q-icon name="play_arrow" /> </q-btn
                            ><q-btn
                              flat
                              bordered
                              round
                              color="primary"
                              size="15px"
                              @click="shareClick(item.result._id)"
                            >
                              <q-icon name="share" /> </q-btn
                            ><q-btn
                              flat
                              bordered
                              round
                              color="primary"
                              size="15px"
                              @click="pushToDetail(item.result._id)"
                            >
                              <q-icon name="list" />
                            </q-btn>
                          </div>
                        </q-card-section>
                        <!-- 上传者信息card -->
                      </q-card>
                    </div>
                    <div class="col-sm-4 col-12">
                      <div class="q-pa-md" style="height: 100%">
                        <q-card
                          class="my-card-radius-10"
                          style="height: 100%"
                          flat
                          bordered
                        >
                          <!-- 谱详情card -->
                          <q-card-section style="overflow: hidden">
                            <div v-html="item.result.description"></div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <q-separator spaced="lg" color="blue-8" />
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>
    <div class="col-lg-3 col-12"></div>
  </div>
</template>

<script setup>
import { axios } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, copyToClipboard } from "quasar";
import "core-js/actual/array/group-by";

const $q = useQuasar();
const router = useRouter();

const items = ref([]);
const user_infos = ref(new Map());
axios.get("/api/user/dynamics/mine").then((response) => {
  if (response.status == 200) {
    console.log(response.data);
    items.value = response.data;
    const users = response.data.groupBy((item) => item.fo);
    Object.keys(users).forEach(async (item, index) => {
      const infoRes = await axios.get(`/api/user/${item}`);
      if (infoRes.status == 200) {
        console.log(infoRes.data);
        user_infos.value.set(item, infoRes.data);
      }
    });
  }
});
function pushToPlay(taburl) {
  // console.log(taburl);
  router.push(`/tabs/${taburl[0]}`);
}
function pushToDetail(pageurl) {
  // console.log(taburl);
  router.push(`/publishView/${pageurl}`);
}
function shareClick(url) {
  copyToClipboard(url)
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
window.user_infos = user_infos;
function share() {
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    position: "center",
    message: "上传成功！稍后刷新页面",
  });
}
</script>
<style lang="scss" scoped>
.scroller {
  height: 100%;
}
.newtab {
  min-height: 400px;
}
.tabimg:hover {
  // filter: brightness(0.7);
  animation: fade-away 0.5s forwards;
}
@keyframes fade-away {
  10% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(0.6);
  }
}
</style>
