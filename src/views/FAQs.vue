<template>
  <div class="small-container">
    <div class="faqs">
      <title-view
        title="Frequently Asked Questions"
        style="border-bottom: 0px"
      />

      <zi-collapse
        v-model="value"
        accordion
      >
        <zi-collapse-item
          v-for="(issue, index) in issues"
          :key="index"
          :title="issue.title"
        >
          <!-- eslint-disable vue/no-v-html -->
          <p v-html="issue.description" />
        </zi-collapse-item>
      </zi-collapse>
    </div>
  </div>
</template>

<script>
import TitleView from "@components/title"

export default {
  components: {
    TitleView
  },
  data: () => ({
    value: "",
    issues: [
      {
        title: "What is the decentralized Internet?",
        description: `
          The terms <b>Decentralized Internet</b> is used to describe the concept of an Internet where users are custodians of their data and activities.
          <br/>
          <b>Daoed</b> is built on <a href="https://blockstacks.org" target="_blank">Block Stack</a>, a Decentralized Internet platform.
        `
      },
      {
        title: "What can be found?",
        description: `
          Currently only accounts may be found. We will allow for more complete content types soon.
        `
      },
      {
        title: "Are search results filtered or powered by an algorithm?",
        description: `
          We do not filter search results, that may be the same as censorship. We use an algorithm which is to put results with more meta data, including images, name and description at the top of results due. This only a quality measure to ensure accounts with more subject matter are visible first.
        `
      },
      {
        title: "How do I enlist my account?",
        description: `
          You only need to create a <a href="https://blockstacks.org" target="_blank">Block Stack</a> account to get listed.
        `
      },
      {
        title: "My account doesn't show in search?",
        description: `
          Use use follow certain to ensure quality of the results that show up.
        `
      }
    ]
  }),

  watch: {
    value (next) {
    }
  }
}
</script>

<style>
.faqs {
  width: 100%;
  height: 100%;
}
</style>
