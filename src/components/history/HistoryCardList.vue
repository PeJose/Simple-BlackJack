<template>
  <v-card
    class="rounded-lg py-5 px-5"
    :color="$vuetify.theme.themes[theme].sheets"
    elevation="8"
    height="85vh"
    width="auto"
  >
    <history-card
      v-for="(round, index) in History"
      :key="index"
      :historycard="round"
    ></history-card>
  </v-card>
</template>

<script>
import HistoryCard from "./HistoryCard.vue";
export default {
  components: { HistoryCard },
  name: "HistoryCardList",
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    History() {
      return this.$store.getters.History;
    },
  },
};
</script>

<style></style>
