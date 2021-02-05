import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  deck_id: "",
  money: 1000,
  bet: 0,
  round_state: 0,
  round_count: 1,
  player_cards: [],
  dealer_cards: [],
  temp_cards: [],
  history: [],
};

const getters = {
  RoundState: (state) => {
    return state.round_state;
  },
  RoundCount: (state) => {
    return state.round_count;
  },
  Money: (state) => {
    return state.money;
  },
  Bet: (state) => {
    return state.bet;
  },
  History: (state) => {
    return state.history;
  },
  PlayerCards: (state) => {
    return state.player_cards;
  },
  DealerCards: (state) => {
    return state.dealer_cards;
  },
  TopScore: () => {
    return JSON.parse(localStorage.getItem("black-jack-top-score"));
  },
  PlayerCounter: (state) => {
    const cards = JSON.parse(JSON.stringify(state.player_cards));
    let sum = 0;
    cards.sort((a, b) =>
      a.bjvalue > b.bjvalue ? 1 : b.bjvalue > a.bjvalue ? -1 : 0
    );
    if (cards.length > 0) {
      for (let index in cards) {
        let b = cards[index];
        sum += b.bjvalue;
        if (sum > 21 && sum <= 31 && cards[index].value === "ACE") {
          sum -= 10;
        }
      }
    }
    return sum;
  },
  DealerCounter: (state) => {
    const cards = JSON.parse(JSON.stringify(state.dealer_cards));
    let sum = 0;
    cards.sort((a, b) =>
      a.bjvalue > b.bjvalue ? 1 : b.bjvalue > a.bjvalue ? -1 : 0
    );
    if (cards.length > 0) {
      for (let index in cards) {
        let b = cards[index];
        if (!b.hidden) {
          sum += b.bjvalue;
          if (sum > 21 && sum <= 31 && cards[index].value === "ACE") {
            sum -= 10;
          }
        }
      }
    }
    return sum;
  },
};

const mutations = {
  save_id(state, id) {
    state.deck_id = id;
  },
  set_bet(state, new_bet) {
    let floored_bet = Math.floor(new_bet * 0.1) / 0.1;
    state.money -= floored_bet;
    state.bet = floored_bet;
  },
  change_round_state(state, new_state) {
    state.round_state = new_state;
  },
  change_card_values(state, cards) {
    for (let index in cards) {
      cards[index].hidden = false;
      if (["JACK", "QUEEN", "KING"].includes(cards[index].value)) {
        cards[index].bjvalue = 10;
      } else if (cards[index].value === "ACE") {
        cards[index].bjvalue = 11;
      } else {
        cards[index].bjvalue = parseInt(cards[index].value);
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
  unhid_card_dealer(state) {
    state.dealer_cards[1].hidden = false;
  },
  clear_cards_player(state) {
    state.player_cards = [];
  },
  clear_cards_dealer(state) {
    state.dealer_cards = [];
  },
  clear_bet(state) {
    state.bet = 0;
  },
  clear_money(state) {
    state.money = 1000;
  },
  clear_history(state) {
    state.history = [];
  },
  clear_round_count(state) {
    state.round_count = 1;
  },
  save_to_history(state) {
    state.history.push({
      round_count: state.round_count,
      round_state: state.round_state,
      player_cards: state.player_cards,
      dealer_cards: state.dealer_cards,
      bet: state.bet,
      money: state.money,
    });
  },
  calculate_win(state) {
    state.money += state.bet * 1.5;
  },
  add_top_score(state) {
    const top_score =
      localStorage.getItem("black-jack-top-score") === null
        ? []
        : JSON.parse(localStorage.getItem("black-jack-top-score"));
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    top_score.push({ date: today.toLocaleDateString(), value: state.money });
    top_score.sort((a, b) =>
      a.value > b.value ? -1 : b.value > a.value ? 1 : 0
    );
    if (top_score.length > 5) {
      top_score.pop();
    }

    localStorage["black-jack-top-score"] = JSON.stringify(top_score);
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

  restart_game({ commit, dispatch }) {
    commit("clear_bet");
    commit("clear_money");
    commit("clear_history");
    commit("clear_round_count");
    commit("clear_cards_dealer");
    commit("clear_cards_player");
    dispatch("init_round");
  },

  // * action for seting/reseting round
  async init_round(context) {
    if (!(context.state.round_count > 5) && context.state.money !== 0) {
      context.commit("clear_bet");
      context.commit("clear_cards_dealer");
      context.commit("clear_cards_player");
      await context.dispatch("init_player");
      await context.dispatch("init_dealer");
    } else {
      await context.commit("add_top_score");
      context.dispatch("restart_game");
    }
  },

  async init_player(context) {
    await axios
      .get(
        "https://deckofcardsapi.com/api/deck/" +
          state.deck_id +
          "/draw/?count=2"
      )
      .then((result) => {
        context.commit("change_card_values", result.data.cards);
        context.commit("give_cards_player", state.temp_cards);
      })
      .catch((error) => {
        console.log(error);
        context.dispatch("init_player");
      });
  },

  async init_dealer(context) {
    await axios
      .get(
        "https://deckofcardsapi.com/api/deck/" +
          state.deck_id +
          "/draw/?count=2"
      )
      .then((result) => {
        context.commit("change_card_values", result.data.cards);
        context.commit("give_cards_dealer", state.temp_cards);
      })
      .catch(() => {
        context.dispatch("init_dealer");
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

  // * action providing draw card fucionality for both player and dealer
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
    if (who_to_give === "give_cards_player") {
      setTimeout(() => {
        if (context.getters.PlayerCounter === 21) {
          context.dispatch("handle_round", 1);
        } else if (context.getters.PlayerCounter > 21) {
          context.dispatch("handle_round", -1);
        }
      }, 1000);
    }
  },

  // * action after clicking button stand
  async dealer_round(context) {
    context.commit("unhid_card_dealer");
    while (context.getters.DealerCounter <= 16) {
      await context.dispatch("draw_card", "give_cards_dealer");
    }
    setTimeout(() => {
      context.dispatch("check_score");
    }, 1000);
  },

  handle_round(context, round_state) {
    context.commit("change_round_state", round_state);
    if (round_state === 1) {
      context.commit("calculate_win");
    }
    context.commit("save_to_history", round_state);
    state.round_count++;
    context.dispatch("init_round");
  },

  check_score(context) {
    if (context.getters.DealerCounter > 21) {
      context.dispatch("handle_round", 1);
    } else if (context.getters.DealerCounter >= context.getters.PlayerCounter) {
      context.dispatch("handle_round", -1);
    } else if (context.getters.DealerCounter < context.getters.PlayerCounter) {
      context.dispatch("handle_round", 1);
    }
  },
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
