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
