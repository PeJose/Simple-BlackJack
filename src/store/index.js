import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  deck_id: "",
  round_state: "running",
  player_cards: [],
  dealer_cards: [],
  temp_cards: [],
  history: [],
  top_score: [
    { name: "Test1", value: 10000 },
    { name: "Test2", value: 9000 },
    { name: "Test3", value: 8000 },
    { name: "Test4", value: 7000 },
    { name: "Test5", value: 6000 },
  ],
};

const getters = {
  RoundState: (state) => {
    return state.round_state;
  },
  PlayerCards: (state) => {
    return state.player_cards;
  },
  DealerCards: (state) => {
    return state.dealer_cards;
  },
  TopScore: (state) => {
    return state.top_score;
  },
  PlayerCounter: (state) => {
    let ifAce = false;
    let sum = 0;
    if (state.player_cards.length > 0) {
      for (let index in state.player_cards) {
        let b = state.player_cards[index];
        if (!b.hidden) {
          if (b.value === 11) {
            ifAce = true;
          }
          sum += b.value;
        }
      }
    }
    if (sum > 21 && ifAce) {
      return [sum, sum - 10];
    } else {
      return sum;
    }
  },
  DealerCounter: (state) => {
    let ifAce = false;
    let sum = 0;
    if (state.dealer_cards.length > 0) {
      for (let index in state.dealer_cards) {
        let b = state.dealer_cards[index];
        if (!b.hidden) {
          if (b.value === 11) {
            ifAce = true;
          }
          sum += b.value;
        }
      }
    }
    if (sum > 21 && ifAce) {
      return [sum, sum - 10];
    } else {
      return sum;
    }
  },
};

const mutations = {
  save_id(state, id) {
    state.deck_id = id;
  },
  change_round_state(state, new_state) {
    state.round_state = new_state;
  },
  change_card_values(state, cards) {
    for (let index in cards) {
      cards[index].hidden = false;
      if (["JACK", "QUEEN", "KING"].includes(cards[index].value)) {
        cards[index].value = 10;
      } else if (cards[index].value === "ACE") {
        cards[index].value = 11;
      } else {
        cards[index].value = parseInt(cards[index].value);
      }
    }
    state.temp_cards = cards;
  },
  give_cards_player(state, cards) {
    state.player_cards = [...state.player_cards, ...cards];
  },
  give_cards_dealer(state, cards) {
    if (state.dealer_cards.length === 0) {
      cards[1].hidden = true;
    }
    state.dealer_cards = [...state.dealer_cards, ...cards];
  },
  clear_cards_player(state) {
    state.player_cards = [];
  },
  clear_cards_dealer(state) {
    state.dealer_cards = [];
  },
  save_history(state, payload) {
    state.history.push({
      player_cards: payload.player_cards,
      dealer_cards: payload.dealer_cards,
    });
  },
  add_top_score(state, new_score) {
    const top_score = state.top_score;
    for (let index in top_score) {
      if (top_score[index].value < new_score.value) {
        top_score.pop();
        top_score.push(new_score);
        top_score.sort((a, b) =>
          a.value > b.value ? -1 : b.value > a.value ? 1 : 0
        );
        break;
      }
    }
  },
};

const actions = {
  async get_deck(context) {
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((result) => {
        context.commit("save_id", result.data.deck_id);
        localStorage["black-jack-deck-id"] = result.data.deck_id;
      });
  },
  async reshuffle_deck() {
    await axios
      .get("https://deckofcardsapi.com/api/deck/" + state.deck_id + "/shuffle/")
      .then();
  },
  async init_round(context) {
    await axios
      .get(
        "https://deckofcardsapi.com/api/deck/" +
          state.deck_id +
          "/draw/?count=2"
      )
      .then((result) => {
        context.commit("change_card_values", result.data.cards);
        context.commit("give_cards_player", state.temp_cards);
      });
    await axios
      .get(
        "https://deckofcardsapi.com/api/deck/" +
          state.deck_id +
          "/draw/?count=2"
      )
      .then((result) => {
        context.commit("change_card_values", result.data.cards);
        context.commit("give_cards_dealer", state.temp_cards);
      });
  },
  save_to_history({ commit, getters }) {
    const player_cards = getters.get_player_cards;
    const dealer_cards = getters.get_dealer_cards;
    commit("save_history", {
      player_cards: player_cards,
      dealer_cards: dealer_cards,
    });
    commit("clear_cards_player");
    commit("clear_cards_dealer");
  },
  async draw_card(context, who_to_give) {
    await axios
      .get(
        "https://deckofcardsapi.com/api/deck/" +
          state.deck_id +
          "/draw/?count=1"
      )
      .then((result) => {
        context.commit("change_card_values", result.data.cards);
        context.commit(who_to_give, state.temp_cards);
      });
  },
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
