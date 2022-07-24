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
              <q-input filled v-model="name" label="乐谱名 *" />
              <q-input filled v-model="name" label="原作歌曲名 *" />
              <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="tabType"
                :options="guitaroptions"
                label="谱类型"
              />

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
                <template v-slot:token>
                  <q-btn-dropdown
                    dense
                    no-caps
                    ref="tokenRef"
                    no-wrap
                    unelevated
                    color="white"
                    text-color="primary"
                    label="Token"
                    size="sm"
                  >
                    <q-list dense>
                      <q-item tag="label" clickable @click="add('email')">
                        <q-item-section side>
                          <q-icon name="mail" />
                        </q-item-section>
                        <q-item-section>Email</q-item-section>
                      </q-item>
                      <q-item tag="label" clickable @click="add('title')">
                        <q-item-section side>
                          <q-icon name="title" />
                        </q-item-section>
                        <q-item-section>Title</q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </template>
              </q-editor>
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                Copyright相关
                <q-option-group
                  name="preferred_genre"
                  v-model="preferred"
                  :options="copyright"
                  color="primary"
                  inline
                />
              </div>
              <q-input filled v-model="name" label="原歌曲链接 *" />
              <!-- <q-input filled type="number" v-model="age" label="Your age *" /> -->
              <div>
                <q-checkbox v-model="right1" label="匿名上传" />
              </div>
              <div>
                <q-checkbox v-model="right2" label="我接受用户协议" />
              </div>

              <!-- <div class="flex justify-start">
                <q-toggle v-model="accept" label="我接受用户协议" />
              </div> -->
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
    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const editorRef = ref(null);
    const tokenRef = ref(null);

    function checkFileSize(files) {
      return files.filter((file) => file.size < 2048);
    }
    function onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      $q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    }

    return {
      tabType: ref("吉他谱"),
      preferred: ref("rock"),
      submitResult,
      copyright: [
        {
          label: "转载",
          value: "true",
        },
        {
          label: "自制",
          value: "false",
        },
      ],
      color: ref("cyan"),
      right1: ref(false),
      right2: ref(false),
      guitaroptions: ["吉他谱", "贝斯谱", "乐队总谱"],
      name,
      age,
      accept,
      checkFileSize,
      onRejected,
      onSubmit1(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submitResult.value = data;
      },

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
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
        name.value = null;
        age.value = null;
        accept.value = false;
      },
      editorRef,
      tokenRef,
      editor: ref("谱详情"),

      add(name) {
        const edit = editorRef.value;
        tokenRef.value.hide();
        edit.caret.restore();
        edit.runCmd(
          "insertHTML",
          `&nbsp;<div class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`
        );
        edit.focus();
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
