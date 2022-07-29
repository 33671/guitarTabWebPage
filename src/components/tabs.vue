<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab class="text-purple" name="mails" label="Mails" />
          <q-tab class="text-orange" name="alarms" label="Alarms" />
          <q-tab class="text-teal" name="movies" label="Movies" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="slide-down"
          transition-next="slide-up"
        >
          <q-tab-panel
            :name="sec"
            v-for="(sec, index) in ['mails', 'alarms', 'movies']"
            :key="index"
          >
            <!-- q-gutter-y-lg q-gutter-x-md q-gutter-lg-x-lg -->
            <div class="row">
              <div
                class="col-md-2 col-sm-3"
                v-for="score in scores"
                :key="score.url"
              >
                <q-card class="my-card position-relative q-ma-md" v-ripple>
                  <img
                    src="https://z3.ax1x.com/2021/09/30/4ououj.png"
                    class="white--text align-end"
                  />
                  <q-card-section>
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

export default {
  async setup() {
    let scores = ref([]);
    const res = await axios.get("/api/tabs_publish?random=true");
    for (var i = 0; i < 12; i++) {
      scores.value.push(res.data[i]);
    }
    console.log(scores.value);
    // console.log(res);
    // console.log(res.data.tab);
    // var score = this.axios.get("a.json");
    // this.scores = tab.data.score;
    // this.fetchTabReady = true;
    // console.log(this.scores);
    return {
      scores,
      tab: ref("mails"),
      splitterModel: ref(20),
    };
  },
};
</script>
<style lang="scss" scoped></style>
