<template>
  <v-container fill-height grid-list-xl fluid>
    <v-row align="center">
      <v-col cols="2" align="center">
        <history-card-list class="ml-5"></history-card-list>
      </v-col>
      <v-col cols="8" align="center">
        <v-card
          :color="$vuetify.theme.themes[theme].sheets"
          elevation="8"
          height="85vh"
          width="auto"
        >
          <v-container fill-height>
            <v-row>
              <v-col>
                <dealer-counter></dealer-counter>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <dealer-pile></dealer-pile>
              </v-col>
            </v-row>
            <v-row fill-height>
              <v-col>
                <player-pile></player-pile>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <player-counter></player-counter>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="2" align="center">
        <v-card
          class="px-5"
          height="85vh"
          elevation="8"
          :color="$vuetify.theme.themes[theme].sheets"
        >
          <v-container fill-height grid-list-xl fluid align="center">
            <v-row align="center">
              <v-col>
                <history-top-score-list></history-top-score-list>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col>
                <actions-list></actions-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HistoryCardList from "@/components/history/HistoryCardList.vue";
import HistoryTopScoreList from "@/components/history/HistoryTopScoreList.vue";
import ActionsList from "@/components/actions/ActionsList.vue";
import DealerPile from "@/components/piles/DealerPile.vue";
import PlayerPile from "@/components/piles/PlayerPile.vue";
import DealerCounter from "@/components/counter/DealerCounter.vue";
import PlayerCounter from "@/components/counter/PlayerCounter.vue";
export default {
  name: "MainTable",
  components: {
    HistoryCardList,
    HistoryTopScoreList,
    ActionsList,
    DealerPile,
    PlayerPile,
    DealerCounter,
    PlayerCounter,
  },
  data() {
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
