<template>
  <q-card style="border-radius: 30px">
    <q-card-section>
      <div class="flex justify-center q-my-lg">
        <!-- :filter="checkFileSize" -->
        <q-uploader
          style="width: 80%"
          hide-upload-btn
          auto-upload
          url="/api/tabs_upload"
          label="上传谱文件"
          multiple
          @rejected="onRejected"
        />
      </div>
      <q-card class="q-my-lg" flat>
        <q-card-section>
          <div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-editor
                v-model="editor"
                ref="editorRef"
                toolbar-text-color="white"
                toolbar-toggle-color="yellow-8"
                toolbar-bg="primary"
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
              <q-input filled v-model="tabname" label="乐谱名 *" />
              <q-input filled v-model="realname" label="原作歌曲名 *" />
              <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="tabType"
                :options="guitaroptions"
                label="谱类型"
              />

              <div class="bg-grey-2 q-pa-sm rounded-borders">
                Copyright相关
                <q-option-group
                  name="iscopyright"
                  v-model="iscopyright"
                  :options="copyright"
                  color="primary"
                  inline
                />
              </div>
              <q-input filled v-model="musiclink" label="原歌曲链接 *" />
              <div>
                <q-checkbox v-model="noname" label="匿名上传" />
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
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const submitResult = ref([]);
    const $q = useQuasar();
    const noname = ref(false);
    const accept = ref(false);
    const editorRef = ref(null);
    const tokenRef = ref(null);
    const tabname = ref(null);
    const musiclink = ref(null);
    const tabType = ref("吉他谱");
    const realname = ref(null);
    const iscopyright = ref(null);
    const guitaroptions = ["吉他谱", "贝斯谱", "乐队总谱"];
    const copyright = [
      {
        label: "转载",
        value: "true",
      },
      {
        label: "自制",
        value: "false",
      },
    ];
    function checkFileSize(files) {
      return files.filter((file) => file.size < 1024 * 16);
    }
    function onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    }

    return {
      tabname,
      noname,
      musiclink,
      realname,
      tabType,
      submitResult,
      copyright,
      iscopyright,
      guitaroptions,
      accept,
      checkFileSize,
      onRejected,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "请先同意用户协议",
          });
        } else if (tabname.value == null) {
          $q.notify({
            color: "dark-5",
            textColor: "white",
            icon: "warning",
            message: "乐谱名没有写哦",
          });
        } else if (realname.value == null) {
          $q.notify({
            color: "blue-5",
            textColor: "white",
            icon: "warning",
            message: "原歌曲名没有写哦",
          });
        } else if (iscopyright.value == null) {
          $q.notify({
            color: "green-5",
            textColor: "white",
            icon: "warning",
            message: "请填写乐谱版权类型，本数据仅作统计",
          });
        } else if (musiclink.value == null) {
          $q.notify({
            color: "dark-5",
            textColor: "white",
            icon: "warning",
            message: "请填写音乐平台对应链接，以获得更优质服务",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        tabname.value = null;
        accept.value = null;
        iscopyright.value = null;
        realname.value = null;
        musiclink.value = false;
      },
      editorRef,
      tokenRef,
      editor: ref("谱详情"),
    };
  },
};
</script>
<style lang="scss" scoped></style>
