<template>
  <base-counter :count="PlayerCounter" :side="'Player\'s'"></base-counter>
</template>

<script>
import BaseCounter from "./BaseCounter.vue";
export default {
  name: "PlayerCounter",
  components: {
    BaseCounter,
  },
  computed: {
    PlayerCounter() {
      return this.$store.getters.PlayerCounter;
    },
  },
};
</script>

<style></style>
