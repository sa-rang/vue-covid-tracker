<template>
  <div style="height: 500px; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />

      <div v-for="item in countryData" :key="item.countryInfo.iso2">
        <l-circle-marker
          :lat-lng="[item.countryInfo.lat, item.countryInfo.long]"
          :radius="Math.sqrt(item.cases) / 40"
          :color="'#CC1034'"
          :fill-color="'#CC1034'"
          :fill-opacity="0.4"
        >
          <l-popup>
            <div>{{ item.country }}</div>
            <div>Cases: {{ item.cases }}</div>
          </l-popup>
        </l-circle-marker>
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LPopup } from "vue2-leaflet";
import { store } from "../store";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPopup,
  },
  props: {
    countryData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      circle: {},
      zoom: 4,

      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),

      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      parsedDataList: [],
    };
  },
  computed: {
    center() {
      if (store.state.selectedCountryData?.countryInfo) {
        return latLng(
          store.state.selectedCountryData?.countryInfo.lat,
          store.state.selectedCountryData?.countryInfo.long
        );
      } else {
        //console.log("default");
        return latLng(47.41322, -1.219482);
      }
    },
  },
  mounted() {
    console.log(this.countryData);

    this.parsedDataList = [];
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  },
};
</script>
<style lang="scss">
.leaflet-pane {
  z-index: 2;
}
.leaflet-top,
.leaflet-bottom {
  z-index: 3;
}
</style>
