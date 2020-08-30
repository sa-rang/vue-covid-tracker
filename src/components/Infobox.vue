<template>
  <v-row dense>
    <v-col cols="12">
      <v-card :color="color" dark>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-subtitle>Today: {{ cases }}</v-card-subtitle>
        <v-card-subtitle>Total: {{ total }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Infobox",
  props: {
    title: {
      type: String,
      default: "",
    },
    cases: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#385F73",
    },
  },

  data() {
    return {};
  },
};
</script>
