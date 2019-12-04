
import Landing from "@views/Landing/Index.vue"

export default [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: {
      title: "Search, connect and experience the decentralized Internet today - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Daoed is your interface to the Decentralized, Autonomous and Organized Internet. Find people, apps and more."
        },
        {
          property: "og:description",
          content: "Daoed is your interface to the Decentralized, Autonomous and Organized Internet. Find people, apps and more."
        }
      ]
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import(/* webpackChunkName: "search" */ "../views/Search/Index.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "account" */ "../views/Account/Index.vue"),
    meta: {
      requiresAuth: true,
      title: "Manage your account - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Securely manage your account. View your profile, connected apps, usage and social stats and more."
        },
        {
          property: "og:description",
          content: "Securely manage your account. View your profile, connected apps, usage and social stats and more."
        }
      ]
    }
  },
  {
    path: "/apps",
    name: "Apps",
    component: () => import(/* webpackChunkName: "apps" */ "../views/Apps/Index.vue"),
    meta: {
      requiresAuth: true,
      title: "Account dapps - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Securely view and manage your decentralized apps."
        },
        {
          property: "og:description",
          content: "Securely view and manage your decentralized apps."
        }
      ]
    }
  },
  {
    path: "/history",
    name: "History",
    component: () => import(/* webpackChunkName: "history" */ "../views/History/Index.vue"),
    meta: {
      requiresAuth: true,
      title: "Search history - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Securely manage your search history, available only to you."
        },
        {
          property: "og:description",
          content: "Securely manage your search history, available only to you."
        }
      ]
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings/Index.vue"),
    meta: {
      requiresAuth: true,
      title: "Account settings - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Configure how you access and interact with the decentralized Internet."
        },
        {
          property: "og:description",
          content: "Configure how you access and interact with the decentralized Internet."
        }
      ]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      title: "Secure login via BlockStack - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Login to Daoed using BlockStack to interrupt with the Decentralized Internet."
        },
        {
          property: "og:description",
          content: "Login to Daoed using BlockStack to interrupt with the Decentralized Internet."
        }
      ]
    }
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: () => import(/* webpackChunkName: "faqs" */ "../views/FAQs.vue"),
    meta: {
      title: "Frequently Asked Questions about the new decentralized Internet - Daoed",
      metaTags: [
        {
          name: "description",
          content: "Decentralization doesn't have to be confusing, find answers to your most common question about the decentralized Internet."
        },
        {
          property: "og:description",
          content: "Decentralization doesn't have to be confusing, find answers to your most common question about the decentralized Internet."
        }
      ]
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "The Decentralized, Autonomous and Organized Internet - Daoed",
      metaTags: [
        {
          name: "description",
          content: "The decentralized Internet is here, learn more about us."
        },
        {
          property: "og:description",
          content: "The decentralized Internet is here, learn more about us."
        }
      ]
    }
  }
]
