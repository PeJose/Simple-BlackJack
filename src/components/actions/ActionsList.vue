<template>
  <v-card
    class="rounded-lg py-2 px-5"
    :color="$vuetify.theme.themes[theme].accent1"
    fill-height
    elevation="8"
  >
    <v-container align="center" fill-height fluid>
      <v-row>
        <v-col>
          <v-btn
            :color="$vuetify.theme.themes[theme].accent"
            :disabled="hitDisable || Bet === 0"
            block
            @click="hitCard"
            >Hit</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :color="$vuetify.theme.themes[theme].accent"
            :disabled="Bet === 0"
            block
            @click="stand"
            >Stand</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :color="$vuetify.theme.themes[theme].accent"
            block
            :disabled="doubleDownDisable || Bet === 0"
            >Double Down</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :color="$vuetify.theme.themes[theme].error"
            block
            @click="reset"
            >Reset</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ActionsList",
  data() {
    return {
      hitDisable: false,
      doubleDownDisable: true,
    };
  },
  methods: {
    hitCard() {
      this.$store.dispatch("draw_card", "give_cards_player");
    },
    stand() {
      this.$store.dispatch("dealer_round");
    },
    doubleDown() {},
    async reset() {
      await this.$store.dispatch("reshuffle_deck");
      this.$store.dispatch("restart_game");
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    Bet() {
      return this.$store.getters.Bet;
    },
  },
};
</script>

<style></style>
