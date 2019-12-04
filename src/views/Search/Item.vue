<template>
  <div class="item">
    <div class="item-image-div">
      <img
        v-if="profile.avatar"
        :src="profile.avatar"
        class="item-image"
        @error="imgUrlAlt"
      >
      <div
        v-else
        class="item-image"
      >
        <div :style="profile.initialsAvatar.style">
          {{ profile.initialsAvatar.content }}
        </div>
      </div>
    </div>
    <div class="item-info">
      <div class="item-info-top justified">
        <a
          class="name"
          @click="selected(detail.id)"
        >
          {{ profile.name || `@${detail.username}` }}
        </a>
        <div class="action-icons">
          <zi-button
            v-if="social.facebook"
            type="abort"
            auto
            @click="goExternal(social.facebook)"
          >
            <facebook-icon
              size="1.5x"
              class=""
            />
          </zi-button>
          <zi-button
            v-if="social.twitter"
            type="abort"
            auto
            @click="goExternal(social.twitter)"
          >
            <twitter-icon
              size="1.5x"
              class=""
            />
          </zi-button>
          <zi-button
            v-if="social.linkedin"
            type="abort"
            auto
            @click="goExternal(social.linkedin)"
          >
            <linkedin-icon
              size="1.5x"
              class=""
            />
          </zi-button>
          <zi-button
            v-if="social.github"
            type="abort"
            auto
            @click="goExternal(social.github)"
          >
            <github-icon
              size="1.5x"
              class=""
            />
          </zi-button>
          <zi-button
            v-if="social.steem"
            type="abort"
            auto
            @click="goExternal(social.steem)"
          >
            <rss-icon
              size="1.5x"
              class=""
            />
          </zi-button>
          <zi-button
            v-if="profile.website"
            type="abort"
            auto
            @click="goExternal(profile.website)"
          >
            <link-icon
              size="1.5x"
              class=""
            />
          </zi-button>
        </div>
      </div>
      <div class="description">
        {{ profile.description }}
      </div>
      <div class="meta-div">
        <zi-tooltip
          content="Identifier"
          placement="right"
          class="meta-item"
        >
          <span class="meta-value">@{{ item.detail.identifier }}</span>
        </zi-tooltip>
        <zi-tooltip
          content="Domain"
          placement="right"
          class="meta-item"
        >
          <span class="meta-value">*{{ item.detail.domain }}</span>
        </zi-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { FacebookIcon, TwitterIcon, LinkedinIcon, GithubIcon, RssIcon, LinkIcon } from "vue-feather-icons"
import { placeholderImg } from "@constants"

export default {
  components: {
    FacebookIcon, TwitterIcon, LinkedinIcon, GithubIcon, RssIcon, LinkIcon
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  computed: {
    profile () {
      return this.item.profile || {}
    },
    detail () {
      return this.item.detail || {}
    },
    social () {
      return this.item.social || {}
    }
  },
  methods: {
    imgUrlAlt (event) {
      event.target.src = placeholderImg
    },
    selected (id) {
      this.$emit("selected", id)
    },
    goExternal (url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>
.item {
  margin: 2rem 0rem;
  display: flex;
  align-items: center;
}
.item-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #f1f1f1;
}
.item-image-div {
  width: 105px;
}
.item-info {
  margin-left: 1rem;
  width: 100%;
}
.name {
  font-size: 120%;
  display: block;
  font-weight: 400;
}
.description {
  color: #666;
  overflow-wrap: break-word;
  font-size: 90%;
}

.sub {
  color: #666;
}
.title {
  font-size: 130%;
  font-weight: 400;
  margin: 0.5rem 0rem;
}
.summary {
  color: #444;
  font-size: 95%;
}
.meta-icon {
}
.meta-div {
  margin-top: -0.2rem;
}
.meta-item {
  margin-right: 0.5rem;
  display: inline;
}
.meta-value {
  font-size: 70%;
  color: #333;
  font-style: italic;
}
</style>
