<template>
  <v-toolbar
    class="rounded-lg"
    dense
    :color="$vuetify.theme.themes[theme].accent1"
  >
    <div class="pl-5 pr-5">Round: {{ RoundCount }}</div>
    <player-counter></player-counter>

    <dealer-counter></dealer-counter>

    <v-spacer></v-spacer>

    <div class="pl-5 pr-15">Money: {{ Money }}$</div>
    <div v-if="Bet > 0" class="pl-5 pr-15">Bet: {{ Bet }}$</div>
    <v-text-field
      v-else
      label="Amount"
      :rules="rules"
      v-model="betAmount"
      hide-details="auto"
      type="number"
      single-line
    ></v-text-field>
    <v-btn
      class="ml-5"
      :disabled="Bet > 0"
      :color="$vuetify.theme.themes[theme].accent"
      @click="bet"
    >
      <v-icon>mdi-currency-usd</v-icon>
      BET
      <v-icon>mdi-currency-usd</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import PlayerCounter from "../counter/PlayerCounter.vue";
import DealerCounter from "../counter/DealerCounter.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      showBet: false,
      betAmount: "",
      rules: [
        (value) =>
          (value && value <= this.Money) || "You don't have that much money",
      ],
    };
  },
  components: {
    PlayerCounter,
    DealerCounter,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    Money() {
      return this.$store.getters.Money;
    },
    Bet() {
      return this.$store.getters.Bet;
    },
    RoundCount() {
      return this.$store.getters.RoundCount;
    },
  },
  methods: {
    bet() {
      if (this.betAmount <= this.Money) {
        this.$store.commit("set_bet", this.betAmount);
        this.betAmount = "";
      }
    },
  },
};
</script>

<style></style>
