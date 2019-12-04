<template>
  <div class="small-container">
    <div class="history-page">
      <title-view title="History">
        <template v-slot:extra>
          <zi-button
            type="abort"
            auto
            @click="clearAll"
          >
            Clear all
          </zi-button>
        </template>
      </title-view>

      <zi-table
        :data="history"
        hover="hover"
        empty-text="No search history"
        @cell-click="getCell"
        @row-click="getRow"
      >
        <zi-table-column
          prop="query"
          label="Query"
          min-width="200"
        />

        <zi-table-column
          label="Created"
        >
          <template slot-scope="scope">
            <timeago
              :datetime="history[scope.$index].created"
              :auto-update="60"
            />
          </template>
        </zi-table-column>

        <zi-table-column
          label="Actions"
        >
          <template slot-scope="scope">
            <a @click="search(history[scope.$index].query)"> search</a> | &nbsp;
            <a @click="deleteRow(scope.row, scope.$index)"> delete</a>
          </template>
        </zi-table-column>
      </zi-table>
    </div>
  </div>
</template>

<script>
import TitleView from "@components/title"

import { mapGetters } from "vuex"

export default {
  components: {
    TitleView
  },
  computed: {
    ...mapGetters([
      "history"
    ])
  },
  methods: {
    getCell (cell, row, event) {
    },
    getRow (row, event) {
    },
    search (query) {
      if (query) this.$router.push("/search?q=" + query)
    },
    deleteRow (row, index) {
      let history = [...this.history]
      history.splice(index, 1)
      this.$store.dispatch("setHistory", history)
    },
    clearAll () {
      this.$store.dispatch("setHistory", [])
    }
  }
}
</script>

<style scoped>
.user-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 2px solid #444;
}
.user-profile {
  display: flex;
  align-items: center;
}
.user-meta {
  margin-left: 1.5rem;
}
.user-bio {

}
</style>
