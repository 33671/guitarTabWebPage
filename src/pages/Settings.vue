<template>
  <div class="row justify-center">
    <div class="col-md-3 col-lg-4 col-12"></div>
    <div class="col-md-6 col-lg-4 col-12">
      <div class="q-mx-sm">
        <q-card class="my-card my-card-radius-10">
          <q-card-section class="q-pa-md q-my-lg">
            <div v-if="avatarPosted" style="width: 100%; height: 500px">
              <vue-cropper
                autoCrop
                fixed
                img="https://shnhz.github.io/shn-ui/img/Koala.jpg"
              ></vue-cropper>
            </div>
            <div v-if="bannerPosted" style="width: 100%; height: 500px">
              <vue-cropper
                autoCrop
                fixed
                img="https://shnhz.github.io/shn-ui/img/Koala.jpg"
              ></vue-cropper>
            </div>
            <q-img
              src="https://s1.ax1x.com/2023/03/13/ppQnDPS.md.jpg"
              height="250px"
            >
              <!-- 用q-img做背景，在其字幕处显示id和头像等 -->
              <div class="text-h5 absolute-bottom">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar class="">
                      <img
                        :src="'/api/user/avator/' + userInfo.avator_id"
                        v-if="userInfo.avator_id != undefined"
                      />
                      <img
                        src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                        v-else
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label class="text-cyan-4">{{
                      userInfo.nick
                    }}</q-item-label>
                    <q-item-label caption class="text-white"
                      >@{{ userInfo.name }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </div>
            </q-img>
            <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
              <q-input filled v-model="tab_detail.word" label="留下点什么吧" />
              <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="tab_detail.musicChoice"
                :options="musicChoice"
                label="如果要做选择的话？"
              />
              <q-input
                filled
                v-model="tab_detail.location"
                label="如果想找到同好的话，写上大致活动范围吧"
              />
              <div class="flex justify-start">
                <q-toggle v-model="accept" label="我接受用户协议" />
              </div>
              <div class="flex justify-end">
                <q-btn label="发布" type="submit" color="primary" />
                <q-btn
                  label="重设"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-md-3 col-lg-4 col-12"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { axios } from "src/boot/axios";
import useUserInfo from "src/composables/userInfo";

const { userInfo, finished, userFollower, userFollowing } = useUserInfo({});
const accept = ref(false);
const submitResult = ref([]);
const musicChoice = ["吉他", "贝斯", "鼓", "键盘", "更少见更好的乐器"];
const copyright = [
  {
    label: "转载",
    value: true,
  },
  {
    label: "自制",
    value: false,
  },
];
const tab_detail = ref({
  files_id: [],
  word: null,
  is_anonymous: false,
  original_music_url: null,
  location: null,
  musicChoice: "吉他",
  is_reshiped: null,
  description: "详情",
  tags: null,
  cover_file_id: "",
  themeColor: "blue-8",
});
// function uploaded(info) {
//   tab_detail.value.files_id.push(JSON.parse(info.xhr.response).tab_file_id);
//   $q.notify({
//     color: "green-5",
//     textColor: "white",
//     icon: "warning",
//     message: "文件上传成功！",
//   });
// }
// function checkFileSize(files) {
//   return files.filter((file) => file.size < 1024 * 16);
// }
// function onRejected(rejectedEntries) {
//   $q.notify({
//     type: "negative",
//     message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
//   });
// }
// function coverUploaded(info) {
//   tab_detail.value.cover_file_id = JSON.parse(info.xhr.response).cover_file_id;
//   $q.notify({
//     color: "green-5",
//     textColor: "white",
//     icon: "warning",
//     message: "封面上传成功！",
//   });
// }
// const upload_object = unref(tab_detail);
// const resp = await axios.post("/api/tabs_publish", upload_object);
// if (resp.status == 200) {
//   $q.notify({
//     color: "green-4",
//     textColor: "white",
//     icon: "cloud_done",
//     message: "上传成功！稍后刷新页面",
//   });
// }

const avatarPosted = ref(false);
const bannerPosted = ref(false);
</script>
<style lang="sass" scoped>
.q-img__content > div
  padding: 6px
</style>
