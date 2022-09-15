<template>
  <div class="row q-mt-sm q-mt-md-xl justify-center">
    <div class="col-12 col-md-6">
      <uploadtabs />
    </div>
  </div>
</template>

<script>
import uploadtabs from "../components/Uploadtabs.vue";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { axios } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "Index",
  components: {
    uploadtabs,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    onMounted(async () => {
      const res = await axios.get("/api/login_status");
      console.log(res.status);
      if (res.status == 202) {
        setTimeout(() => {
          $q.notify({
            progress: true,
            message: "您似乎没有登录，正在为您跳转至登陆界面",
            color: "dark",
            position: "center",
            multiLine: true,
            icon: "announcement",
            actions: [
              {
                label: "好的",
                type: "info",
                handler: () => {
                  router.push("/login");
                },
              },
            ],
          });
        });
        let jumptologin = () => router.push("/login");
        let sleep2 = (time) =>
          new Promise((resolve) => {
            setTimeout(resolve, time);
          });
        sleep2(6000).then(jumptologin);
      }
    });
    return;
  },
};
</script>

<style></style>
