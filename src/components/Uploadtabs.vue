<template>
  <q-card style="border-radius: 30px">
    <q-card-section>
      <div class="row justify-center q-my-lg q-gutter-y-md q-gutter-x-md">
        <!-- :filter="checkFileSize" -->
        <q-uploader
          class="col-10 col-md-6"
          hide-upload-btn
          auto-upload
          url="/api/tab_files"
          label="上传谱文件"
          multiple
          @uploaded="uploaded"
          @rejected="onRejected"
        />
        <q-uploader
          class="col-10 col-md-4"
          url="/api/cover_files"
          color="teal"
          hide-upload-btn
          auto-upload
          :multiple="false"
          accept=".jpg, image/*"
          @uploaded="coverUploaded"
          @rejected="onRejected"
          label="上传封面"
        />
      </div>
      <q-card class="q-my-lg" flat>
        <q-card-section>
          <div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
              />
              <h6 class="q-mb-none">曲谱主题色：</h6>
              <div class="row q-mt-none">
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    v-model="color"
                    size="100px"
                    val="teal"
                    color="blue-8"
                  />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    size="100px"
                    v-model="color"
                    val="orange"
                    color="orange-13"
                  />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    size="100px"
                    v-model="color"
                    val="red"
                    color="pink-4"
                  />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    size="100px"
                    v-model="color"
                    val="cyan"
                    color="green-7"
                  />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    v-model="color"
                    size="100px"
                    val="teal"
                    color="blue-grey-6"
                  />
                </div>
                <div class="col-lg-2 col-md-2 col-sm-4 col-4">
                  <q-radio
                    keep-color
                    v-model="color"
                    size="100px"
                    val="teal"
                    color="teal-7"
                  />
                </div>
              </div>
              <q-editor
                v-model="tab_detail.description"
                ref="editorRef"
                class="col-10 col-md-11"
                toolbar-text-color="white"
                toolbar-toggle-color="yellow-8"
                toolbar-bg="purple"
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
              <q-select
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
                label="原歌曲链接 *"
              />
              <div>
                <q-checkbox
                  v-model="tab_detail.is_anonymous"
                  label="匿名上传"
                />
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
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import { Axios } from "axios";
import { useQuasar } from "quasar";
import { axios } from "src/boot/axios";
import router from "src/router";
import { ref, unref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const submitResult = ref([]);
    const $q = useQuasar();
    const accept = ref(false);
    const editorRef = ref(null);

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
    });
    function uploaded(info) {
      tab_detail.value.files_id.push(JSON.parse(info.xhr.response).tab_file_id);
      $q.notify({
        color: "green-5",
        textColor: "white",
        icon: "warning",
        message: "文件上传成功！",
      });
    }
    function checkFileSize(files) {
      return files.filter((file) => file.size < 1024 * 16);
    }
    function onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    }
    function coverUploaded(info) {
      tab_detail.value.cover_file_id = JSON.parse(
        info.xhr.response
      ).cover_file_id;
      $q.notify({
        color: "green-5",
        textColor: "white",
        icon: "warning",
        message: "封面上传成功！",
      });
    }

    return {
      guitaroptions,
      uploaded,
      tab_detail,
      checkFileSize,
      onRejected,
      coverUploaded,
      copyright,
      submitResult,
      accept,
      async onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "请先同意用户协议",
          });
          return;
        }
        if (tab_detail.value.tab_name == null) {
          $q.notify({
            color: "dark-5",
            textColor: "white",
            icon: "warning",
            message: "乐谱名没有写哦",
          });
          return;
        }
        if (tab_detail.value.music_name == null) {
          $q.notify({
            color: "blue-5",
            textColor: "white",
            icon: "warning",
            message: "原歌曲名没有写哦",
          });
          return;
        }
        if (tab_detail.value.is_reshiped == null) {
          $q.notify({
            color: "green-5",
            textColor: "white",
            icon: "warning",
            message: "请填写乐谱版权类型，本数据仅作统计",
          });
          return;
        }
        if (tab_detail.value.original_music_url == null) {
          $q.notify({
            color: "dark-5",
            textColor: "white",
            icon: "warning",
            message: "请填写音乐平台对应链接，以获得更优质服务",
          });
          return;
        }

        const upload_object = unref(tab_detail);
        const resp = await axios.post("/api/tabs_publish", upload_object);
        if (resp.status == 200) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "上传成功！稍后刷新页面",
          });
          setTimeout(() => {
            router.go(0);
          }, 3000);
        }
        console.log(resp);
      },

      onReset() {
        tab_detail.value.tab_name = null;
        tab_detail.value.accept = null;
        tab_detail.value.is_reshiped = null;
        tab_detail.value.music_name = null;
        tab_detail.value.original_music_url = "";
      },
      editorRef,
      description: ref("谱详情"),
    };
  },
};
</script>
<style lang="scss" scoped></style>
