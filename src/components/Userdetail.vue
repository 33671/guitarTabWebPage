<template>
  <q-card class="my-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" >
      <div class="text-h5 absolute-bottom text-right">Title</div>
    </q-img>

    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
