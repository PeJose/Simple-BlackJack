<template>
  <v-card
    class="rounded-lg"
    :color="$vuetify.theme.themes[theme].sheets"
    elevation="8"
    height="85vh"
    width="auto"
  ></v-card>
</template>

<script>
export default {
  name: "HistoryCardList",
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
