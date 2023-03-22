<template>
  <q-layout view="hHh Lpr fff" class="body">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title
          @click="router.push('/home')"
          style="
            max-width: 200px;
            min-width: 130px;
            cursor: pointer;
            user-select: none;
          "
        >
          <!-- <q-avatar>
                <img
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                />
              </q-avatar> -->
          Guitar Club
        </q-toolbar-title>

        <div class="flex justify-center col-shrink q-pr-sm" style="width: 100%">
          <q-select
            style="flex: 1; max-width: 260px; min-width: 20px"
            dense
            standout="bg-light-blue-10 text-white"
            use-input
            bg-color="light-blue-10"
            hide-dropdown-icon
            options-dense
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            maxlength="12"
            @keyup.enter="entersearch(e)"
            @filter="filterFn"
            :model-value="searchText"
            @input-value="setModel"
          >
            <template v-slot:append>
              <q-icon name="search" @click.stop.prevent />
            </template>
          </q-select>
        </div>
        <div style="max-width: 200px; flex: 1" class="flex justify-end">
          <q-avatar @click="checkLogin">
            <span style="font-size: 10px; user-select: none" v-if="!loginStatus"
              >登录</span
            >
            <img
              src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
              v-else-if="
                (loginStatus && !finished) || userInfo.avator_id == undefined
              "
            />
            <img
              :src="'/api/user/avator/' + userInfo.avator_id"
              v-if="loginStatus && finished"
            />

            <q-menu auto-close :offset="[0, 10]">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section avatar style="padding-right: 0px">
                    <q-avatar icon="info" />
                  </q-item-section>
                  <q-item-section>我的</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="exitLogin">
                  <q-item-section avatar>
                    <q-avatar icon="logout" />
                  </q-item-section>
                  <q-item-section>注销</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left">
      <q-scroll-area
        class="fit"
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <q-list padding class="menu-list">
          <q-item
            clickable
            v-ripple
            :to="item.to"
            v-for="(item, index) in naviItem"
            :key="index"
          >
            <q-item-section avatar clickable v-ripple>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.name }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive include="Home">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white hidden">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSearch from "./../search_input";
import { loginStatus, logout } from "src/composables/login";
import useUserInfo from "src/composables/userInfo";
import { useQuasar } from "quasar";
const $q = useQuasar();
$q.addressbarColor.set();
const { userInfo, finished } = useUserInfo({});
const { options, searchText, search, filterFn } = useSearch();
const leftDrawerOpen = ref(false);
const route = useRoute();
const router = useRouter();
const naviItem = [
  { to: "/home", name: "首页", icon: "inbox" },
  { to: "/news", name: "动态", icon: "circle_notifications" },
  { to: "/user", name: "我的", icon: "send" },
  { to: "/publish", name: "发布", icon: "drafts" },
  { to: "/about", name: "关于", icon: "info" },
  { to: "/tuner", name: "调音器", icon: "audiotrack" },
  { to: "/metronome", name: "节拍器", icon: "alarm" },
];
function checkLogin() {
  if (!loginStatus.value) {
    router.push("/login");
  }
}
async function exitLogin() {
  await logout();
  router.replace("/login");
}
function setModel(val) {
  searchText.value = val;
}
function entersearch() {
  search();
  if (route.path != "/search") {
    router.push("/search");
  }
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style lang="scss" scoped>
.header {
  background-color: rgb(25, 118, 210);
}

.menu-list .q-item {
  border-radius: 0 20px 20px 0;
}
</style>
