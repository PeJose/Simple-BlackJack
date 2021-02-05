<template>
  <v-card :color="$vuetify.theme.themes[theme].accent1" max-height="16vh">
    <v-card-title
      >Round: {{ historycard.round_count }} -
      {{ historycard.round_state === 1 ? "WON" : "LOST" }}</v-card-title
    >
    <v-card-text align="left">
      Money bet: {{ historycard.bet }} <br />
      Money left: {{ historycard.money }} <br>
      Dealer cards: {{historycard.delaer_cards}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HistoryCard",
  props: ["historycard"],
  data: function() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style></style>
