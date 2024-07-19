<template>
  <div>
    <Drawer />
    <!-- <Map/> -->
    <v-parallax dark src="../assets/Login.jpg" class="hero-section">
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h1 class="display-2 text-hue">Waste Management</h1>
          <p class="subheading text-hue--text">
            Implementing sustainable waste practices for a cleaner environment.
          </p>
          <v-btn @click="dialog = true" color="success" dark
            >Request Rider</v-btn
          >
        </v-col>
      </v-row>
    </v-parallax>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Enter Pickup Location</span>
          </v-card-title>
          <v-card-text>
            <div style="height: 400px">
              <Leaflet />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">
              Close
            </v-btn>
            <v-btn text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- schedule  -->
    <v-row class="my-5">
      <v-col cols="1" style="background: #98fb98"></v-col>
      <v-col cols="11" style="background: #98fb98">
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Drawer from "../components/NavigationDrawer.vue";
// import Map from "../components/LocationMap.vue";
import Leaflet from "../components/LeafletMap.vue";
// import { latLng } from "leaflet";
// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  components: {
    Drawer,
    Leaflet,
    // LMap,
    // LTileLayer,
    // LMarker,

    // Map
  },
  data() {
    return {
      dialog: false,
      zoom: 10, // Adjust the zoom level as needed
      // center: latLng(31.5303772, 74.4664755), // Set your location coordinates
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  // data() {
  //   return {
  //     zoom: 20,
  //     center: latLng(31.5303772, 74.4664755),
  //     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     attribution:
  //       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //     withPopup: latLng(31.5303772, 74.4664755),
  //     withTooltip: latLng(31.5303072, 74.4630055),
  //     currentZoom: 11.5,
  //     currentCenter: latLng(31.5303772, 74.4664755),
  //     showParagraph: false,
  //     mapOptions: {
  //       zoomSnap: 0.1
  //     },
  //     showMap: true
  //   };
  // },
  // methods: {
  //   zoomUpdate(zoom) {
  //     this.currentZoom = zoom;
  //   },
  //   centerUpdate(center) {
  //     this.currentCenter = center;
  //   },
  //   showLongText() {
  //     this.showParagraph = !this.showParagraph;
  //   },
  //   innerClick() {
  //     alert("Click!");
  //   }
  // }
};
</script>
<style scoped>
/* Add styles to create a full-screen hero section with background image */
.hero-section {
  background: url("../assets/Login.jpg") center/cover no-repeat fixed;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.hero-text {
  text-align: center;
  color: white;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1.2em;
  margin-bottom: 1em;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

</style>
