<script setup>
// import { defineProps } from "vue";
const props = defineProps({
  musicName: String,
  publishId: String,
  uploader: String,
  coverId: { type: String, required: false, default: "" },
});
</script>

<template>
  <q-card class="my-card position-relative" v-ripple>
    <img
      :src="
        props.coverId != ''
          ? '/api/cover_files/' + props.coverId
          : 'https://z3.ax1x.com/2021/09/30/4ououj.png'
      "
      class="white--text align-end"
    />
    <q-card-section class="overflow-hidden ellipsis">
      <router-link
        class="text-bold ellipsis text-indigo-13 text-hover"
        :to="'/publishView/' + props.publishId"
        >{{ props.musicName }}</router-link
      >
      <!-- <div class="text-h7 ellipsis">{{ score.title }}</div> -->
      <div class="text-subtitle2 ellipsis">
        {{ props.uploader }}
      </div>
    </q-card-section>
  </q-card>
</template>
<style scoped>
.text-hover:hover {
  text-decoration: underline;
  text-decoration-thickness: 3px;
}
.text-hover {
  text-decoration: none;
}
</style>
