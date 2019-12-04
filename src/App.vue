<template>
  <div id="app">
    <div>
      <app-header />
    </div>
    <div class="app-body">
      <div
        v-if="loading"
        class="app-loader"
      >
        <zi-spinner size="big" />
      </div>
      <router-view v-else />
    </div>
    <div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import AppHeader from "@components/partials/header"
import AppFooter from "@components/partials/footer"

import { getFile, userSession } from "@lib/blockstack"

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data: () => ({
    loading: true
  }),
  async mounted () {
    // check if user is logged in
    if (userSession.isUserSignedIn()) {
      let data = userSession.loadUserData()
      this.$store.dispatch("userData", data)

      await this.loadData()

      window.history.replaceState({}, document.title, window.location.pathname)
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then(async (userData) => {
          this.$store.dispatch("userData", userData)

          await this.loadData()
        })

      window.history.replaceState({}, document.title, window.location.pathname)
    } else {
      this.loading = false
    }

    this.$router.beforeEach((to, from, next) => {
      // This goes through the matched routes from last to first, finding the closest route with a title.
      // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
      const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

      // Find the nearest route element with meta tags.
      const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)
      // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

      // If a route with a title was found, set the document (page) title to that value.
      if (nearestWithTitle) document.title = nearestWithTitle.meta.title

      // Remove any stale meta tags from the document using the key attribute we set below.
      Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
        el => el.parentNode.removeChild(el)
      )

      // Skip rendering meta tags if there are none.
      if (!nearestWithMeta) return next()

      // Turn the meta tag definitions into actual elements in the head.
      nearestWithMeta.meta.metaTags
        .map(tagDef => {
          const tag = document.createElement("meta")

          Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key])
          })

          // We use this to track which meta tags we create, so we don't interfere with other ones.
          tag.setAttribute("data-vue-router-controlled", "")

          return tag
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag))

      next()
    })
  },
  methods: {
    async loadData () {
      let history = await getFile("history")
      let settings = await getFile("settings")

      history = JSON.parse(history || "[]")
      settings = JSON.parse(settings || "{}")

      if (settings.theme) this.$store.dispatch("theme", { mode: settings.theme, auto: true })

      this.$store.dispatch("setHistory", [ ...history, { auto: true } ])
      this.$store.dispatch("settings", { ...settings, auto: true })

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
}
.app-body {
  min-height: 65vh;
  margin: 3rem 0rem 0rem 0rem;
  overflow: hidden;
}
.app-loader {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
}
</style>
