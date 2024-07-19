<template>
  <div>
    <Drawer />
    <v-container>
      <v-card color="green" class="mt-5 my-card">
        <v-data-table
          :headers="headers"
          :items="Withdrawals"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Withdrawals Request</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.Status`]="{ item }">
            <span v-if="item.Status == 1">Pending</span>
            <span v-if="item.Status == 2">Cancelled</span>
            <span v-if="item.Status == 3">Completed</span>
          </template>
          <template v-slot:[`item.Action`]="{ item }">
            <v-btn
              x-small
              @click="OpenDetailPopup(item)"
              :disabled="item.Status == 2 || item.Status == 3"
            >
              <v-icon small>mdi-eye</v-icon>
            </v-btn>
            <v-btn
              x-small
              :disabled="item.Status == 2 || item.Status == 3"
              @click="CancelWithdrawal(item)"
            >
              <v-icon small>mdi-cancel</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-dialog
        v-model="ShowDetailPopup"
        width="600"
        transition="dialog-top-transition"
      >
        <v-card>
          <v-card-title class="text-h5 green lighten-2">
            Withdrawal Method
          </v-card-title>

          <v-card-text class="pa-2">
            <v-row no-gutters class="pa-2">
              <v-radio-group v-model="Method" row>
                <v-radio
                  label="JazzCash"
                  value="JazzCash"
                  color="green"
                ></v-radio>
                <v-radio
                  label="EasyPaisa"
                  value="EasyPaisa"
                  color="green"
                ></v-radio>
              </v-radio-group>
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
  components: { Drawer },
  data() {
    return {
      ShowSnackbar: false,
      SnackbarText: "",
      ShowDetailPopup: false,
      Withdrawals: [],
      SelectedItem: {},
      headers: [
        { text: "Withdrawal Id", value: "id" },
        { text: "User Id", value: "UserId" },
        { text: "Customer Name", value: "Name" },
        { text: "Customer Email", value: "Email" },
        { text: "Customer Phone", value: "Phone" },
        { text: "Status", value: "Status" },
        { text: "Price (PKR)", value: "Price" },
        { text: "Withdrawal Method", value: "Method" },
        { text: "Action", value: "Action", width: 150 },
      ],
      Method: "JazzCash",
    };
  },
  async mounted() {
    await this.GetAllWithdrawals();
  },
  methods: {
    OpenDetailPopup(item) {
      this.ShowDetailPopup = true;
      this.SelectedItem = item;
    },
    async Save() {
      try {
        let body = {
          UserId: this.SelectedItem.UserId,
          Name: this.SelectedItem.Name,
          Email: this.SelectedItem.Email,
          Phone: this.SelectedItem.Phone,
          Price: this.SelectedItem.Price,
          Method: this.Method,
          Status: 3,
        };
        let res = await axios.put(
          `http://localhost:3000/api/withdraws//update-withdraw-status/${this.SelectedItem.id}`,
          body
        );
        if (res.data.code == 200) {
          this.ShowSnackbar = true;
          this.SnackbarText = "Withdraw Request Completed Successfully";
          this.ShowDetailPopup = false;
          await this.GetAllWithdrawals();
          await this.UpdateUserBalance();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async GetAllWithdrawals() {
      try {
        let res = await axios.get(
          `http://localhost:3000/api/withdraws/FetchWithdrawals`
        );
        this.Withdrawals = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async CancelWithdrawal(item) {
      try {
        let body = {
          UserId: item.UserId,
          Name: item.Name,
          Email: item.Email,
          Phone: item.Phone,
          Price: item.Price,
          Status: 2,
        };
        let res = await axios.put(
          `http://localhost:3000/api/withdraws//update-withdraw-status/${item.id}`,
          body
        );
        if (res.data.code == 200) {
          this.ShowSnackbar = true;
          this.SnackbarText = "Withdraw Request Cancelled Successfully";
          this.ShowDetailPopup = false;
          await this.GetAllWithdrawals();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async UpdateUserBalance() {
      try {
        let body = {
          UserId: this.SelectedItem.UserId,
          Balance: 0,
          ClearBalance: true,
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
