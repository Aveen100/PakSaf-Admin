<template>
    <l-map
      ref="map"
      @dblclick="onMapClick"
      :zoom="zoom"
      :center="[
        position.lat || userLocation.lat || defaultLocation.lat,
        position.lng || userLocation.lng || defaultLocation.lng,
      ]"
    >
      <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      />
      <l-marker
        draggable
        :icon="icon"
        @dragstart="dragging = true"
        @dragend="dragging = false"
      >
        <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
      </l-marker>
    </l-map>
  </template>
  <script>
  import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
  import { icon } from "leaflet";
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
    },
    props: {
      value: {
        type: Object,
        required: true,
      },
      defaultLocation: {
        type: Object,
        default: () => ({
          lat: 8.9806,
          lng: 38.7578,
        }),
      },
    },
    data() {
      return {
        loading: false,
        userLocation: {},
        icon: icon({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        }),
        position: { lat: 8.9806, lng: 38.7578 },
        address: "",
        tileProvider: {
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
        zoom: 18,
        dragging: false,
      };
    },
    mounted() {
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 1000);
      this.getUserPosition();
    },
    watch: {
      position: {
        deep: true,
        async handler(value) {
          this.address = await this.getAddress();
          this.$emit("input", { position: value, address: this.address });
        },
      },
    },
    computed: {
      tooltipContent() {
        if (this.dragging) return "...";
        if (this.loading) return "Loading...";
        return `<strong>${this.address.replace(
          ",",
          "<br/>"
        )}</strong> <hr/><strong>lat:</strong> ${
          this.position.lat
        }<br/> <strong>lng:</strong> ${this.position.lng}`;
      },
    },
    methods: {
      async getAddress() {
        this.loading = true;
        let address = "Unresolved address";
        try {
          const { lat, lng } = this.position;
          const result = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          if (result.status === 200) {
            const body = await result.json();
            address = body.display_name;
          }
        } catch (e) {
          console.error("Reverse Geocode Error->", e);
        }
        this.loading = false;
        return address;
      },
      onMapClick(value) {
        console.log(value, "asdas");
        // place the marker on the clicked spot
        // this.position = value.latlng;
      },
      getUserPosition() {
        if (navigator.geolocation) {
          // get GPS position
          navigator.geolocation.getCurrentPosition((pos) => {
            // set the user location
            this.userLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
          });
        }
      },
    },
  };
  </script>
  