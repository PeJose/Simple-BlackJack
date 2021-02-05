import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: colors.green.darken1,
        secondary: colors.grey.darken1,
        accent: colors.green.darken1,
        accent1: colors.green.lighten4,
        error: colors.red.accent3,
        navbar: colors.green.darken2,
        logo: colors.shades.white,
        sheets: colors.shades.white,
        background: colors.green.lighten5, // Not automatically applied
      },
      dark: {
        primary: colors.green.darken1,
        secondary: colors.grey.darken1,
        accent: colors.green.darken4,
        accent1: colors.grey.darken1,
        error: colors.red.accent3,
        navbar: colors.green.darken4,
        logo: colors.yellow.base,
        sheets: colors.grey.darken4,
        background: "#7a1f34", // Not automatically applied
      },
    },
  },
});
