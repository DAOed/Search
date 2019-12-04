<template>
  <div class="small-container">
    <div class="account-page">
      <account-alerts :account-data="accountData" />
      <account-profile :account-data="accountData" />
      <account-details :account-data="accountData" />
      <account-activity :account-data="accountData" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import { schema } from "@lib/schema"

import AccountAlerts from "./Alerts"
import AccountProfile from "./Profile"
import AccountDetails from "./Details"
import AccountActivity from "./Activity"

export default {
  components: {
    AccountAlerts, AccountProfile, AccountDetails, AccountActivity
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "userData"
    ]),
    accountData () {
      let userData = this.userData || {}
      if (!userData.username) return userData

      let schemed = schema(userData)
      return { ...userData, schemed }
    }
  }
}
</script>

<style scoped>
</style>
