import { boot } from "quasar/wrappers";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from "vue-virtual-scroller";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.use(VueVirtualScroller);
});

export { VueVirtualScroller };
