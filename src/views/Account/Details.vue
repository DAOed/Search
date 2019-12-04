<template>
  <div class="account-details">
    <zi-more
      text="Hide"
      text-up="Details"
      @click.native="details = !details"
    />
    <div
      v-if="details"
      class="account-details-content"
    >
      <div class="account-details-item justified">
        <div>Identifier</div>
        <div>{{ detail.identifier }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Location</div>
        <div>{{ profile.location }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Website</div>
        <div>{{ profile.website }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Domain/Registrar</div>
        <div>{{ detail.domain }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Bitcoin</div>
        <div>{{ detail.bitcoin }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Ethereum</div>
        <div>{{ detail.etheruem }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Gaia</div>
        <div>{{ detail.gaia }}</div>
      </div>
      <div class="account-details-item justified">
        <div>Fully qualified name</div>
        <div>{{ accountData.username }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accountData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: function () {
    return {
      details: true
    }
  },
  computed: {
    profile () {
      return this.accountData.schemed.profile || {}
    },
    social () {
      return this.accountData.schemed.social || {}
    },
    detail () {
      return this.accountData.schemed.detail || {}
    }
  }
}
</script>

<style scoped>
.account-details {
  margin: 5rem 0rem;
}
</style>
