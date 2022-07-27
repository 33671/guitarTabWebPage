<template>
  <q-tabs
    v-model="tab"
    align="justify"
    class="bg-primary text-white shadow-2"
    :breakpoint="0"
  >
    <q-tab name="mails" icon="menu_book" />
    <q-tab name="alarms" icon="account_circle" />
  </q-tabs>

  <q-tab-panels
    v-model="tab"
    animated
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-tab-panel name="mails">
      <div class="row bg-white rounded-border">
        <div class="col-md-2 col-sm-3" v-for="score in scores" :key="score.url">
          <q-card class="my-card q-ma-md" v-ripple>
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

    <q-tab-panel name="alarms">
      <div class="row bg-white rounded-border">
        <div class="col-md-2 col-sm-3" v-for="score in scores" :key="score.url">
          <q-card class="my-card q-ma-md" v-ripple>
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

  <div class="q-pa-lg flex flex-center col-3">
    <q-pagination v-model="current" :max="5" input />
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
      tab: ref("mails"),
      scores,
      current: ref(1),
    };
  },
};
</script>
<style lang="scss" scoped></style>
