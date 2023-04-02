<template>
  <div class="row justify-center">
    <q-card class="my-card" v-if="finished">
      <q-img
        :src="'/api/user/avator/' + userInfo.reserve_field.banner_id"
        v-if="userInfo.reserve_field.banner_id != null"
      >
        <!-- 用q-img做背景，在其字幕处显示id和头像等 -->
        <div class="text-h5 absolute-bottom">
          <q-item class="q-py-xm q-px-sm">
            <q-item-section avatar>
              <q-avatar class="" size="46px">
                <img
                  :src="'/api/user/avator/' + userInfo.avator_id"
                  v-if="userInfo.avator_id != null"
                />
                <img
                  src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                  v-else
                />
              </q-avatar>
            </q-item-section>
            <q-item-section caption>
              <q-item-label class="text-cyan-4 text-no-wrap">
                {{ userInfo.nick }}
              </q-item-label>
              <q-item-label caption class="text-white text-no-wrap"
                >@{{ userInfo.name }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-md" style="margin-top: 7px">
                <div
                  class="col self-end hvr-grow"
                  v-if="userInfo.reserve_field.social.bilibili != ''"
                >
                  <a :href="userInfo.reserve_field.social.bilibili">
                    <q-icon size="26px">
                      <img src="/icons/Bilibili.svg" alt="" />
                    </q-icon>
                    <!-- <bilibili-icon style="fill: rgb(251, 114, 153)" size="26" -->
                  </a>
                </div>
                <div
                  class="col self-end hvr-grow"
                  v-if="userInfo.reserve_field.social.qq != ''"
                >
                  <a :href="userInfo.reserve_field.social.qq">
                    <q-icon size="26px">
                      <img src="/icons/qq.svg" alt="" />
                    </q-icon>
                    <!-- <bilibili-icon style="fill: rgb(251, 114, 153)" size="26" -->
                  </a>
                </div>
                <div
                  class="col self-end hvr-grow"
                  v-if="userInfo.reserve_field.social.netease != ''"
                >
                  <a :href="userInfo.reserve_field.social.netease">
                    <q-icon size="26px">
                      <img src="/icons/NeteaseMusic.svg" alt="" />
                    </q-icon>
                    <!-- <bilibili-icon style="fill: rgb(251, 114, 153)" size="26" -->
                  </a>
                </div>
                <div
                  class="col self-end hvr-grow"
                  v-if="userInfo.reserve_field.social.wechat != ''"
                >
                  <a :href="userInfo.reserve_field.social.wechat">
                    <q-icon size="26px">
                      <img src="/icons/Wechat.svg" alt="" />
                    </q-icon>
                    <!-- <bilibili-icon style="fill: rgb(251, 114, 153)" size="26" -->
                  </a>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-img>

      <div class="q-pt-sm q-px-md q-pb-md" style="max-width: 600px">
        <!-- <div class="row justify-center text-cyan-8 text-no-wrap text-h5">
          {{ userInfo.bio }}
        </div> -->

        <div class="row justify-center q-mt-sm">
          <q-btn
            color="light-blue-8 "
            outline
            rounded
            class="full-width"
            no-wrap
          >
            <div class="">关注</div>
          </q-btn>
        </div>

        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="teal" text-color="white">
                <q-icon size="29px"
                  ><img
                    :src="`icons/${userInfo.reserve_field.musicChoice}.svg`" /></q-icon
              ></q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row">
                最近常用
                <div class="text-cyan-8">
                  {{ userInfo.reserve_field.musicChoice }}
                </div>
              </div></q-item-section
            >
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="userInfo.reserve_field.location != ''"
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white"
                ><q-icon name="place" size="25px"
              /></q-avatar>
            </q-item-section>

            <q-item-section>
              {{ userInfo.reserve_field.location }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-if="userInfo.reserve_field.social.bilibili != ''"
          >
            <q-item-section avatar>
              <q-avatar color="" text-color="white">
                <q-icon size="32px">
                  <img src="/icons/Bilibili.svg" alt="" />
                </q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ userInfo.reserve_field.social.bilibili }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-if="userInfo.reserve_field.social.netease != ''"
          >
            <q-item-section avatar>
              <q-avatar color="" text-color="white">
                <q-icon size="34px">
                  <img src="/icons/NeteaseMusic.svg" alt="" />
                </q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ userInfo.reserve_field.social.netease }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-if="userInfo.reserve_field.social.wechat != ''"
          >
            <q-item-section avatar>
              <q-avatar color="" text-color="white">
                <q-icon size="30px">
                  <img src="/icons/Wechat.svg" alt="" />
                </q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ userInfo.reserve_field.social.wechat }}
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-if="userInfo.reserve_field.social.qq != ''"
          >
            <q-item-section avatar>
              <q-avatar color="" text-color="white">
                <q-icon size="32px">
                  <img src="/icons/qq.svg" alt="" />
                </q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ userInfo.reserve_field.social.qq }}
            </q-item-section>
          </q-item>
          <q-separator />
          <div v-html="userInfo.reserve_field.description"></div>

          <!-- <q-separator color="dark" /> -->
        </q-list>
      </div>
      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="follow" name="follow" />
        <q-tab label="follower" name="follower" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="follow">
          <q-list>
            <template v-for="(followring, key) in userFollowing" :key="key">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ followring.following }}</q-item-label>
                  <q-item-label caption>关注者个人简介</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn outline color="light-blue-8">
                    <div>关注</div>
                  </q-btn>
                </q-item-section>
              </q-item>

              <q-separator />
            </template>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="follower">
          <q-list>
            <template v-for="(follower, key) in userFollower" :key="key">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ follower.following }}</q-item-label>
                  <q-item-label caption>关注者个人简介</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn outline no-wrap color="light-blue-8">
                    <div>关注</div>
                  </q-btn>
                </q-item-section>
              </q-item>

              <q-separator />
            </template>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import useUserInfo from "src/composables/userInfo";
import { ref } from "vue";
// import { BilibiliIcon, WechatIcon } from "vue3-simple-icons";

const props = defineProps({
  username: String,
});

const { userInfo, finished, userFollower, userFollowing } = useUserInfo({
  user: props.username,
});
console.log(userInfo);
const tab = ref("");
</script>
<style lang="css" scoped>
.q-img__content > div {
  padding: 6px;
}

.my-card {
  width: 600px;
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
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
