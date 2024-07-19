<template>
  <div>
    <Drawer />
    <v-container>
      <v-card color="green" class="mt-5 my-card">
        <v-data-table :headers="headers" :items="Orders" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Total Orders</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.OrderStatus`]="{ item }">
            <span v-if="item.OrderStatus == 1">Pending</span>
            <span v-if="item.OrderStatus == 2">In Process</span>
            <span v-if="item.OrderStatus == 3">Cancelled</span>
            <span v-if="item.OrderStatus == 4">Completed</span>
          </template>
          <template v-slot:[`item.Action`]="{ item }">
            <v-btn x-small @click="OpenDetailPopup(item)">
              <v-icon small>mdi-eye</v-icon>
            </v-btn>
            <v-btn x-small @click="GetLocationFromTable(item)">
              <v-icon small>mdi-map-marker</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-dialog
        v-model="ShowDetailPopup"
        width="800"
        transition="dialog-top-transition"
      >
        <v-card>
          <v-card-title class="text-h5 green lighten-2">
            Order Details
          </v-card-title>

          <v-card-text class="pa-2">
            <v-row no-gutters>
              <v-col
                cols="12"
                style="
                  border: 1px solid grey;
                  border-radius: 8px;
                  padding: 10px;
                "
              >
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold">Order ID:</v-col>
                  <v-col cols="6">{{ SelectedItem.id }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold">Customer ID:</v-col>
                  <v-col cols="6">{{ SelectedItem.UserId }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold"
                    >Customer Name:</v-col
                  >
                  <v-col cols="6">{{ SelectedItem.Name }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="3" class="font-weight-bold"
                    >Customer Email:</v-col
                  >
                  <v-col cols="6">{{ SelectedItem.Email }}</v-col>
                </v-row>
              </v-col>
              <v-btn small @click="GetLocation" class="mt-6 ml-1 mt-2 green"
                >Get Location</v-btn
              >
              <v-col cols="3" class="mt-1">
                <v-autocomplete
                  color="green"
                  class="ml-6"
                  :items="StatusList"
                  label="Action"
                  item-text="ActionName"
                  item-value="ActionId"
                  :disabled="SelectedItem.OrderStatus == 4"
                  v-model="Action"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="3" class="mt-1" v-if="Action == 2">
                <v-autocomplete
                  color="green"
                  class="ml-6"
                  :items="RidersList"
                  label="Assign Rider"
                  item-text="Name"
                  item-value="id"
                  return-object
                  v-model="Rider"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="3" style="margin-top: -5px">
                <v-text-field
                  v-if="Action == 4"
                  color="green"
                  class="ml-6"
                  label="Price"
                  v-model="Price"
                  :disabled="SelectedItem.OrderStatus == 4"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3" style="margin-top: -5px">
                <v-text-field
                  v-if="Action == 4"
                  color="green"
                  class="ml-6"
                  label="Weight"
                  v-model="Weight"
                  :disabled="SelectedItem.OrderStatus == 4"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-divider></v-divider> -->

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="ShowDetailPopup = false">
              Close
            </v-btn>
            <v-btn color="green" text @click="Save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="ShowSnackbar">
        {{ SnackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="ShowSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
import Drawer from "../components/NavigationDrawer.vue";
import axios from "axios";
export default {
  components: {
    Drawer,
  },
  computed: {},
  data() {
    return {
      Action: null,
      Rider: "",
      RidersList: [],
      Price: "",
      Weight: "",
      Orders: [],
      headers: [
        { text: "Order Id", value: "id" },
        { text: "Customer Id", value: "UserId" },
        { text: "Customer Name", value: "Name" },
        { text: "Customer Email", value: "Email" },
        { text: "Location", value: "Location" },
        { text: "Status", value: "OrderStatus" },
        { text: "Assigned Rider", value: "Rider" },
        { text: "Action", value: "Action" },
      ],
      ShowDetailPopup: false,
      SelectedItem: {},
      StatusList: [
        { ActionName: "In Process", ActionId: 2 },
        { ActionName: "Cancelled", ActionId: 3 },
        { ActionName: "Completed", ActionId: 4 },
      ],
      ShowSnackbar: false,
      SnackbarText: "",
    };
  },
  async mounted() {
    await this.GetAllOrders();
    await this.GetAllRiders();
  },
  methods: {
    async GetAllOrders() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/total-orders/FetchOrders"
        );
        this.Orders = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    OpenDetailPopup(item) {
      this.ShowDetailPopup = true;
      this.SelectedItem = item;
      if (item.OrderStatus == 4) {
        this.Action = 4;
        this.Price = item.Price;
        this.Weight = item.Weight;
      }
    },
    GetLocationFromTable(item) {
      const regex = /\[(.*?),(.*?)\]/; // Match anything between [ and ],
      const match = regex.exec(item.Location);

      if (match) {
        const firstValue = parseFloat(match[1]); // Index 1 corresponds to the first value
        const secondValue = parseFloat(match[2]); // Index 2 corresponds to the second value
        let link = `https://www.google.com/maps?q=${firstValue},${secondValue}`;
        window.open(link, "_blank");
      } else {
        console.log("No match found.");
      }
    },
    GetLocation() {
      const regex = /\[(.*?),(.*?)\]/; // Match anything between [ and ],
      const match = regex.exec(this.SelectedItem.Location);

      if (match) {
        const firstValue = parseFloat(match[1]); // Index 1 corresponds to the first value
        const secondValue = parseFloat(match[2]); // Index 2 corresponds to the second value
        let link = `https://www.google.com/maps?q=${firstValue},${secondValue}`;
        window.open(link, "_blank");
      } else {
        console.log("No match found.");
      }
    },
    async Save() {
      try {
        if (this.Action == 2 && !this.Rider) {
          this.ShowSnackbar = true;
          this.SnackbarText = "Please Assign Rider";
          return;
        }
        if (this.Action == 4 && !this.Price && !this.Weight) {
          this.ShowSnackbar = true;
          this.SnackbarText = "Please Enter Price or Weight";
          return;
        }

        let obj = {
          OrderStatus: this.Action,
          Price: this.Action == 4 ? this.Price : null,
          Weight: this.Action == 4 ? this.Weight : null,
          Rider: this.Action == 2 ? this.Rider.Name : null,
          RiderId: this.Action == 2 ? this.Rider.id : null,
        };
        const res = await axios.put(
          `http://localhost:3000/api/total-orders//update-order-status/${this.SelectedItem.id}`,
          obj
        );
        if (res.data.code == 200) {
          this.ShowSnackbar = true;
          this.SnackbarText = res.data.message;
          this.ShowDetailPopup = false;
          await this.GetAllOrders();
          await this.UpdateUserBalance();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async GetAllRiders() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/riders/FetchRiders"
        );
        this.RidersList = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async UpdateUserBalance() {
      try {
        let body = {
          UserId: this.SelectedItem.UserId,
          Balance: this.Action == 4 ? this.Price : null,
        };
        let response = await axios.post(
          `http://localhost:3000/api/user/update-balance`,
          body
        );
        if (response.data.code) {
          this.ShowSnackbar = true;
          this.SnackbarText = response.data.message;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.my-card {
  background-color: #f5f5f5; /* light grey background */
  padding: 20px;
  border-radius: 10px;
}
body {
  background-color: #e0f7fa; /* light cyan background for the page */
  margin: 0;
}
</style>
