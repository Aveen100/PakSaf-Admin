<template>
  <div>
    <l-map
      style="height: 400px"
      :zoom="zoom"
      :center="center"
      @click="handleMapClick"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
        draggable
        :lat-lng="currentLocation"
        :icon="icon"
        @dragend="handleMarkerDrag"
      ></l-marker>
    </l-map>
    <v-btn small class="mt-1" color="green" @click="getCurrentLocation">
      <v-icon color="white">mdi-refresh</v-icon> <!-- Using Material Design Icons -->
    </v-btn>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [0, 0], // Default center
      currentLocation: [0, 0], // Default current location
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      }),
    };
  },
  mounted() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
    this.getCurrentLocation();
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = [position.coords.latitude, position.coords.longitude];
          this.currentLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    handleMapClick(event) {
      this.currentLocation = [event.latlng.lat, event.latlng.lng];
    },
    handleMarkerDrag(event) {
      this.currentLocation = [
        event.target._latlng.lat,
        event.target._latlng.lng,
      ];
    },
  },
};
</script>
<style>

</style>