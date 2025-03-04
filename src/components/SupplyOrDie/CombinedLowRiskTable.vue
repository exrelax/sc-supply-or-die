<script setup>
import MissionTable from '@/components/SupplyOrDie/MissionTable.vue'

import config from '@/config.js'
import { groupMissionsByFieldName, createGroupedMissionsTableData } from '@/utils/missions.js'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const { missionTableFields } = config
const store = useSupplyOrDieStore()
const {
  pyroSalvagingMissions,
  pyroMiningMissions,
  stantonSalvagingMissions,
  stantonMiningMissions,
} = storeToRefs(store)

const combinedPyroMissions = computed(() => {
  return pyroSalvagingMissions.value.concat(pyroMiningMissions.value)
})

const fieldNames = [
  'nameShort',
  'reward.points',
  'paymentFormatted',
  'missionsNeededForHighestReward',
  'commoditiesFormatted',
]

const tableData = computed(() => {
  const groupedMissions = groupMissionsByFieldName(combinedPyroMissions.value, 'nameShort')

  return createGroupedMissionsTableData(groupedMissions, fieldNames)
})
</script>

<template>
  <div class="supply-or-die__low-risk">
    <header>
      <h2>Low Risk</h2>
      <p>Salvage, Mine, Trade or ‘Liberate’ Resources</p>
    </header>
    <div>
      <MissionTable :table-data="tableData" />
    </div>
  </div>
</template>

<style>
.supply-or-die__low-risk {
  display: flex;
  justify-content: space-between;
}
</style>
