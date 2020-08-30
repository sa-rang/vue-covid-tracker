<template>
  <v-container fluid>
    <!-- country selector -->

    <v-row>
      <v-col class="d-flex" cols="12" md="8">
        <div class="text-center">
          <span class="text-h6">Made using..</span>
          <v-chip class="ma-2" color="#41b883" text-color="white">
            <v-icon size="12" left>mdi-wrench</v-icon>
            Vue Js
          </v-chip>
          <v-chip class="ma-2" color="#7bc5fe" text-color="white">
            <v-icon size="12" left>mdi-wrench</v-icon>
            Vuetify
          </v-chip>
          <v-chip class="ma-2" color="#3a3a4f" text-color="white">
            <v-icon size="12" left>mdi-wrench</v-icon>
            Highcharts
          </v-chip>
          <v-chip class="ma-2" color="#2a5d46" text-color="white">
            <v-icon size="12" left>mdi-wrench</v-icon>
            Leaflet Map
          </v-chip>
          <v-chip class="ma-2" color="#5b4d5f" text-color="white">
            <v-icon size="12" left>mdi-wrench</v-icon>
            Disease.sh API
          </v-chip>
        </div>
      </v-col>
      <v-col class="d-flex" cols="12" md="4">
        <v-select
          :class="fixedSelector"
          :items="countries"
          item-text="name"
          item-value="value"
          solo
          v-model="selectedCountry"
          @change="changeCountry"
        ></v-select>
      </v-col>
    </v-row>

    <!-- bottom section -->
    <v-row v-if="selectedCountryData">
      <v-col cols="12" md="8">
        <!-- infobox section -->

        <v-row dense align="center" v-if="selectedCountryData">
          <v-col class="d-flex" cols="12" md="4">
            <infobox
              :title="'Coronavirus Cases'"
              :cases="selectedCountryData.todayCases"
              :total="selectedCountryData.cases"
              :color="'#6d215e'"
            />
          </v-col>
          <v-col class="d-flex" cols="12" md="4">
            <infobox
              :title="'Recovered'"
              :cases="selectedCountryData.todayRecovered"
              :total="selectedCountryData.recovered"
              :color="'#377b3a'"
          /></v-col>
          <v-col class="d-flex" cols="12" md="4">
            <infobox
              :title="'Deaths'"
              :cases="selectedCountryData.todayDeaths"
              :total="selectedCountryData.deaths"
              :color="'#9c1d1e'"
          /></v-col>
        </v-row>
        <v-row dense v-if="selectedCountryData">
          <v-col cols="12">
            <Map :country-data="sortedCountryData" />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" md="4">
        <v-row dense>
          <v-col cols="12"><Table :table-data="sortedCountryData"/></v-col>
          <v-col cols="12"> <Chart /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { sortData } from "../utility/util";
import Infobox from "./Infobox";
import Table from "./Table";
import Chart from "./Chart";
import Map from "./Map";
import { store } from "../store";
export default {
  name: "HelloWorld",
  components: {
    Infobox,
    Table,
    Chart,
    Map,
  },

  data() {
    return {
      countries: [],
      selectedCountry: "worldwide",
      selectedCountryData: null,
      sortedCountryData: null,
      fixedSelector: "",
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    //console.log("mounted");
    this.getCountries();
  },
  methods: {
    async getCountries() {
      let config = {
        headers: {
          Accept: "application/json",
        },
      };

      await axios
        .get("https://disease.sh/v3/covid-19/countries", config)
        .then((res) => {
          const countries = res.data.map((eachCountry) => ({
            name: eachCountry.country,
            value: eachCountry.countryInfo.iso2,
          }));
          //console.log(countries);
          let defaultCtr = {
            name: "World Wide",
            value: "worldwide",
          };
          this.countries = [defaultCtr].concat(countries);
          this.setCountryData("worldwide");
          const sortedData = sortData(res.data);
          this.sortedCountryData = sortedData;
        });
    },
    async setCountryData(countryCode) {
      let config = {
        headers: {
          Accept: "application/json",
        },
      };

      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      console.log(countryCode);
      await axios.get(url, config).then((res) => {
        this.selectedCountryData = res.data;
        store.commit("setSelectedCountryData", res.data);
        //console.log(this.selectedCountryData);
      });
    },
    changeCountry() {
      this.setCountryData(this.selectedCountry);
    },
    handleScroll() {
      //this.scroll = window.scrollY || window.scrollTop
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        this.fixedSelector = "fiexit";
      } else {
        this.fixedSelector = "";
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
.fiexit {
  position: fixed;
  z-index: 1000;
  @media screen and (max-width: 599px) {
    top: 56px;
    right: 0;
    left: 0;
  }
  @media screen and (min-width: 600px) {
    top: 4px;
    right: 215px;
  }

  @media screen and (min-width: 750px) {
    top: 8px;
    right: 215px;
  }
}
</style>
