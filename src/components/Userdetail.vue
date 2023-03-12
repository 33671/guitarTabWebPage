<template>
  <q-card class="my-card" v-if="finished">
    <q-img src="https://s1.ax1x.com/2023/03/12/ppMyfYT.md.jpg" height="250px">
      <!-- 用q-img做背景，在其字幕处显示id和头像等 -->
      <div class="text-h5 absolute-bottom row">
        <div class="col-2 self-center text-center">
          <q-avatar class="">
            <img :src="userAvator" />
          </q-avatar>
        </div>
        <div class="col-2 self-center">
          <div class="column">
            <div class="col">
              <div class="text-body1 text-orange-9">
                {{ userInfo.name }}
              </div>
            </div>
            <div class="col">
              <div class="text-subtitle2">{{ userInfo.bio }}</div>
            </div>
          </div>
        </div>
        <div class="col-2 self-center offset-6">
          <q-btn color="light-blue-8 " no-wrap>
            <div class="">关注</div>
          </q-btn>
        </div>
      </div>
    </q-img>

    <div class="q-pa-md" style="max-width: 500px">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="bluetooth" />
          </q-item-section>

          <q-item-section>Avatar-type icon</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              rounded
              color="purple"
              text-color="white"
              icon="bluetooth"
            />
          </q-item-section>

          <q-item-section>Rounded avatar-type icon</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> R </q-avatar>
          </q-item-section>

          <q-item-section>Letter avatar-type</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Image avatar</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar square>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Image square avatar</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Image rounded avatar</q-item-section>
        </q-item>

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
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>关注者id</q-item-label>
              <q-item-label caption>关注者个人简介</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn outline color="light-blue-8">
                <div>关注</div>
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="follower">
        <q-list>
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>关注者id</q-item-label>
              <q-item-label caption>关注者个人简介</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn outline no-wrap color="light-blue-8">
                <div>关注</div>
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import useUserInfo from "src/composables/userInfo";
import { ref } from "vue";
const { userInfo, finished, userAvator } = useUserInfo({});
const tab = ref("");
</script>
<style lang="sass" scoped>
.q-img__content > div
  padding: 6px
.my-card
  max-width: 600px
</style>
