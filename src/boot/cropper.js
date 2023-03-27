import { boot } from "quasar/wrappers";
import "vue-cropper/dist/index.css";
import VueCropper from "vue-cropper";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.use(VueCropper);
});
