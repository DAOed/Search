<template>
  <div class="container">
    <div class="dual-grid">
      <div class="dual-grid-one">
        <div class="search-input-area">
          <div>
            <search-input
              :query="query"
              @search="search"
            />
          </div>

          <div class="justified">
            <div>
              <zi-switcher>
                <zi-switcher-item
                  v-for="label in labels"
                  :key="label"
                  :label="label"
                />
              </zi-switcher>
            </div>
            <div>
              <zi-button
                type="abort"
                auto
                @click="isOpen = !isOpen"
              >
                Filter
              </zi-button>
            </div>
          </div>
          <div>
            <filter-search
              :is-open="isOpen"
              @filter="updateFilter"
            />
          </div>
        </div>

        <div>
          <div
            v-if="loading"
            class="search-loader"
          >
            <zi-spinner size="big" />
          </div>

          <div v-else-if="items.length">
            <item
              v-for="(item, index) in items"
              :key="index"
              :item="item"
              @selected="selected"
            />
          </div>

          <div v-else>
            Sorry no match found.
          </div>
        </div>
      </div>
      <div class="dual-grid-two" />
    </div>
    <Modal
      :request-id="requestID"
      :show="modal"
      :account-data="modalData"
      @closing="modal = false"
    />
  </div>
</template>

<script>
import Item from "./Item"
import Modal from "./Modal"
import filterSearch from "./Filter"

import searchInput from "@components/search"

import { mapGetters } from "vuex"

import { searchAccount } from "@lib/blockstack"

import { filter, build } from "@lib/quality"

export default {
  components: {
    Item,
    Modal,
    filterSearch,
    searchInput
  },
  data: () => {
    return {
      query: "",
      isOpen: false,
      items: [],
      labels: ["Accounts"], // "Apps", "Posts"
      modal: false,
      requestID: null,
      modalData: {},
      loading: false,
      // filters
      anyDomain: true,
      anyQuality: true,
      filteredDomains: "",
      qualityChecks: [],
      datas: []
    }
  },
  computed: {
    ...mapGetters([
      "userData"
    ])
  },
  async created () {
    let urlParams = new URLSearchParams(window.location.search)

    let query = this.$route.query.q || urlParams.get("q")

    if (!query) {
      this.$router.push("/")
    } else {
      this.query = query
      await this.search(query)
    }
  },
  methods: {
    async search (query) {
      let data

      if (query) {
        this.items = []
        this.loading = true

        document.title = query + " - Daoed"
        window.history.replaceState({}, "", decodeURIComponent(`${location.pathname}?q=${query}`))
        if (this.userData.username) this.$store.dispatch("addHistory", { query, created: new Date().toISOString() })

        data = await searchAccount(query)
        data = data.results
        this.datas = data
      } else {
        data = this.datas
      }
      // console.log(data)

      const domainData = (this.anyDomain && !this.filteredDomains.length)
        ? data : (!this.anyDomain && this.filteredDomains.length)
          ? filter(data, "domain", this.filteredDomains) : data

      const qualityData = (this.anyQuality && !this.qualityChecks.length)
        ? domainData : (!this.anyQuality && this.qualityChecks.length)
          ? filter(domainData, "quality", this.qualityChecks) : domainData

      const readyData = build(qualityData)

      this.items = readyData
      this.loading = false

      // to do update vue router query params
    },
    selected (id) {
      this.modal = true
      this.requestID = new Date().toISOString()
      this.modalData = this.items.find(item => item.detail.id === id)
    },
    updateFilter (config) {
      // console.log(config)

      this.anyDomain = config.anyDomain
      this.anyQuality = config.anyQuality
      this.filteredDomains = config.filteredDomains
      this.qualityChecks = config.qualityChecks

      this.search()
    }
  }
}
</script>

<style scoped>
.search-input-area {
}
.search-loader {
  display: flex;
  justify-content: center;
  margin: 3rem;
}
</style>
