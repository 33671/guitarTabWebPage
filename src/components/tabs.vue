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
            <!-- q-gutter-y-lg q-gutter-x-md q-gutter-lg-x-lg -->
            <div class="row">
              <div
                class="col-md-2 col-sm-12 col-12"
                v-for="score in tablist"
                :key="score.url"
              >
                <q-card
                  class="my-card position-relative q-ma-md q-ma-none"
                  v-ripple
                >
                  <img
                    src="https://z3.ax1x.com/2021/09/30/4ououj.png"
                    class="white--text align-end"
                  />
                  <q-card-section class="overflow-hidden ellipsis">
                    <router-link
                      class="text-h7 ellipsis"
                      :to="'/tabs/' + score.music_name + '.gp'"
                      >{{ score.music_name }}</router-link
                    >
                    <!-- <div class="text-h7 ellipsis">{{ score.title }}</div> -->
                    <div class="text-subtitle2 ellipsis">
                      {{ score.uploader }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from "vue";
import { axios } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  async setup() {
    const $q = useQuasar();
    const ismobel = $q.platform.is.mobile;
    let scores = ref({
      吉他谱: [],
      贝斯谱: [],
      乐队总谱: [],
    });
    for (let i of ["吉他谱", "贝斯谱", "乐队总谱"]) {
      scores.value[i] = (
        await axios.get("/api/tabs_publish?random=true&tab_type=" + i)
      ).data.slice(0, 12);
    }
    console.log(scores.value);
    return {
      scores,
      ismobel,
      tab: ref("吉他谱"),
      splitterModel: ref(12),
    };
  },
};
</script>
<style lang="scss" scoped></style>
