<template>
  <div class="carousel shadow-3">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://img2.imgtp.com/2024/04/12/BOwH8zQx.jpg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://img2.imgtp.com/2024/04/12/pC18zgX2.png"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://img2.imgtp.com/2024/04/12/4eJ6LLBL.jpg"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://img2.imgtp.com/2024/04/12/wMUocoa0.jpg"
      />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  width: 60%;
  margin-top: 50px;
}
</style>
