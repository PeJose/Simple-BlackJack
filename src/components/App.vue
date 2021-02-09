<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <navbar></navbar>
    <v-main>
      <main-table></main-table>
    </v-main>
  </v-app>
</template>

<script>
import MainTable from "@/views/table/MainTable.vue";
import Navbar from "./navbar/Navbar.vue";
export default {
  name: "App",
  components: {
    MainTable,
    Navbar,
  },
  data() {
    return {
      betError: "",
      bet: 0,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirmStayInDirtyForm()) {
      next(false);
    } else {
      this.$store.dispatch("save_state");
      next();
    }
  },
  async created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
    if (localStorage.getItem("black-jack-deck-id") !== null) {
      this.$store.commit("save_id", localStorage.getItem("black-jack-deck-id"));
      this.$store.dispatch("reshuffle_deck");
    } else {
      await this.$store.dispatch("get_deck");
    }
    if (localStorage.getItem("black-jack-top-score") !== null) {
      this.$store.commit("load_top_score");
    }
    if (localStorage.getItem("black-jack-save-state") !== null) {
      this.$store.dispatch("load_state");
    } else {
      await this.$store.dispatch("init_round");
    }
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
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
    confirmLeave() {
      return window.confirm(
        "Do you really want to exit your game? Changes will be saved"
      );
    },
    confirmStayInDirtyForm() {
      return !this.confirmLeave();
    },
    beforeWindowUnload(e) {
      if (this.confirmStayInDirtyForm()) {
        e.preventDefault();
        e.returnValue = "";
      }
    },
  },
};
</script>
