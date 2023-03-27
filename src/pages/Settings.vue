<template>
  <div class="row justify-center">
    <div class="col-12 col-lg-4"></div>
    <div class="col-12 col-lg-4 q-px-sm">
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
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled v-model="tab_detail.tab_name" label="乐谱名 *" />
            <q-input
              filled
              v-model="tab_detail.music_name"
              label="原作歌曲名 *"
            />
            <q-select
              transition-show="jump-up"
              transition-hide="jump-up"
              v-model="tab_detail.tab_type"
              :options="guitaroptions"
              label="谱类型"
            /><q-select
              label="添加标签"
              filled
              v-model="tab_detail.tags"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
            />

            <div class="bg-grey-2 q-pa-sm rounded-borders">
              Copyright相关
              <q-option-group
                name="is_reshiped"
                v-model="tab_detail.is_reshiped"
                :options="copyright"
                color="primary"
                inline
              />
            </div>
            <q-input
              filled
              v-model="tab_detail.original_music_url"
              label="原歌曲链接(请填写原歌曲任意的第三方链接) *"
            />
            <div>
              <q-checkbox v-model="tab_detail.is_anonymous" label="匿名上传" />
            </div>

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
    <div class="col-12 col-lg-4"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { axios } from "src/boot/axios";
const accept = ref(false);
const submitResult = ref([]);
const guitaroptions = ["吉他谱", "贝斯谱", "乐队总谱"];
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
  tab_name: null,
  is_anonymous: false,
  original_music_url: null,
  music_name: null,
  tab_type: "吉他谱",
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
