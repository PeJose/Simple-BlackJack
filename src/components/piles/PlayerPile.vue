<template>
  <base-pile :cards="PlayerCards"></base-pile>
</template>

<script>
import BasePile from "./BasePile.vue";

export default {
  name: "PlayerPile",
  components: {
    BasePile,
  },
  computed: {
    PlayerCards() {
      return this.$store.getters.PlayerCards;
    },
  },
};
</script>

<style></style>
