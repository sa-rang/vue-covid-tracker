<template>
  <v-card class="mx-auto text-center" color="green">
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :labels="DateList"
          :value="CaseList"
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import { buildChartData } from "../utility/util";
export default {
  name: "Chart",
  props: {},

  data() {
    return {
      value: [],
      DateList: ["one", "two,", "three"],
      CaseList: [100, 200, 50],
    };
  },
  mounted() {
    //console.log("mounted");
    this.getChartData();
  },
  methods: {
    async getChartData() {
      let config = {
        headers: {
          Accept: "application/json",
        },
      };

      await axios
        .get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=10",
          config
        )
        .then((res) => {
          const ChartData = buildChartData(res.data);

          let dates = [];
          let cases = [];
          ChartData.forEach((el) => {
            dates.push(el.x);
            cases.push(el.y);
          });
          this.DateList = dates;
          this.CaseList = cases;
        });
    },
  },
};
</script>
