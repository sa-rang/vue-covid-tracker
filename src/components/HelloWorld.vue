<template>
  <v-container fluid>
    <!-- country selector -->

    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="4" offset-sm="8">
        <v-select
          :items="countries"
          item-text="name"
          item-value="value"
          solo
          v-model="selectedCountry"
          @change="changeCountry"
        ></v-select>
      </v-col>
    </v-row>
    <!-- infobox section -->

    <v-row align="center" v-if="selectedCountryData">
      <v-col class="d-flex" cols="12" sm="4">
        <infobox
          :title="'Coronavirus Cases'"
          :cases="selectedCountryData.todayCases"
          :total="selectedCountryData.cases"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <infobox
          :title="'Recovered'"
          :cases="selectedCountryData.todayRecovered"
          :total="selectedCountryData.recovered"
          :color="'#377b3a'"
      /></v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <infobox
          :title="'Deaths'"
          :cases="selectedCountryData.todayDeaths"
          :total="selectedCountryData.deaths"
          :color="'#9c1d1e'"
      /></v-col>
    </v-row>

    <!-- bottom section -->
    <v-row align="center" v-if="selectedCountryData">
      <v-col class="d-flex" cols="12" sm="8"
        ><Map :country-data="sortedCountryData" />
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
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
    };
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
        console.log(this.selectedCountryData);
      });
    },
    changeCountry() {
      this.setCountryData(this.selectedCountry);
    },
  },
};
</script>
