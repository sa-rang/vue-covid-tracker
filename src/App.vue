<template>
  <v-app class="mainApp">
    <v-app-bar app color="#185694" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://media.giphy.com/media/co5VLnDuBaURxfDrfW/giphy.gif"
          transition="scale-transition"
          width="50"
        />
        <span class="mr-2 text-h5">Covid Tracker</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/sa-rang/vue-covid-tracker"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.mainApp {
  background-color: #fafafa;
}
</style>
