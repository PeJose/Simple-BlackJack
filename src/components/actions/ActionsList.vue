<template>
  <v-card
    :color="$vuetify.theme.themes[theme].accent1"
    fill-height
    class="py-15 px-5"
    elevation="8"
  >
    <v-container align="center" fill-height fluid>
      <v-row>
        <v-col>
          <v-btn
            :color="$vuetify.theme.themes[theme].accent"
            block
            @click="hitCard"
            >Hit</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :color="$vuetify.theme.themes[theme].accent" block
            >Stand</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :color="$vuetify.theme.themes[theme].accent" block
            >Double Down</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ActionsList",
  methods: {
    hitCard() {
      this.$store.dispatch("draw_card", "give_cards_player");
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style></style>
