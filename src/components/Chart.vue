<template>
  <v-card color="#385F73" dark>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <Highcharts
          v-if="options"
          :options="options"
          ref="highcharts"
        ></Highcharts>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import { buildChartData } from "../utility/util";
import Highcharts from "highcharts";

import { genComponent } from "vue-highcharts";
export default {
  name: "Chart",
  components: {
    Highcharts: genComponent("Highcharts", Highcharts),
  },
  props: {},

  data() {
    return {
      value: [],
      DateList: ["one", "two,", "three"],
      CaseList: [100, 200, 50],
      options: null,
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
          console.log(res.data);
          const eachDayCaseList = buildChartData(res.data, "cases");
          const eachDayRecoveredList = buildChartData(res.data, "recovered");
          const eachDayDeathsList = buildChartData(res.data, "deaths");

          let dates = [];
          let cases = [];
          let recovered = [];
          let deaths = [];

          eachDayCaseList.forEach((el) => {
            dates.push(el.x);
            cases.push(el.y);
          });
          eachDayRecoveredList.forEach((el) => {
            recovered.push(el.y);
          });
          eachDayDeathsList.forEach((el) => {
            deaths.push(el.y);
          });
          this.options = {
            title: {
              text: "Worldwide New Cases",
              x: -20, //center
            },
            subtitle: {
              text: "Last 10 Days",
              x: -20,
            },
            xAxis: {
              categories: dates,
            },
            yAxis: {
              title: {
                text: "Cases",
              },
              plotLines: [
                {
                  value: 0,
                  width: 1,
                  color: "#808080",
                },
              ],
            },
            tooltip: {},
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              borderWidth: 0,
            },
            series: [
              {
                name: "Cases",
                data: cases,
              },

              {
                name: "Deaths",
                data: deaths,
              },
              {
                name: "Recovered",
                data: recovered,
              },
            ],
          };
        });
    },
  },
};
</script>
