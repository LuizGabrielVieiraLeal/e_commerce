const routes = [
  {
    path: "/",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    children: [{ path: "/", component: () => import("pages/user/Index.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
