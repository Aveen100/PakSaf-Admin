<template>
  <v-card>
    <!-- :mini-variant.sync="mini" -->
    <v-navigation-drawer v-model="drawer" color="green" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Admin</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group>
          <v-list-item to="/RequestGarbage">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/TotalOrders">
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/Riders">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Riders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/WithdrawalsView">
            <v-list-item-icon>
              <v-icon>mdi-cash-refund</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Withdrawals Request</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <!-- <v-divider></v-divider> -->
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Request Garbage",
          icon: "mdi-home-city",
          to: "../views/RequestGarbage.vue",
        },
        {
          title: "Total Orders",
          icon: "mdi-home-city",
          to: "../views/TotalOrders.vue",
        },
        { title: "About", icon: "mdi-account", to: "../views/AboutView.vue" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
    };
  },
};
</script>
