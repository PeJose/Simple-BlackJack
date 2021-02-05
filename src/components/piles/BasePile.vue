<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          :cols="cards.length <= 6 ? 2 : 1"
        >
          <v-item>
            <div>
              <v-img
                v-if="!card.hidden"
                max-height="250"
                max-width="150"
                :src="card.image"
                lazy-src="@/assets/img/card-back.png"
              >
              </v-img>
              <v-img
                v-else
                max-height="250"
                max-width="150"
                src="@/assets/img/card-back.png"
              >
              </v-img>
            </div>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: "BasePile",
  props: ["cards"],
};
</script>

<style></style>
