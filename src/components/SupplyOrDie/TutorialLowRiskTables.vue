<script setup>
import MissionTable from "@/components/SupplyOrDie/MissionTable.vue";

import config from '@/config.js'

import { computed } from 'vue'
import { storeToRefs} from "pinia";
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'
import {
  createGroupedMissionsTableData,
  createHeadlineClassNames,
  createMissionTableData,
  groupMissionsByFieldName
} from "@/utils/missions.js";

const { missionTableFields } = config
const store = useSupplyOrDieStore()
const { pyroSalvagingMissions, pyroMiningMissions, stantonSalvagingMissions, stantonMiningMissions } = storeToRefs(store)

const combinedPyroMissions = computed(() => {
  return pyroSalvagingMissions.value.concat(pyroMiningMissions.value)
})

const combinedStantonMissions = computed(() => {
  return stantonSalvagingMissions.value.concat(stantonMiningMissions.value)
})

const fieldNames = [
  'nameShort',
  'reward.points',
  'paymentFormatted',
  'missionsNeededForHighestReward',
  'commoditiesFormatted',
]

const pyroTableData = computed(() => {
  const groupedMissions = groupMissionsByFieldName(combinedPyroMissions.value, 'nameShort')

  return createGroupedMissionsTableData(groupedMissions, fieldNames, 'type')
})

const stantonTableData = computed(() => {
  const stantonTableFieldNames = fieldNames.slice(1)
  const tableData = createMissionTableData(combinedStantonMissions.value, stantonTableFieldNames)

  return {
    ...tableData,
    headerHeadline: [
      {
        title: combinedStantonMissions.value[0].type,
        classNames: createHeadlineClassNames(),
        colspan: stantonTableFieldNames.length,
      },
    ]
  }
})
</script>

<template>
  <div class="supply-or-die__tutorial-tables">
    <div class="supply-or-die__tutorial-tables__pyro">
      <h2>Pyro</h2>
      <MissionTable :tableData="pyroTableData" />
    </div>
    <div class="supply-or-die__tutorial-tables__stanton">
      <h2>Stanton</h2>
      <MissionTable :tableData="stantonTableData" />
    </div>
  </div>
</template>

<style>
.supply-or-die__tutorial-tables {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.supply-or-die__tutorial-tables__pyro {
  width: 60%;
  overflow: hidden;
}

.supply-or-die__tutorial-tables__stanton {
  width: 33%;
}
</style>
