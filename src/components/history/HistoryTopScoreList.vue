<template>
  <v-card
    class=" rounded-lg py-5"
    :color="$vuetify.theme.themes[theme].accent1"
    elevation="8"
  >
    <v-card-text>
      <div class="display-1 text--primary">Top Scores:</div>
    </v-card-text>
    <v-list color="transparent">
      <v-list-item v-for="(score, index) in TopScore" :key="index">
        <v-list-item-content>
          <v-list-item-title
            >{{ index + 1 }}. Score: {{ score.value }}$
          </v-list-item-title>
          <v-list-item-subtitle> Date: {{ score.date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "HistoryTopScoreList",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    TopScore() {
      return this.$store.getters.TopScore;
    },
  },
};
</script>

<style></style>
