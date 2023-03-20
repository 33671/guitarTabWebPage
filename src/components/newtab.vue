<template>
  <div class="row">
    <div class="col-lg-3 col-12"></div>
    <div
      class="col-lg-6 col-12 q-pa-xl-xl q-pa-lg-xl q-pa-md-xl q-pa-sm-xl q-pa-xs-lg"
    >
      <q-card
        class="my-card-radius-20 q-mb-xl bg-blue-8"
        v-for="(new_item, index) in news"
        :key="index"
      >
        <q-card-section>
          <div class="row">
            <div class="col-sm-8 col-12">
              <q-card
                class="my-card-radius-10 q-ma-lg"
                v-ripple
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
              <q-card class="my-card-radius-10 q-ma-lg bg-light-blue-13">
                <q-card-section class="q-pa-sm"
                  ><div class="row items-center justify-around">
                    <q-avatar
                      ><img
                        src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                    /></q-avatar>
                    <div class="text-h5">
                      {{ new_item.result.uploader }}
                    </div>
                    <q-btn round color="primary" size="15px">
                      <q-icon name="star" /> </q-btn
                    ><q-btn round color="primary" size="15px">
                      <q-icon name="share" /> </q-btn
                    ><q-btn round color="primary" size="15px">
                      <q-icon name="list" />
                    </q-btn>
                  </div>
                </q-card-section>
                <!-- 上传者信息card -->
              </q-card>
            </div>
            <div class="col-sm-4 col-12">
              <div class="q-pa-lg" style="height: 100%">
                <q-card
                  class="my-card-radius-10 bg-light-blue-4"
                  style="height: 100%"
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
    </div>
    <div class="col-lg-3 col-12"></div>
  </div>
</template>

<script setup>
import { axios } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const $q = useQuasar();
const router = useRouter();
const news = ref([]);
axios.get("/api/user/dynamics/mine").then((response) => {
  if (response.status == 200) {
    console.log(response.data);
    news.value = response.data;
  }
});
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
.my-card-radius-20 {
  border-radius: 20px;
}
.my-card-radius-10 {
  border-radius: 10px;
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
