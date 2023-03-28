<template>
  <div class="inputFrame"></div>
  <q-input
    outlined
    bottom-slots
    v-model="commentText"
    :label="reply.is_replying ? '回复给' + reply.user : '发送评论'"
    counter
    maxlength="500"
  >
    <template v-slot:before>
      <q-avatar rounded color="primary" text-color="white">
        <!-- <img
                          v-if="hasAvatar"
                          src="https://cdn.quasar.dev/img/boy-avatar.png"
                        /> -->
        <span>G</span>
      </q-avatar>
    </template>

    <template v-slot:append>
      <q-icon
        v-if="commentText !== ''"
        name="close"
        @click="commentText = ''"
        class="cursor-pointer"
      />
    </template>

    <template v-slot:hint> </template>

    <template v-slot:after>
      <q-btn round dense flat icon="send" @click="sendInput()" />
    </template>
  </q-input>
  <!-- 评论列表 -->
  <q-list flat>
    <q-item v-for="(item, index) in comments" :key="index" class="q-pl-none">
      <q-item-section top avatar>
        <!--头像-->
        <q-avatar rounded color="primary" text-color="white">
          <span>G</span>
        </q-avatar>
      </q-item-section>
      <!--用户名 -->
      <q-item-section>
        <q-item-label caption>{{ item.user }} </q-item-label>
        <q-item-label>{{ item.text }}</q-item-label>
        <!-- <div ></div> -->
        <q-expansion-item
          switch-toggle-side
          dense-toggle
          style="margin-top: 10px"
          v-if="item.replies.length != 0"
          v-model="item.expanded"
          dense
          :label="item.expanded ? '收起回复' : '展开回复'"
        >
          <!-- :style="{ width: CommentExpanded ? '' : '150px' }" -->
          <q-item
            class="q-pl-none"
            v-for="(re, index) in item.replies"
            :key="index"
          >
            <q-item-section top avatar>
              <!--头像-->
              <q-avatar rounded color="primary" text-color="white">
                <span>G</span>
              </q-avatar>
            </q-item-section>
            <!--用户名 -->
            <q-item-section>
              <q-item-label caption>{{ re.user_name }} </q-item-label>
              <q-item-label>{{ re.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-btn
          flat
          rounded
          color="primary"
          size="sm"
          label="回复"
          class="q-px-sm-none"
          style="width: 80px"
          @click="ReplyToComment(item._id, item.user)"
        ></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentCommentPage"
      :max="totalPageNum"
      @update:model-value="turnToPage($event)"
      direction-links
      boundary-links
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    />
  </div>
</template>
<script setup>
import useComments from "src/composables/useComments";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  publishId: String,
});
function ReplyToComment(id, user) {
  commentText.value = "";
  document
    .getElementsByClassName("inputFrame")[0]
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  reply.is_replying = true;
  reply.text = "";
  reply.id = id;
  reply.user = user;
}
const reply = reactive({
  is_replying: false,
  text: "",
  id: "",
  user: "",
});
async function sendInput() {
  if (reply.is_replying) {
    if (await ReplyTo(reply.id, reply.user)) {
      router.go(0);
    }
  } else {
    sendComment();
  }
}
const {
  ReplyTo,
  commentText,
  comments,
  sendComment,
  totalPageNum,
  currentCommentPage,
  turnToPage,
} = useComments(props.publishId);
</script>
