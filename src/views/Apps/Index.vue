<template>
  <div class="small-container">
    <div class="account-apps">
      <title-view title="Dapps" />

      <div class="dapps-list">
        <div class="dapp-list three-grid-container">
          <div
            v-for="(dapp, index) in DApps"
            :key="index"
            class="dapp-item"
          >
            <a
              :href="dapp.url"
              :target="dapp.url === '/' ? '' : '_blank'"
            >
              <img
                class="dapp-logo"
                :src="dapp.icon"
                @error="imgUrlAlt"
              >
            </a>
            <div class="">
              <zi-tooltip
                v-if="dapp.description"
                class="text-align-center span"
                :content="dapp.description"
                placement="top"
              >
                <a
                  :href="dapp.url"
                  :target="dapp.url === '/' ? '' : '_blank'"
                >
                  <h5>{{ dapp.name }}</h5>
                </a>
              </zi-tooltip>
              <a
                v-else
                :href="dapp.url"
                :target="dapp.url === '/' ? '' : '_blank'"
              >
                <h5>{{ dapp.name }}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="other-apps">
        <div class="title-tag">
          <zi-tag>Other apps</zi-tag>
        </div>

        <div class="dapp-list three-grid-container">
          <div
            v-for="(dapp, index) in dapps"
            :key="index"
            class="dapp-item"
          >
            <a
              :href="dapp.url"
              target="_blank"
            >
              <img
                class="dapp-logo"
                :src="dapp.icon"
                @error="imgUrlAlt"
              >
            </a>
            <div class="">
              <zi-tooltip
                v-if="dapp.description"
                class="text-align-center span"
                :content="dapp.description"
                placement="top"
              >
                <a
                  :href="dapp.url"
                  target="_blank"
                >
                  <h5>{{ dapp.name }}</h5>
                </a>
              </zi-tooltip>
              <a
                v-else
                :href="dapp.url"
                target="_blank"
              >
                <h5>{{ dapp.name }}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"
import { DApps, placeholderImg } from "@constants"

import TitleView from "@components/title"

export default {
  components: {
    TitleView
  },
  data: () => ({
    dapps: [ ],
    DApps
  }),
  computed: {
    ...mapGetters([
      "userData"
    ]),
    apps () {
      let userData = this.userData || {}
      let profile = userData.profile || {}
      return Object.keys(profile.apps || {}) || []
    }
  },
  watch: {
    apps () {
      this.updateApps()
    }
  },
  mounted () {
    this.updateApps()
  },
  methods: {
    async updateApps () {
      let apps = this.apps
      if (!apps.length) return false

      let dapps = await Promise.all(apps.map(async (app) => {
        let data, appData
        try {
          data = await axios.get(app + "/manifest.json", { crossdomain: true })
          appData = data.data
        } catch (err) {
          console.log(err)
          appData = {}
        }
        // check for icons and get preferred size
        let icon = (appData.icons || []).find((icon) => icon.sizes === "192x192") || (appData.icons || [])[0]
        let iconSrc

        if (icon) {
        // check if icon url is absolute or fix when relative
          let src = icon.src

          if (src.indexOf("https://") === 0) {
            iconSrc = src
          } else {
            let href

            try {
              href = new URL(appData.start_url).href
            } catch (err) {
              href = new URL(app).href
            }

            let pathname = src => {
              if (src.indexOf("./") === 0) return src.substr(2)
              if (src.indexOf("/") === 0) return src.substr(1)
              return src
            }

            iconSrc = href + pathname(src)
          }
        } else {
          // use a fallback
          iconSrc = this.placeholder
        }

        return {
          url: app,
          name: appData.name ? appData.name : app,
          description: appData.description,
          icon: iconSrc
        }
      }))

      this.dapps = dapps
    },
    imgUrlAlt (event) {
      event.target.src = placeholderImg
    }
  }
}
</script>

<style scoped>
.dapp-logo {
  width: 5rem;
  height: 5rem;
  border: 1px solid #888;
  border-radius: 50%;
}
.dapp-item {
  text-align: center;
}
.dapps-list {
  margin: 3rem 0rem;
}
.other-apps {
  padding-top: 3rem;
}
.title-tag {
  margin-bottom: 3rem;
}
</style>
