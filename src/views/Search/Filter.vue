<template>
  <div class="">
    <div
      :style="[isOpen ? { height : filterHeight } : {}]"
      class="togglable filter-area"
    >
      <div class="filter-content">
        <div class="filter-item">
          <div class="justified">
            <div class="filter-title">
              Domain
            </div>
            <zi-checkbox v-model="anyDomain">
              All domains
            </zi-checkbox>
          </div>
          <div
            :style="[!anyDomain ? { height : '50px' } : {}]"
            class="togglable"
          >
            <zi-input
              v-model="filteredDomains"
              placeholder="Enter domains separated by space or comma, eg: id onename"
              size="mini"
              :clearable="true"
              class="filter-domains-input"
            />
          </div>
        </div>

        <div class="filter-item">
          <div class="justified">
            <div class="filter-title">
              Quality
            </div>
            <zi-checkbox v-model="anyQuality">
              Any quality
            </zi-checkbox>
          </div>
          <div
            :style="[!anyQuality ? { height : '50px' } : {}]"
            class="togglable"
          >
            <zi-checkbox-group v-model="qualityChecks">
              <zi-checkbox
                v-for="item in qualityChecksList"
                :key="item"
                :label="item"
              />
            </zi-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    filteredDomains: "",
    anyDomain: true,
    anyQuality: true,
    qualityChecksList: ["Name", "Avatar", "Bio", "Accounts"],
    qualityChecks: []
  }),
  computed: {
    filterHeight () {
      if (!this.isOpen) {
        return 0
      } else {
        let height = 110

        if (!this.anyDomain) height += 50
        if (!this.anyQuality) height += 50

        return height + "px"
      }
    }
  },
  watch: {
    anyDomain () {
      this.updateFilter()
    },
    anyQuality () {
      this.updateFilter()
    },
    qualityChecks () {
      this.updateFilter()
    },
    filteredDomains () {
      this.updateFilter()
    }
  },
  methods: {
    updateFilter () {
      let domainFilter = {
        anyDomain: this.anyDomain,
        filteredDomains: this.filteredDomains
      }

      let qualityFilter = {
        anyQuality: this.anyQuality,
        qualityChecks: this.qualityChecks
      }

      this.$emit("filter", { ...domainFilter, ...qualityFilter })
    }
  }
}
</script>

<style scoped>
.togglable {
  height: 0;
  overflow: hidden;
  transition: 0.5s;
  margin: 1rem 0rem;
}
.filter-item {
  margin-bottom: 0.5rem;
}
.filter-title {
}
.filter-area {
  border-radius: 5px;
  border: 1px solid #fafafa;
}
.filter-content {
  margin: 1rem;
}
.filter-domains-input {
  width: 100%;
}
</style>
