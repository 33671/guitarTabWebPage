<template>
  <div>
    <q-splitter v-model="splitterModel" :horizontal="ismobel">
      <template v-slot:before>
        <q-tabs v-model="tab" :vertical="!ismobel" class="text-teal">
          <q-tab class="text-purple" name="吉他谱" label="吉他谱" />
          <q-tab class="text-orange" name="贝斯谱" label="贝斯谱" />
          <q-tab class="text-teal" name="乐队总谱" label="乐队总谱" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          :vertical="!ismobel"
          transition-prev="slide-down"
          transition-next="slide-up"
        >
          <q-tab-panel
            class="q-pa-none q-pa-md-sm"
            :name="index"
            v-for="(tablist, index) in scores"
            :key="index"
          >
            <div class="row">
              <div
                class="col-lg-2 col-md-3 col-sm-4 col-6"
                v-for="score in tablist"
                :key="score.url"
              >
                <TabCard
                  class="q-ma-lg-md q-ma-sm q-ma-xl-xl"
                  :musicName="score.tab_name"
                  :uploader="score.uploader"
                  :publishId="score.publish_id"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { axios } from "boot/axios";
import { useQuasar } from "quasar";
import TabCard from "./TabCard.vue";
// import "../css/bootstrap.css";
export default {
  components: {
    TabCard,
  },
  setup() {
    const $q = useQuasar();
    const ismobel = $q.platform.is.mobile;
    let scores = ref({
      吉他谱: [],
      贝斯谱: [],
      乐队总谱: [],
    });
    onMounted(async () => {
      for (let i of ["吉他谱", "贝斯谱", "乐队总谱"]) {
        scores.value[i] = (
          await axios.get("/api/tabs_publish?random=true&tab_type=" + i)
        ).data.slice(0, 12);
      }
      console.log(scores.value);
    });
    return {
      scores,
      ismobel,
      tab: ref("吉他谱"),
      splitterModel: ref(12),
    };
  },
};
</script>
<style>
/* @import "./../css/bootstrap.css"; */
</style>
