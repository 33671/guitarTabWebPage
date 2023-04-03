<template>
  <q-splitter v-model="splitterModel" horizontal>
    <template v-slot:before>
      <!-- class="bg-primary text-white shadow-2" -->
      <q-tabs v-model="tab" align="left" :breakpoint="0" class="text-teal">
        <q-tab name="tabs" icon="menu_book" />
        <q-tab name="accounts" icon="account_circle" />
      </q-tabs>
    </template>

    <!-- transition-prev="slide-right"
      transition-next="slide-left" -->
    <template v-slot:after>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tabs" class="q-pa-none">
          <div class="row bg-white rounded-border">
            <div
              class="col-md-2 col-sm-3"
              v-for="score in scores"
              :key="score.url"
            >
              <TabCardVue
                class="q-ma-lg-md q-ma-sm"
                :uploader="score.uploader"
                :music-name="score.tab_name"
                :publishId="score.publish_id"
                :coverId="score.cover_file_id"
              ></TabCardVue>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="accounts" class="q-px-none">
          <div class="row bg-white rounded-border">
            <q-list class="col-12">
              <div class="col-12" v-for="user in users" :key="user.url">
                <q-item clickable v-ripple :to="'/user/' + user.name">
                  <q-item-section top avatar>
                    <q-avatar rounded>
                      <img
                        :src="'/api/user/avator/' + user.avatar_id"
                        v-if="user.avatar_id != null"
                      />
                      <img
                        src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                        v-else
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label> {{ user.nick }}</q-item-label>
                    <q-item-label caption>@{{ user.name }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </div>
            </q-list>

            <!-- <TabCardVue
                class="q-ma-lg-md q-ma-sm"
                :uploader="score.uploader"
                :music-name="score.tab_name"
                :publishId="score.publish_id"
                :coverId="score.cover_file_id"
              ></TabCardVue> -->
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>

  <!--   翻页
  <div class="q-pa-lg flex flex-center col-3">
    <q-pagination v-model="current" :max="5" input />
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import { axios } from "boot/axios";
import TabCardVue from "./TabCard.vue";
import useSearch from "./../search_input";
const { searchScoreResult: scores, searchUserResult: users } = useSearch();
const tab = ref("tabs");
const current = ref(1);
</script>
