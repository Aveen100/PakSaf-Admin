<template>
  <div>
    <Drawer />
    <v-container>
      <v-btn
        color="green"
        small
        v-if="!ShowRiderCrud"
        class="white--text"
        @click="ShowRiderCrud = true"
      >
        <v-icon small>mdi-plus</v-icon>
        Add Rider
      </v-btn>
      <h2 class="green--text" v-else>Rider Details</h2>
      <v-card color="green" class="mt-5 my-card" v-if="!ShowRiderCrud">
        <v-data-table
          :headers="headers"
          :items="AllRiders"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Total Riders</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card>
      <v-snackbar v-model="ShowSnackbar">
        {{ SnackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="green"
            flat
            v-bind="attrs"
            @click="ShowSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
    <RidersCrud v-if="ShowRiderCrud" @CloseCrud="CloseCrud" />
  </div>
</template>
<script>
import Drawer from "../components/NavigationDrawer.vue";
import RidersCrud from "../components/RidersCrud.vue";
import axios from "axios";
export default {
  components: {
    Drawer,
    RidersCrud,
  },
  data() {
    return {
      ShowRiderCrud: false,
      headers: [
        {
          text: "Name",
          value: "Name",
        },
        { text: "Email", value: "Email" },
        { text: "Phone", value: "Phone" },
        { text: "Address", value: "Address" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
      AllRiders: [],
      ShowSnackbar: false,
      SnackbarText: "",
    };
  },
  async mounted() {
    await this.GetAllRiders();
  },
  methods: {
    async CloseCrud(val) {
      if (val) {
        this.ShowSnackbar = true;
        this.SnackbarText = "Rider Added Successfully";
      }
      this.ShowRiderCrud = false;
      await this.GetAllRiders();
    },
    async GetAllRiders() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/riders/FetchRiders"
        );
        this.AllRiders = response.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
