<template>
  <q-layout view="hHh lpr fff" class="body">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title style="max-width: 200px; min-width: 130px">
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
          <q-avatar>
            <span style="font-size: 10px">登录</span>
            <q-menu auto-close :offset="[0, 10]">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section avatar style="padding-right: 0px">
                    <q-avatar icon="info" />
                  </q-item-section>
                  <q-item-section>我的</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section avatar>
                    <q-avatar icon="logout" />
                  </q-item-section>
                  <q-item-section>注销</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <!-- <img src="https://cdn.quasar.dev/img/avatar.png" /> -->
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated>
      <q-scroll-area
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            :to="item.to"
            v-for="(item, index) in naviItem"
            :key="index"
          >
            <q-item-section avatar>
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

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSearch from "./../search_input";
export default {
  setup() {
    const { options, searchResult, searchText, search, filterFn } = useSearch();
    const leftDrawerOpen = ref(false);
    const route = useRoute();
    const router = useRouter();
    const naviItem = [
      { to: "/home", name: "首页", icon: "inbox" },
      { to: "/star", name: "收藏", icon: "star" },
      { to: "/user", name: "我的", icon: "send" },
      { to: "/publish", name: "发布", icon: "drafts" },
      { to: "/about", name: "关于", icon: "info" },
    ];

    return {
      naviItem,
      leftDrawerOpen,
      filterFn,
      setModel(val) {
        searchText.value = val;
      },
      route,
      options,
      searchResult,
      searchText,
      entersearch() {
        search();
        if (route.path != "/search") {
          router.push("/search");
        }
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style lang="scss">
.header {
  background-color: rgb(25, 118, 210);
}

// .body {
//   background-color: rgb(206, 211, 217);
// }
</style>
