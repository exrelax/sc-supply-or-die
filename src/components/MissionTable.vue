<template>
  <table class="table-missions">
    <thead class="table-missions__thead">
      <tr class="table-missions__head-row">
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--name">
          Mission
        </th>
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--points">
          Points
        </th>
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--payment">
          Pay (aUEC)
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--commodities"
        >
          Commodities
        </th>
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--scu">
          SCU total
        </th>
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--container">
          min Containers
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--investment"
        >
          Investment (aUEC)
        </th>
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--profit">
          Profit (aUEC)
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-scu"
        >
          Profit per SCU (aUEC)
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-container"
        >
          Profit per Container (aUEC)
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--points-per-scu"
        >
          Points per SCU
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--points-per-container"
        >
          Points per Container
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--missions-needed"
        >
          All Rewards <small>(Hand-Ins)</small>
        </th>
        <th
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-scu"
        >
          Profit all Rewards <small>(aUEC)</small>
        </th>
      </tr>
    </thead>
    <tbody class="table-missions__tbody">
      <tr
        v-for="(mission, index) in missionsComplete"
        v-key="index"
        class="table-missions__body-row"
      >
        <td class="table-missions__cell table-missions__cell--name">
          {{ mission.name }}
        </td>
        <td class="table-missions__cell table-missions__cell--points">
          {{ mission.reward.points }}
        </td>
        <td class="table-missions__cell table-missions__cell--payment">
          {{ mission.paymentFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--commodities">
          {{ mission.commoditiesFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--scu">
          {{ mission.scuPerMissionFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--container">
          {{ mission.minContainerCount }}
        </td>
        <td class="table-missions__cell table-missions__cell--investment">
          {{ mission.investmentFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--profit">
          {{ mission.profitFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--profit-per-scu">
          {{ mission.profitPerScuFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--profit-per-container">
          {{ mission.profitPerContainerFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--points-per-scu">
          {{ mission.pointsPerScuFormatted }}
        </td>
        <td class="table-missions__cell table-missions__cell--points-per-container">
          {{ mission.pointsPerContainer }}
        </td>
        <td class="table-missions__cell table-missions__cell--missions-needed">
          {{ mission.missionsNeededForHighestReward }}
        </td>
        <td class="table-missions__cell table-missions__cell--profit-total">
          {{ mission.profitAllNeededMissionsFormatted }}
        </td>
      </tr>
    </tbody>
  </table>
  {{ investment }}
</template>

<script setup>
import { computed } from 'vue'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const props = defineProps({
  missions: Array,
})

const store = useSupplyOrDieStore()
const missionsComplete = computed(() => {
  return props.missions.map((mission) => {
    const payment = store.getMissionPayment(mission)
    const scuPerMission = store.getScuPerMission(mission)
    const investment = store.getMissionInvestment(mission)
    const profit = store.getMissionProfit(mission)
    const extendedProfit = store.getProfitForAllNeededMissions(mission)
    const pointsPerScu = store.getPointsPerScuForMission(mission)
    const pointsPerContainer = store.getPointsPerContainerForMission(mission)
    return {
      ...mission,
      ...payment,
      ...scuPerMission,
      ...investment,
      ...profit,
      ...extendedProfit,
      ...pointsPerScu,
      ...pointsPerContainer,
    }
  })
})
</script>

<style>
.table-missions {
  table-layout: fixed;
  width: 100%;
  padding: 0;
  border-spacing: 0;
  border-collapse: separate;
}

.table-missions__head-row {
  background: rgb(0 0 0 / 25%);
}

.table-missions__body-row:nth-child(2n + 1) {
  background: rgb(0 0 0 / 5%);
}

.table-missions__body-row:nth-child(2n) {
  background: rgb(0 0 0 / 15%);
}

.table-missions__body-row:hover {
  background: rgb(0 0 0 / 25%);
}

.table-missions__cell {
  padding: 3px 10px;
  border-bottom: 1px solid #222;
  text-align: left;
}

.table-missions__cell--points,
.table-missions__cell--payment,
.table-missions__cell--missions-needed,
.table-missions__cell--commodities,
.table-missions__cell--scu,
.table-missions__cell--container,
.table-missions__cell--investment,
.table-missions__cell--profit,
.table-missions__cell--profit-per-scu,
.table-missions__cell--profit-per-container .table-missions__cell--profit-total,
.table-missions__cell--points-per-scu,
.table-missions__cell--points-per-container {
  text-align: right;
}
</style>
