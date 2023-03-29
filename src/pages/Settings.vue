<template>
  <div class="row justify-center">
    <div class="col-md-3 col-lg-4 col-12"></div>
    <div class="col-md-6 col-lg-4 col-12">
      <div class="q-mx-sm">
        <q-card class="my-card my-card-radius-10">
          <q-card-section class="q-pa-md q-my-lg">
            <q-img
              src="https://s1.ax1x.com/2023/03/13/ppQnDPS.md.jpg"
              height="250px"
              class="hvr-grow"
              @click="avatarBox = true"
            >
              <!-- 用q-img做背景，在其字幕处显示id和头像等 -->
              <div class="text-h5 absolute-bottom">
                <q-item class="">
                  <q-item-section avatar>
                    <q-avatar size="50px" font-size="100px">
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
            <q-dialog v-model="avatarBox">
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">更改头像与背景</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-file
                    filled
                    bottom-slots
                    v-model="avatarBeforeCutout"
                    @update:model-value="avatarChooseEvent"
                    label="上传头像"
                    counter
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="close"
                        @click.stop="avatarBeforeCutout = null"
                        class="cursor-pointer"
                      />
                    </template>
                    <template v-slot:hint>提示</template>
                  </q-file>
                  <div v-if="avatarPosted" style="width: 100%; height: 500px">
                    <vue-cropper
                      autoCrop
                      fixed
                      maxImgSize="1000"
                      limitMinSize="100"
                      centerBox
                      :img="avatarUrl"
                    ></vue-cropper>
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="更改背景" @click="bannerBox = true" />

                  <q-btn flat label="上传头像" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog
              v-model="bannerBox"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6">更改头像与背景</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-file
                    filled
                    bottom-slots
                    v-model="bannerBeforeCutout"
                    @update:model-value="bannerChooseEvent"
                    label="上传背景"
                    counter
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="close"
                        @click.stop="bannerBeforeCutout = null"
                        class="cursor-pointer"
                      />
                    </template>
                    <template v-slot:hint>提示</template>
                  </q-file>
                  <div v-if="bannerPosted" style="width: 100%; height: 500px">
                    <vue-cropper
                      autoCrop
                      maxImgSize="1500"
                      :limitMinSize="bannerrange"
                      centerBox
                      :img="bannerUrl"
                    ></vue-cropper>
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="上传背景" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-form @submit="onSubmit" class="q-gutter-lg q-mt-md">
              <q-input filled v-model="tab_detail.word" label="个人签名" />
              <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="tab_detail.musicChoice"
                :options="musicChoice"
                label="使用最多的乐器"
              />
              <q-input
                filled
                v-model="tab_detail.location"
                label="大致活动范围"
              />
              <q-editor
                v-model="tab_detail.description"
                ref="editorRef"
                class="col-10 col-md-11"
                toolbar-text-color="white"
                toolbar-toggle-color="yellow-8"
                toolbar-bg="deep-purple-4"
                :toolbar="[
                  ['bold', 'italic', 'underline'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                    },
                  ],
                ]"
              >
              </q-editor>
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
const bannerrange = new Array(200, 70);
const { userInfo, finished, userFollower, userFollowing } = useUserInfo({});
const accept = ref(false);
const musicChoice = ["吉他", "贝斯", "鼓", "键盘", "其他的乐器"];
const avatarBox = ref(false);
const avatarPosted = ref(false);

const avatarBeforeCutout = ref(false);
const avatarUrl = ref(false);
const bannerBox = ref(false);
const bannerPosted = ref(false);
const bannerBeforeCutout = ref(false);
const bannerUrl = ref(false);
const tab_detail = ref({
  files_id: [],
  word: null,
  original_music_url: null,
  location: null,
  musicChoice: "吉他",
  description: "",
  tags: null,
  cover_file_id: "",
});
function avatarChooseEvent() {
  avatarPosted.value = true;
  console.log(avatarBeforeCutout.value);
  avatarUrl.value = window.URL.createObjectURL(avatarBeforeCutout.value);
  console.log(avatarUrl.value);
}
function bannerChooseEvent() {
  bannerPosted.value = true;
  console.log(bannerBeforeCutout.value);
  bannerUrl.value = window.URL.createObjectURL(bannerBeforeCutout.value);
  console.log(bannerUrl.value);
}

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
</script>
<style lang="scss" scoped>
.q-img__content > div {
  padding: 3px;
}
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
}
</style>
