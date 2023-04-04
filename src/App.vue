<template>
  <router-view></router-view>
  <!-- <router-view v-if="isMobile"></router-view>
  <q-scroll-area
    v-else
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 100vh; width: 100vw"
  >
    <router-view />
  </q-scroll-area> -->
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const isMobile = $q.platform.is.mobile;
    return {
      isMobile,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
});
</script>
