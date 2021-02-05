<template>
  <base-counter :count="DealerCounter" :side="'Dealer\'s'"></base-counter>
</template>

<script>
import BaseCounter from "./BaseCounter.vue";
export default {
  name: "PlayerCounter",
  components: {
    BaseCounter,
  },
  computed: {
    DealerCounter() {
      return this.$store.getters.DealerCounter;
    },
  },
  watch: {
    DealerCounter: function(newVal) {
      if (Array.isArray(newVal)) {
        if (this.newVal[0] > 21 && this.newVal[1] > 21) {
          this.$store.commit("change_game_state", "win");
        }
      }
      if (this.newVal > 21) {
        this.$store.commit("change_game_state", "win");
      }
    },
  },
};
</script>

<style></style>
