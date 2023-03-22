<template>
  <div class="row">
    <div class="col-lg-3 col-12"></div>
    <div
      class="col-lg-6 col-12 q-pa-xl-xl q-pa-lg-xl q-pa-md-xl q-pa-sm-xl q-pa-xs-lg"
    >
      <div class="" v-for="(new_item, index) in news" :key="index">
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
                      router.push(`/publishView/${new_item.result._id}`);
                    }
                  "
                >
                  <q-img
                    :ratio="16 / 9"
                    class="tabimg"
                    :src="`/api/cover_files/${new_item.result.cover_file_id}`"
                  >
                    <!-- 谱封面card -->
                    <div
                      class="absolute-bottom row justify-between items-center"
                      style="filter: none"
                    >
                      <div class="text-h6">{{ new_item.result.tab_name }}</div>
                      <div class="text-subtitle1">
                        {{ new_item.result.publish_date }}
                      </div>
                    </div>
                  </q-img>
                </q-card>
                <q-card class="my-card-radius-10 q-ma-md" flat bordered>
                  <!-- {{ user_infos.get(new_item.result.uploader) }} -->
                  <q-card-section class="q-pa-xs"
                    ><div class="row items-center justify-around">
                      <q-avatar size="lg">
                        <img
                          v-if="!user_infos.has(new_item.result.uploader)"
                          src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                        />
                        <img
                          v-else
                          :src="`/api/user/avator/${
                            user_infos.get(new_item.result.uploader).avator_id
                          }`"
                        />
                      </q-avatar>
                      <div class="text-h6" v-if="user_infos.has(new_item.fo)">
                        {{
                          user_infos.get(new_item.result.uploader).nick ??
                          `@${new_item.fo}`
                        }}
                      </div>
                      <q-btn flat bordered round color="primary" size="15px">
                        <q-icon name="star" /> </q-btn
                      ><q-btn flat bordered round color="primary" size="15px">
                        <q-icon name="share" /> </q-btn
                      ><q-btn flat bordered round color="primary" size="15px">
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
                    <q-card-section>
                      <div v-html="new_item.result.description"></div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-separator spaced="lg" color="blue-8" />
      </div>
    </div>
    <div class="col-lg-3 col-12"></div>
  </div>
</template>

<script setup>
import { axios } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import "core-js/actual/array/group-by";

const $q = useQuasar();
const router = useRouter();
const news = ref([]);
const user_infos = ref(new Map());
axios.get("/api/user/dynamics/mine").then((response) => {
  if (response.status == 200) {
    console.log(response.data);
    news.value = response.data;
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
