<template>
  <v-container height="5vh" fluid>
    <div>Card count: {{ counter }}</div>
  </v-container>
</template>

<script>
export default {
  name: "BaseCounter",
  props: ["count", "state"],
  data() {
    return {
      counter: "",
    };
  },
  watch: {
    count: function(newVal) {
      if (Array.isArray(newVal)) {
        if (newVal[0] > 21 && newVal[1] > 21) {
          this.$store.commit("change_round_state", this.state);
        }
        this.counter = newVal[0] + " OR " + newVal[1];
      } else {
        if (newVal > 21) {
          console.log("lost");
          this.$store.commit("change_round_state", this.state);
        }
        this.counter = newVal;
      }
    },
  },
};
</script>

<style></style>
