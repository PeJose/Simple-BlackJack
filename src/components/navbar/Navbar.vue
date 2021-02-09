<template>
  <v-app-bar app :color="$vuetify.theme.themes[theme].navbar" elevation="10">
    <v-btn class="mr-2" @click="save">Save</v-btn>
    <v-btn class="ml-2" @click="load">Load</v-btn>
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
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    save() {
      this.$store.dispatch("save_state");
    },
    load() {
      this.$store.dispatch("load_state");
    },
  },
};
</script>

<style></style>
