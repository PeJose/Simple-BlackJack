<template>
  <div class="pl-5 pr-5">{{ side }} count: {{ counter }}</div>
</template>

<script>
export default {
  name: "BaseCounter",
  props: ["count", "side"],
  data() {
    return {
      counter: "",
    };
  },
  watch: {
    count: function(newVal) {
      if (Array.isArray(newVal)) {
        this.counter = newVal[0] + " OR " + newVal[1];
      } else {
        this.counter = newVal;
      }
    },
  },
};
</script>

<style></style>
