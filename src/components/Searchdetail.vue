<template>
  <q-tabs
    v-model="tab"
    align="justify"
    class="bg-primary text-white shadow-2"
    :breakpoint="0"
  >
    <q-tab name="tabs" icon="menu_book" />
    <q-tab name="accounts" icon="account_circle" />
  </q-tabs>

  <q-tab-panels
    v-model="tab"
    animated
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-tab-panel name="tabs">
      <div class="row bg-white rounded-border">
        <div class="col-md-2 col-sm-3" v-for="score in scores" :key="score.url">
          <q-card class="my-card q-ma-md" v-ripple>
            <img
              src="https://z3.ax1x.com/2021/09/30/4ououj.png"
              class="white--text align-end"
            />
            <q-card-section>
              <router-link
                class="text-h7 ellipsis"
                :to="'/tabs/' + score.tab_name + '.gp'"
                >{{ score.tab_name }}</router-link
              >
              <!-- <div class="text-h7 ellipsis">{{ score.tab_name }}</div> -->
              <div class="text-subtab_name2 ellipsis">
                {{ score.uploader_detail.nick }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="accounts">
      <div class="row bg-white rounded-border">
        <div class="col-md-2 col-sm-3" v-for="score in scores" :key="score.url">
          <q-card class="my-card q-ma-md" v-ripple>
            <img
              src="https://z3.ax1x.com/2021/09/30/4ououj.png"
              class="white--text align-end"
            />
            <q-card-section>
              <router-link
                class="text-h7 ellipsis"
                :to="'/tabs/' + score.tab_name + '.gp'"
                >{{ score.tab_name }}</router-link
              >
              <!-- <div class="text-h7 ellipsis">{{ score.tab_name }}</div> -->
              <div class="text-subtab_name2 ellipsis">
                {{ score.uploader_detail.nick }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-tab-panel>
  </q-tab-panels>

  <!--   翻页
  <div class="q-pa-lg flex flex-center col-3">
    <q-pagination v-model="current" :max="5" input />
  </div> -->
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { axios } from "boot/axios";
import useSearch from "./../search_input";
export default {
  async setup() {
    const { searchResult: scores } = useSearch();

    // console.log(scores.value);
    // console.log(res);
    // console.log(res.data.tab);
    // var score = this.axios.get("a.json");
    // this.scores = tab.data.score;
    // this.fetchTabReady = true;
    // console.log(this.scores);
    return {
      tab: ref("tabs"),
      scores,
      current: ref(1),
    };
  },
};
</script>
<style lang="scss" scoped></style>
