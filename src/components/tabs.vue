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
            <div class="row q-gutter-y-lg q-gutter-x-md q-gutter-lg-x-lg">
              <div class="col-2" v-for="score in scores" :key="score.url">
                <q-card class="my-card position-relative" v-ripple>
                  <img :src="score.cover" class="white--text align-end" />
                  <q-card-section>
                    <router-link
                      class="text-h7 ellipsis"
                      :to="'/tabs/' + score.title + '.gp'"
                      >{{ score.title }}</router-link
                    >
                    <!-- <div class="text-h7 ellipsis">{{ score.title }}</div> -->
                    <div class="text-subtitle2 ellipsis">
                      {{ score.author }}
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
    const res = await axios.get("a.json");
    scores.value = res.data.tab;
    // console.log(scores.value);
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
