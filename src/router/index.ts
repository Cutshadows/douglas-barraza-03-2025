// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import MainView from "../views/MainView.vue";

export const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Main", component: MainView },
      { path: "/team", name: "Team", component: () => import("../views/TeamView.vue") },
    ],
  },
];

const router = createRouter({
  //   history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;
