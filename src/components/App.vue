<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app :color="$vuetify.theme.themes[theme].navbar" elevation="10">
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-icon large color="black">mdi-cards-spade</v-icon>
        <v-icon large color="red" class="mx-3">mdi-cards-heart</v-icon>
        <h1 :style="{ color: $vuetify.theme.themes[theme].logo }">
          Simple-BlackJack.
        </h1>
        <v-icon large color="black" class="mx-3">mdi-cards-club</v-icon>
        <v-icon large color="red">mdi-cards-diamond</v-icon>
      </div>
      <v-spacer></v-spacer>
      <v-switch
        append-icon="mdi-weather-night"
        light
        class="pt-5"
        color="yellow"
        v-model="$vuetify.theme.dark"
        inset
      ></v-switch>
    </v-app-bar>
    <v-main>
      <main-table></main-table>
    </v-main>
  </v-app>
</template>

<script>
import MainTable from "@/views/table/MainTable.vue";
export default {
  name: "App",
  components: {
    MainTable,
  },
  data() {
    return {
      betError: "",
      bet: 0,
    };
  },
  async created() {
    if (localStorage.getItem("black-jack-deck-id")) {
      this.$store.commit("save_id", localStorage.getItem("black-jack-deck-id"));
      this.$store.dispatch("reshuffle_deck");
    } else {
      await this.$store.dispatch("get_deck");
    }
    await this.$store.dispatch("init_round");
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    Money() {
      return this.$store.getters.Money;
    },
  },
  methods: {
    betMoney() {
      if (this.bet > this.Money) {
        this.betError = "You bet too much money";
      } else {
        this.$store.commit("set_bet");
      }
    },
  },
  watch: {
    RoundState: function(newVal) {
      if (newVal === "win" || newVal === "lose") {
        this.showModal = true;
        this.modalText = newVal === "win" ? "won" : "lost";
        this.modalEmoticon = newVal === "win" ? "happy" : "sad";
      }
    },
  },
};
</script>
