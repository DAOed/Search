<template>
  <div class="account-profile">
    <div class="account-profile-top">
      <div>
        <img
          v-if="profile.avatar"
          :src="profile.avatar"
          class="account-image"
          @error="imgUrlAlt"
        >
        <div
          v-else
          class="account-image"
        >
          <div :style="profile.initialsAvatar.style">
            {{ profile.initialsAvatar.content }}
          </div>
        </div>
      </div>

      <div class="account-meta">
        <h2>{{ name }}</h2>
        <div class="account-bio">
          {{ profile.description }}
        </div>
      </div>
    </div>

    <div class="account-stats">
      <div>
        <zi-tooltip
          content="Authorized Dapps"
          placement="top"
          class="account-stat-item"
        >
          <play-icon
            size="1.5x"
            class=""
          />
          <div>{{ stats.apps }}</div>
        </zi-tooltip>
      </div>
      <div>
        <zi-tooltip
          content="Connected accounts"
          placement="top"
          class="account-stat-item"
        >
          <user-check-icon
            size="1.5x"
            class=""
          />
          <div>{{ stats.accounts }}</div>
        </zi-tooltip>
      </div>
      <div>
        <zi-tooltip
          content="Following"
          placement="top"
          class="account-stat-item"
        >
          <users-icon
            size="1.5x"
            class=""
          />
          <div>{{ stats.following }}</div>
        </zi-tooltip>
      </div>
      <div>
        <zi-tooltip
          content="Muted"
          placement="top"
          class="account-stat-item"
        >
          <eye-off-icon
            size="1.5x"
            class=""
          />
          <div>{{ stats.muted }}</div>
        </zi-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { PlayIcon, UsersIcon, UserCheckIcon, EyeOffIcon } from "vue-feather-icons"
import { placeholderImg } from "@constants"
export default {
  components: {
    PlayIcon, UsersIcon, UserCheckIcon, EyeOffIcon
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
      details: true,
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }]
    }
  },
  computed: {
    profile () {
      return this.accountData.schemed ? this.accountData.schemed.profile : {}
    },
    social () {
      return this.accountData.schemed ? this.accountData.schemed.social : {}
    },
    detail () {
      return this.accountData.schemed ? this.accountData.schemed.detail : {}
    },
    name () {
      if (!this.accountData.schemed) return "@" + this.detail.identifier
      let name = this.accountData.schemed.profile.name
      return name || "@" + this.detail.identifier
    },
    stats () {
      let profile = this.accountData.profile || {}
      let apps = profile.apps || {}
      let account = profile.account || []

      return {
        apps: Object.keys(apps).length,
        accounts: account.length,
        following: 0,
        muted: 0
      }
    }
  },
  methods: {
    imgUrlAlt (event) {
      event.target.src = placeholderImg
    }
  }
}
</script>

<style scoped>
.account-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 2px solid #444;
}
.account-profile-top {
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-meta {
  margin-left: 1.5rem;
}
.account-bio {
}
.account-stats {
  margin: 3rem 0rem 1rem;
  display: flex;
  justify-content: space-around;
}
.account-stat-item {
  text-align: center;
}
</style>
