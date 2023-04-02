<template>
  <div class="row justify-center">
    <div class="col-md-3 col-lg-4 col-12"></div>
    <div class="col-md-6 col-lg-4 col-12">
      <div class="q-mx-sm">
        <q-card class="my-card my-card-radius-10" v-if="finished">
          <q-card-section class="q-pa-md q-my-lg">
            <q-img
              :src="'/api/user/avator/' + userdetail.reserve_field.banner_id"
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
                        :src="'/api/user/avator/' + userdetail.avator_id"
                        v-if="userdetail.avator_id != undefined"
                      />
                      <img
                        src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                        v-else
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label class="text-cyan-4">{{
                      userdetail.nick
                    }}</q-item-label>
                    <q-item-label caption class="text-white"
                      >@{{ userdetail.name }}</q-item-label
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
                      ref="cropper"
                      autoCrop
                      fixed
                      maxImgSize="1000"
                      limitMinSize="100"
                      outputSize="0.1"
                      centerBox
                      :img="avatarUrl"
                    ></vue-cropper>
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="更改背景" @click="bannerBox = true" />

                  <q-btn
                    flat
                    label="上传头像"
                    v-close-popup
                    @click="uploadAvator"
                  />
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
                      ref="cropper_banner"
                      autoCrop
                      maxImgSize="1500"
                      :limitMinSize="bannerrange"
                      centerBox
                      outputSize="0.5"
                      :img="bannerUrl"
                    ></vue-cropper>
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn
                    flat
                    label="上传背景"
                    v-close-popup
                    @click="uploadBanner"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-form class="q-gutter-lg q-mt-md">
              <q-input
                filled
                ref="nickRef"
                v-model="userdetail.nick"
                lazy-rules
                :rules="[(val) => !!val || '昵称不能为空']"
                label="昵称"
              />

              <q-input
                filled
                v-model="userdetail.bio"
                ref="bioRef"
                lazy-rules
                :rules="[
                  (val) => val == null || val.length < 100 || '签名过长。。',
                ]"
                label="个人签名"
              />
              <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="userdetail.reserve_field.musicChoice"
                :options="musicChoice"
                label="使用最多的乐器"
              />
              <q-input
                filled
                v-model="userdetail.reserve_field.location"
                lazy-rules
                ref="locationRef"
                :rules="[
                  (val) => val == null || val.length < 20 || '太长了。。。',
                ]"
                label="大致活动范围"
              /><q-input
                filled
                v-model="userdetail.reserve_field.social.bilibili"
                ref="bilibiliRef"
                :rules="[
                  (val) =>
                    val == null ||
                    val.length < 120 ||
                    '链接过长，请检验是否正确',
                ]"
                label="BiliBili个人空间链接"
                ><template v-slot:prepend>
                  <q-icon size="26px">
                    <img src="/icons/Bilibili.svg" alt="" />
                  </q-icon>
                </template> </q-input
              ><q-input
                filled
                v-model="userdetail.reserve_field.social.netease"
                ref="neteaseRef"
                :rules="[
                  (val) => val == null || val.length < 120 || '昵称不能为空',
                ]"
                label="网易云个人页面链接"
                ><template v-slot:prepend>
                  <q-icon size="26px">
                    <img src="/icons/NeteaseMusic.svg" alt="" />
                  </q-icon>
                </template> </q-input
              ><q-input
                filled
                v-model="userdetail.reserve_field.social.wechat"
                ref="wechatRef"
                :rules="[
                  (val) => val == null || val.length < 120 || '昵称不能为空',
                ]"
                label="微信号/手机号"
                ><template v-slot:prepend>
                  <q-icon size="26px">
                    <img src="/icons/Wechat.svg" alt="" />
                  </q-icon>
                </template> </q-input
              ><q-input
                filled
                v-model="userdetail.reserve_field.social.qq"
                ref="qqRef"
                :rules="[
                  (val) => val == null || val.length < 120 || '昵称不能为空',
                ]"
                label="QQ号"
                ><template v-slot:prepend>
                  <q-icon size="26px">
                    <img src="/icons/qq.svg" alt="" />
                  </q-icon>
                </template>
              </q-input>
              <q-editor
                v-model="userdetail.reserve_field.description"
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

              <div class="flex justify-end">
                <q-btn
                  label="提交更新"
                  type="submit"
                  color="primary"
                  @click="submit"
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
import { ref, unref } from "vue";
import { axios } from "src/boot/axios";
import { useQuasar } from "quasar";
const $q = useQuasar();

