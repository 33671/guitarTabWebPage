<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <q-card class="my-card rounded-borders q-mt-xl">
        <q-card-section>
          <iframe
            src="./alphaTab"
            frameborder="0"
            width="100%"
            height="1000px"
            scrolling="no"
          ></iframe>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
// import { RenderingResources } from "@coderline/alphatab";
export default {
  props: ["id"],
  setup(props) {
    onMounted(() => {
      let TabLocation = "./tabs/" + props.id;
      localStorage.setItem("file", TabLocation);
    });
    return {};
  },
};
</script>

<style></style>
