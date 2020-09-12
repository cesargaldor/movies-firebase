import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../Firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Trending",
    component: () =>
      import(/* webpackChunkName: "trending" */ "../views/Trending.vue"),
  },
  {
    path: "/top",
    name: "Top",
    component: () => import(/* webpackChunkName: "top" */ "../views/Top.vue"),
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: () =>
      import(/* webpackChunkName: "upcoming" */ "../views/Upcoming.vue"),
  },
  {
    path: "/search/:name",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: () =>
      import(/* webpackChunkName: "moviedetails" */ "../views/Movie/_id.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category/_id.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    component: () =>
      import(/* webpackChunkName: "watchlist" */ "../views/Watchlist.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/watched",
    name: "Watched",
    component: () =>
      import(/* webpackChunkName: "watched" */ "../views/Watched.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () =>
      import(/* webpackChunkName: "favorites" */ "../views/Favorites.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  /* Esto hace que el scroll siempre vuelva arriba cuando cambiemos la ruta*/
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth) {
    auth.onAuthStateChanged((user) => {
      if (!user) next("/auth");
      else next();
    });
  } else next();
});

export default router;
