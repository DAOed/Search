<template>
  <div class="account-chart">
    <div class="title-tag">
      <zi-tooltip
        content="Based only on Daoed.com apps"
        placement="right"
      >
        <zi-tag>Activity</zi-tag>
      </zi-tooltip>
    </div>
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="series"
    />
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
      details: true,
      chartOptions: {
        chart: {
          id: "daoed-activity"
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: "This year",
        data: []
      }]
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
.account-chart {
  margin-top: 5rem;
}
</style>
