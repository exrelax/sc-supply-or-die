<script setup>
import MissionTable from "@/components/SupplyOrDie/MissionTable.vue";

import config from '@/config.js'

import { computed } from 'vue'
import { storeToRefs} from "pinia";
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const { missionTableFields } = config
const store = useSupplyOrDieStore()
const { salvagingMissions, miningMissions } = storeToRefs(store)

const combinedMissions = computed(() => {
  return salvagingMissions.value.concat(miningMissions.value)
})

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const groupMissions = (missions, fieldName) => {
  return missions.reduce((accumulator, mission) => {
    const searchValue = mission[fieldName]
    const foundGroup = accumulator.find((group) => group.title === searchValue)

    if (foundGroup) {
      foundGroup.missions.push(mission)
    } else {
      accumulator.push({
        title: searchValue,
        missions: [mission],
      })
    }

    return accumulator
  }, [])
}

const cellClassName = 'table-missions__cell'
const gapClassName = `${cellClassName}--gap`
const fields = [
  'nameShort',
  'reward.points',
  'paymentFormatted',
  'missionsNeededForHighestReward',
  'commoditiesFormatted',
]

const createMissionsTableData = (groupedMissions) => {
  const fieldConfig = fields.map((fieldName) => {
    const missionTableField = missionTableFields.find((field) => field.name === fieldName)
    const classNames = [cellClassName, `${cellClassName}--${missionTableField.classSuffix}`]
    const headClassNames = classNames.concat(`${cellClassName}--head`)

    return {
      ...missionTableField,
      classNames,
      headClassNames,
    }
  })
  const headers = [fieldConfig[0]]

  const rows = groupedMissions.map((group, rowIndex) => {
    const cells = [{
      title: group.title,
      classNames: headers[0].classNames,
    }]

    group.missions.forEach((mission, missionIndex) => {
      fieldConfig.forEach((singleFieldConfig, cellIndex) => {
        if (cellIndex === 0) {
          return
        }

        const title = singleFieldConfig.name.indexOf('.') > -1 ?
          getNestedValue(mission, singleFieldConfig.name) : mission[singleFieldConfig.name]
        const missionClassName = `${cellClassName}--mission-${missionIndex}`
        const classNames = singleFieldConfig.classNames.concat([missionClassName])
        const headClassNames = singleFieldConfig.headClassNames.concat([missionClassName])

        if (missionIndex > 0 && cellIndex === 1) {
          classNames.push(gapClassName)
          headClassNames.push(gapClassName)
        }

        if (rowIndex === 0) {
          headers.push({
            ...singleFieldConfig,
            headClassNames,
          })
        }

        cells.push({
          title,
          classNames,
        })
      })
    })

    return cells
  })

  return {
    headers,
    rows,
  }
}

const tableData = computed(() => {
  const groupedMissions = groupMissions(combinedMissions.value, 'nameShort')

  return createMissionsTableData(groupedMissions)
})
</script>

<template>
  <div class="supply-or-die__low-risk">
    <header>
      <h2>Low Risk</h2>
      <p>Salvage, Mine, Trade or ‘Liberate’ Resources</p>
    </header>
    <div>
      <MissionTable :table-data="tableData"/>
    </div>
  </div>
</template>

<style>
.supply-or-die__low-risk {
  display: flex;
  justify-content: space-between;
}
</style>
