const tabs = {
  props: ["id"],
  template: "<div>tabs {{ id }}</div>",
};
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/tabs/:id",
        component: (tabs) => import("pages/TabTest.vue"),
        props: true,
      },
      { path: "home", component: () => import("pages/Index.vue") },
      { path: "publish", component: () => import("pages/PublishScore.vue") },
      { path: "user", component: () => import("pages/User.vue") },
      { path: "", redirect: "/home" },
      {
        path: "search",
        component: () => import("pages/Search.vue"),
      },
    ],
  },
  {
    path: "/test",
    component: () => import("pages/TabTest.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
