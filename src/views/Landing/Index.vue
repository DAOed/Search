<template>
  <div class="landing">
    <div class="input-area">
      <div class="input">
        <search-input @search="search" />
      </div>
      <div class="featured">
        <div class="app-logo-div">
          <img
            class="app-logo"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchInput from "@components/search"

export default {
  name: "Landing",
  components: {
    searchInput
  },
  methods: {
    search (data) {
      if (data) this.$router.push("/search?q=" + data)
    }
  }
}
</script>

<style scoped>
.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.search-input {
  width: 350px;
  margin: 3rem 1rem;
}
.featured {
}
.app-logo-div {
  display: none;
}
.app-logo {
  border-radius: 50%;
  border: 4px solid #fafafa;
  height: 50px;
  width: 50px%;
}
.input-area {
  width: 500px;
}
</style>
