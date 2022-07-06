const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "home", component: () => import("pages/Index.vue") },
      { path: "publish", component: () => import("pages/PublishScore.vue") },
      { path: "", redirect: "/home" },
    ],
  },
  {
    path: "/test",
    component: () => import("pages/TabTest.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
