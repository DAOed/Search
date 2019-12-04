<template>
  <div class="account-alerts">
    <!--
        <div class="account-alert">
          <zi-note
            type="secondary"
            label="Complete your account"
          >
            <p>Your account is missing a name</p>
            <p>Your account lacks any connect accounts such as Facebook, Twitter, Linkedin, Github and Steem</p>
            <p>Your account is missing description or bio</p>
            <div class="alert-close-button">
              <zi-button
                size="small"
                auto
              >
                Ignore
              </zi-button>
            </div>
          </zi-note>
        </div>

        <div class="account-warning">
          <zi-note
            type="warning"
            label="Issues detected"
          >
            Potential issues detected with your profile:
            <br>
            <p>Your profile image size is not square in size</p>
            <div class="alert-close-button">
              <zi-button
                size="small"
                auto
                type="warning"
              >
                Ignore
              </zi-button>
            </div>
          </zi-note>
        </div>
      -->
    <p />
  </div>
</template>

<script>
export default {
  components: {
  },
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
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
