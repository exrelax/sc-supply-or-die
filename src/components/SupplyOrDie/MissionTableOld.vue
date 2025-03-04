<script setup>
import { computed } from 'vue'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const props = defineProps({
  missions: Array,
  mode: String,
})

const store = useSupplyOrDieStore()

const showAll = computed(() => {
  return props.mode != null && props.mode === 'all'
})

const missionsComplete = computed(() => {
  return props.missions.map((mission) => {
    return store.getCompleteMission(mission.id)
  })
})
</script>

<template>
  <table class="table-missions">
    <thead class="table-missions__thead">
      <tr class="table-missions__head-row">
        <th class="table-missions__cell table-missions__cell--head table-missions__cell--name"></th>
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
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--container"
        >
          min Containers
        </th>
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--investment"
        >
          Investment (aUEC)
        </th>
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit"
        >
          Profit (aUEC)
        </th>
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-scu"
        >
          Profit per SCU (aUEC)
        </th>
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-container"
        >
          Profit per Container (aUEC)
        </th>
        <th
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--points-per-scu"
        >
          Points per SCU
        </th>
        <th
          v-if="showAll"
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
          v-if="showAll"
          class="table-missions__cell table-missions__cell--head table-missions__cell--profit-per-scu"
        >
          Profit all Rewards <small>(aUEC)</small>
        </th>
      </tr>
    </thead>
    <tbody class="table-missions__tbody">
      <tr
        v-for="(mission, index) in missionsComplete"
        :key="index"
        class="table-missions__body-row"
      >
        <td class="table-missions__cell table-missions__cell--name">
          {{ mission.nameShort }}
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
        <td v-if="showAll" class="table-missions__cell table-missions__cell--container">
          {{ mission.minContainerCount }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--investment">
          {{ mission.investmentFormatted }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--profit">
          {{ mission.profitFormatted }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--profit-per-scu">
          {{ mission.profitPerScuFormatted }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--profit-per-container">
          {{ mission.profitPerContainerFormatted }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--points-per-scu">
          {{ mission.pointsPerScuFormatted }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--points-per-container">
          {{ mission.pointsPerContainer }}
        </td>
        <td v-if="showAll" class="table-missions__cell table-missions__cell--missions-needed">
          {{ mission.missionsNeededForHighestReward }}
        </td>
        <td class="table-missions__cell table-missions__cell--profit-total">
          {{ mission.profitAllNeededMissionsFormatted }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.table-missions {
  table-layout: fixed;
  width: 100%;
  padding: 0;
  border-spacing: 0;
  border-collapse: separate;
}

.table-missions__head-row .table-missions__cell {
  background: rgb(0 0 0 / 25%);
}

.table-missions__head-row .table-missions__cell--name {
  background: transparent;
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

.table-missions__cell--name {
  width: 100px;
  font-weight: 700;
}

.table-missions__cell--points,
.table-missions__cell--scu {
  width: 80px;
}

.table-missions__cell--name,
.table-missions__cell--points,
.table-missions__cell--payment,
.table-missions__cell--missions-needed,
.table-missions__cell--commodities,
.table-missions__cell--scu,
.table-missions__cell--container,
.table-missions__cell--investment,
.table-missions__cell--profit,
.table-missions__cell--profit-per-scu,
.table-missions__cell--profit-per-container,
.table-missions__cell--profit-total,
.table-missions__cell--points-per-scu,
.table-missions__cell--points-per-container {
  text-align: right;
}
</style>
