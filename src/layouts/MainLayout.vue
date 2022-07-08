<template>
  <q-layout view="hHh lpr fff" class="body">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <div class="col">
          <div class="row">
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
              <q-avatar>
                <img
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                />
              </q-avatar>
              Guitar Club
            </q-toolbar-title>
          </div>
        </div>
        <div class="col"></div>
        <div class="col">
          <q-input dark rounded dense standout v-model="text">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col"></div>
        <div class="col"></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="desktop" elevated>
      <!-- drawer content -->
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
      <router-view />
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

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const naviItem = [
      { to: "/home", name: "首页", icon: "inbox" },
      { to: "/star", name: "收藏", icon: "star" },
      { to: "/mine", name: "我的", icon: "send" },
      { to: "/publish", name: "发布", icon: "drafts" },
      { to: "/about", name: "关于", icon: "info" },
    ];

    return {
      naviItem,
      leftDrawerOpen,
      text:ref(""),
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

.body {
  background-color: rgb(206, 211, 217);
}
</style>