const bannerrange = new Array(200, 70);
const musicChoice = ["吉他", "贝斯", "鼓", "键盘", "其他的乐器"];
const avatarBox = ref(false);
const avatarPosted = ref(false);
const finished = ref(false);
const avatarBeforeCutout = ref(false);
const avatarUrl = ref(false);
const bannerBox = ref(false);
const bannerPosted = ref(false);
const bannerBeforeCutout = ref(false);
const bannerUrl = ref(false);
const cropper = ref(null);
const cropper_banner = ref(null);

const userdetail = ref({
  avator_id: "",
  bio: "",
  nick: "",
  reserve_field: {
    social: { bilibili: "", netease: "", wechat: "", qq: "" },
    location: "",
    musicChoice: "吉他",
    description: "",
    banner_id: "",
  },
});
axios.get("/api/user/mine").then(async (resp) => {
  if (resp.status === 200) {
    console.log(resp.data);
    if (typeof resp.data.reserve_field != undefined) {
      userdetail.value.reserve_field = resp.data.reserve_field;
    }
    userdetail.value.bio = resp.data.bio;
    userdetail.value.nick = resp.data.nick;
    userdetail.value.avator_id = resp.data.avator_id;
    userdetail.value.name = resp.data.name;
    finished.value = true;
  }
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
function uploadAvator() {
  if (cropper.value != null) {
    cropper.value.getCropBlob(async (data) => {
      const fd = new FormData();
      const file = new File([data], "filename.jpeg");
      fd.append("image", file);
      const response = await axios.post("/api/user/avator", fd);
      if (response.status == 200) {
        userdetail.value.avator_id = response.data.avator_file_id;
        $q.notify({
          type: "positive",
          message: "上传头像成功，退出前记得保存",
        });
      }
    });
  }
}
function uploadBanner() {
  if (cropper_banner.value != null) {
    cropper_banner.value.getCropBlob(async (data) => {
      const fd = new FormData();
      const file = new File([data], "filename.jpeg");
      fd.append("image", file);
      const response = await axios.post("/api/user/avator", fd);
      if (response.status == 200) {
        userdetail.value.reserve_field.banner_id = response.data.avator_file_id;
        $q.notify({
          type: "positive",
          message: "上传背景成功，退出前记得保存",
        });
      }
    });
  }
}
const nickRef = ref(null);
const bioRef = ref(null);
const locationRef = ref(null);
const bilibiliRef = ref(null);
const neteaseRef = ref(null);
const wechatRef = ref(null);
const qqRef = ref(null);

async function submit() {
  nickRef.value.validate();
  bioRef.value.validate();
  locationRef.value.validate();
  bilibiliRef.value.validate();
  neteaseRef.value.validate();
  wechatRef.value.validate();
  qqRef.value.validate();
  if (
    nickRef.value.hasError ||
    bioRef.value.hasError ||
    locationRef.value.hasError ||
    bilibiliRef.value.hasError ||
    neteaseRef.value.hasError ||
    wechatRef.value.hasError ||
    qqRef.value.hasError
  ) {
    console.log("error");
  } else {
    const resp = await axios.put("/api/user/mine", unref(userdetail));
    if (resp.status == 200) {
      console.log(resp.data);
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "保存成功！",
      });
    }
  }
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
// const upload_object = unref(userdetail);
// const resp = await axios.put("/api/user/mine", upload_object);
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
