<template>
  <base-pile :cards="DealerCards"></base-pile>
</template>

<script>
import BasePile from "./BasePile.vue";

export default {
  name: "DealerPile",
  components: {
    BasePile,
  },
  computed: {
    DealerCards() {
      return this.$store.getters.DealerCards;
    },
  },
};
</script>

<style></style>
