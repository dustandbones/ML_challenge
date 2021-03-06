import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ListSearch from "../views/ListSearch.vue";
import ItemDescription from "../views/ItemDescription.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/items",
    name: "ListSearch",
    component: ListSearch
  },
  {
    path: "/items/:id",
    name: "ItemDescription",
    component: ItemDescription
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
