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
        component: () => import("pages/TabTest.vue"),
        props: true,
      },
      {
        path: "/publishView/:publishId",
        component: () => import("pages/PublishView.vue"),
        props: true,
      },
      {
        path: "home",
        component: () => import("pages/Index.vue"),
      },
      { path: "publish", component: () => import("pages/PublishScore.vue") },
      {
        path: "/user/:username",
        component: () => import("pages/User.vue"),
        props: true,
      },
      {
        path: "/user",
        component: () => import("pages/User.vue"),
      },
      { path: "news", component: () => import("pages/News.vue") },

      { path: "", redirect: "/home" },
      {
        path: "search",
        component: () => import("pages/Search.vue"),
      },
      {
        path: "/tuner",
        component: () => import("pages/Tuner.vue"),
      },
      {
        path: "/metronome",
        component: () => import("pages/Metronome.vue"),
      },
      {
        path: "/about",
        component: () => import("pages/About.vue"),
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
