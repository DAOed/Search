<template>
  <div class="modal">
    <zi-dialog
      v-model="visible"
      width="500px"
      done="ok!"
      :before-done="closing"
    >
      <div class="modal-content">
        <div class="profile">
          <div>
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              class="avatar"
              @error="imgUrlAlt"
            >
            <div
              v-else
              class="avatar"
            >
              <div :style="(profile.initialsAvatar || {}).style">
                {{ (profile.initialsAvatar || {}).content }}
              </div>
            </div>
          </div>
          <div class="modal-texts">
            <h4>{{ profile.name || `@${detail.username}` }}</h4>
            <div class="modal-description">
              {{ profile.description }}
            </div>
          </div>
        </div>

        <div class="divider" />

        <div class="contents">
          <div class="details">
            <div class="detail-div">
              <span class="detail-name">Identifier</span>
              <span class="detail-value">{{ detail.identifier }}</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">Location</span>
              <span class="detail-value">{{ profile.location }}</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">Connected accounts</span>
              <span class="detail-value">{{ accountCount }}</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">Domain</span>
              <span class="detail-value">{{ detail.domain }}</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">Gaia</span>
              <span class="detail-value">{{ detail.gaia }}</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">Fully qualified name</span>
              <span class="detail-value">{{ detail.id }}</span>
            </div>
            <!--
            <div class="detail-div">
              <span class="detail-name">following</span>
              <span class="detail-value">...</span>
            </div>
            <div class="detail-div">
              <span class="detail-name">followers</span>
              <span class="detail-value">...</span>
            </div>
          -->
          </div>

          <div class="actions">
            <zi-button
              size="small"
              class="action-button"
              type="abort"
              auto
              disabled
            >
              Follow
            </zi-button>
            <zi-button
              size="small"
              class="action-button"
              type="abort"
              auto
              disabled
            >
              Message
            </zi-button>
            <zi-button
              size="small"
              class="action-button"
              type="abort"
              auto
              disabled
            >
              Mute
            </zi-button>
            <zi-button
              size="small"
              class="action-button"
              type="abort"
              auto
              disabled
            >
              Poke
            </zi-button>
          </div>
        </div>
      </div>
    </zi-dialog>
    <v-styler>{{ updateClass }}</v-styler>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    requestId: {
      type: String,
      default: ""
    },
    accountData: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  data: () => ({
    visible: false,
    updateClass: `
      .zi-dialog-footer {
        display: none !important;
      }
      .zi-dialog-wrapper {
        transform: translateY(0px) !important;
      }
    `,
    placeholder: "img/placeholder.png"
  }),
  computed: {
    profile () {
      return this.accountData.profile || {}
    },
    detail () {
      return this.accountData.detail || {}
    },
    social () {
      return this.accountData.social || {}
    },
    accountCount () {
      let accounts = [this.social.facebook, this.social.twitter, this.social.linkedin, this.social.github, this.social.steem]
      accounts = accounts.filter(Boolean)
      return accounts.length
    }
  },
  watch: {
    requestId () {
      this.visible = this.show
    },
    visible () {
    }
  },
  mounted () {
    this.visible = this.show
  },
  methods: {
    closing () {
      this.$emit("closing")
    },
    imgUrlAlt (event) {
      event.target.src = this.placeholder
    }
  }
}
</script>

<style scoped>
.modal {
  width: 500px;
}
.modal-content {
}
.avatar {
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  border: 2px solid blue;
}
.profile {
  display: flex;
  align-items: center;
}
.modal-texts {
  margin-left: 1rem;
}
.modal-description {
  margin-top: -0.7rem;
  overflow-wrap: break-word;
  margin-top: -0.7rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
.divider {
  margin: 1rem 0rem;
  border: 1px solid black;
}
.detail-div {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.detail-name {
  color: #333;
  font-size: 80%;
}
.detail-value {
  font-size: 80%;
}
.contents {
  margin: 0rem 1rem;
}
.details {
  margin: 0 auto;
}
.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.action-button {
  margin-bottom: 1rem;
}
</style>
