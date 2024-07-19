import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import RequestGarbage from "../views/RequestGarbage.vue";
import TotalOrders from "../views/TotalOrders.vue";
import RidersView from "../views/RidersView.vue";
import WithdrawalsView from "../views/WithdrawalsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/Riders",
    name: "Riders",
    component: RidersView,
  },
  {
    path: "/WithdrawalsView",
    name: "WithdrawalsView",
    component: WithdrawalsView,
  },
  {
    path: "/RequestGarbage",
    name: "RequestGarbage",
    component: RequestGarbage,
  },
  {
    path: "/TotalOrders",
    name: "TotalOrders",
    component: TotalOrders,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
