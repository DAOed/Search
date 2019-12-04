<template>
  <div class="small-container">
    <div class="settings-page">
      <title-view title="Settings">
        <template v-slot:extra>
          <zi-button
            type="abort"
            auto
            @click="reset"
          >
            Reset
          </zi-button>
        </template>
      </title-view>

      <div>
        <div class="justified setting-item">
          <div>
            Save searches
            <zi-tooltip
              content="Your search history is securely stored in your Gaia hub"
              placement="top"
              class="span"
            >
              <info-icon size="1x" />
            </zi-tooltip>
          </div>
          <zi-toggle v-model="saveSearch" />
        </div>
        <div class="justified setting-item">
          <div>Save theme</div>
          <zi-toggle v-model="saveTheme" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleView from "@components/title"
import { defaultSettings } from "@constants"

import { mapGetters } from "vuex"
import { InfoIcon } from "vue-feather-icons"

export default {
  components: {
    InfoIcon,
    TitleView
  },
  data: () => ({
    saveSearch: false,
    saveTheme: false,
    auto: true
  }),
  computed: {
    ...mapGetters([
      "settings",
      "theme"
    ])
  },
  watch: {
    saveSearch (saveSearch) {
      this.$store.dispatch("settings", { ...this.settings, saveSearch, auto: this.auto })
    },
    saveTheme (saveTheme) {
      if (saveTheme) {
        this.$store.dispatch("settings", { ...this.settings, saveTheme, theme: this.theme, auto: this.auto })
      } else {
        this.$store.dispatch("settings", { ...this.settings, saveTheme, auto: this.auto })
      }
    }
  },
  mounted () {
    this.saveTheme = this.settings.saveTheme
    this.saveSearch = this.settings.saveSearch

    setTimeout(() => { this.auto = false }, 1000)
  },
  methods: {
    reset () {
      this.$store.dispatch("settings", { ...defaultSettings })
    }
  }
}
</script>

<style scoped>
.setting-item {
  margin-bottom: 2rem;
}
</style>
