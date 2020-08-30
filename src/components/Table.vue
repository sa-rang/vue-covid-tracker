<template>
  <v-card color="#385F73" dark>
    <v-card-title class="headline">Country wise</v-card-title>
    <v-simple-table fixed-header height="300px" light>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Country</th>
            <th class="text-left">Corona Cases</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.countryInfo.iso2">
            <td>
              <img
                :src="item.countryInfo.flag"
                :alt="item.countryInfo.iso2"
                width="20"
              />{{ item.country }}
            </td>
            <td>{{ item.cases }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
};
</script>
