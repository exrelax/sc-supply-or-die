<script setup>
import MissionTable from "@/components/SupplyOrDie/MissionTable.vue";
import MissionTableCommodities from "@/components/SupplyOrDie/MissionTableCommodities.vue";
import SvgIcon from "@/components/helpers/SvgIcon.vue";
import { computed, ref, onMounted } from 'vue'
import { storeToRefs} from "pinia";
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'
import {
  createGroupedMissionsTableData,
  createMissionTableData,
  groupMissionsByFieldName
} from "@/utils/missions.js";

const store = useSupplyOrDieStore()
const { pyroSalvagingMissions, pyroMiningMissions, stantonSalvagingMissions, stantonMiningMissions } = storeToRefs(store)

const createHeadersTitleWithIcon = (headers) => {
  return headers.map((header, index) => {
    if (header.name === 'paymentFormatted') {
      header.title = 'Pay'
      header.component = SvgIcon
      header.componentProps = { name: 'icon/uec' }
    }

    return header
  })
}

const createMissionsWithComponents = (missions) => {
  return missions.map((mission) => {
    const commoditiesComponentProps = mission.commodities.map((commodity) => {
      return {
        scu: commodity.scu,
        nameShort: commodity.nameShort,
        name: commodity.name
      }
    })
    const commoditiesFormatted = {
      component: MissionTableCommodities,
      componentProps: {
        commodities: commoditiesComponentProps
      }
    }

    return {
      ...mission,
      commoditiesFormatted
    }
  })
}

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

const pyroSalvagingMissionsTableData = computed( () => {
  const missionsForTable = createMissionsWithComponents(pyroSalvagingMissions.value)
  const tableData = createMissionTableData(missionsForTable, fieldNames, 'type', 1)
  const headers = createHeadersTitleWithIcon(tableData.headers)

  return {
    ...tableData,
    headers
  }
})

const pyroMiningMissionsTableData = computed(() => {
  const missionsForTable = createMissionsWithComponents(pyroMiningMissions.value)
  const tableData = createMissionTableData(missionsForTable, fieldNames, 'type', 1)
  const headers = createHeadersTitleWithIcon(tableData.headers)

  return {
    ...tableData,
    headers
  }
})

const stantonTableData = computed(() => {
  const missionsForTable = createMissionsWithComponents(combinedStantonMissions.value)
  const tableData = createMissionTableData(missionsForTable, fieldNames, 'type', 1)
  const headers = createHeadersTitleWithIcon(tableData.headers)

  return {
    ...tableData,
    headers
  }
})
</script>

<template>
  <div class="sod__tutorial-low-risk-tables">
    <div class="sod__tutorial-low-risk-tables__systems">
      <div class="sod__tutorial-low-risk-tables__system sod__tutorial-low-risk-tables__system--pyro">
        <header class="sod__tutorial-low-risk-tables__system-header sod__tutorial-low-risk-tables__system-header--pyro">
          <h2>Pyro</h2>
          <p>Detatrine, Construction Materials, Recycled Material Composite, Pressurized Ice, Tin</p>
        </header>
        <div class="tutorial-table-missions--left">
          <MissionTable :table-data="pyroSalvagingMissionsTableData" class="tutorial-table-missions--pyro-salvaging"/>
          <MissionTable :table-data="pyroMiningMissionsTableData" class="tutorial-table-missions--pyro-mining"/>
        </div>
      </div>
      <div class="sod__tutorial-low-risk-tables__system sod__tutorial-low-risk-tables__system--stanton">
        <header class="sod__tutorial-low-risk-tables__system-header sod__tutorial-low-risk-tables__system-header--stanton">
          <h2>Stanton</h2>
          <p>Corundum & Copper</p>
        </header>
        <MissionTable :tableData="stantonTableData" class="tutorial-table-missions--right" />
      </div>
    </div>
    <p class="sod__tutorial-low-risk-tables__description">You don‘t need to have the mission active to acquire the materials. Salvage, mine, trade, ‘liberate’ or stockpile!</p>
  </div>
</template>

<style>
.sod__tutorial-low-risk-tables {
  --font-size-headline: 40;
  --font-size-headline-px: calc(var(--font-size-headline) * 1px);
  --font-size-headline-pc: calc(var(--font-size-headline) / var(--font-size-body) * 100%);

  --table-missions-cell-name-width: 80;
  --table-missions-cell-name-width-px: calc(var(--table-missions-cell-name-width) * 1px);

  --table-font-size: 14;
  --table-font-size-px: calc(var(--table-font-size) * 1px);
  --table-font-size-pc: calc(var(--table-font-size) / var(--font-size-body) * 100%);
  --table-line-height: 21;
  --table-line-height-px: calc(var(--table-line-height) * 1px);
  --table-line-height-scale: calc(var(--table-line-height) / var(--table-font-size));

  --table-cell-padding-horizontal: 10;
  --table-cell-padding-horizontal-px: calc(var(--table-cell-padding-horizontal) * 1px);
  --table-cell-padding-vertical: 3;
  --table-cell-padding-vertical-px: calc(var(--table-cell-padding-vertical) * 1px);

  --color-highlight: var(--color-pyro);
  --color-highlight-system: var(--color-orange);
}

.sod__tutorial-low-risk-tables .table-missions {
  table-layout: auto;
}

.sod__tutorial-low-risk-tables__system--pyro {
  --color-highlight-system: var(--color-pyro);
}

.sod__tutorial-low-risk-tables__system--stanton {
  --color-highlight-system: var(--color-stanton);
}

.sod__tutorial-low-risk-tables__system-header {
  margin-left: var(--table-missions-cell-name-width-px);
  text-align: center;
}

.sod__tutorial-low-risk-tables__system-header,
.sod__tutorial-low-risk-tables__system-header h2 {
  color: var(--color-highlight-system);
}

.sod__tutorial-low-risk-tables__system-header h2 {
  font-size: var(--font-size-headline-pc);
  line-height: 1;
  margin: calc(10 / var(--font-size-headline) * 1em) 0;
}

.sod__tutorial-low-risk-tables .table-missions__cell {
  font-size: var(--table-font-size-pc);
  line-height: var(--table-line-height-scale);
  height: calc(var(--table-line-height-px) * 2 + (2 * var(--table-cell-padding-vertical-px)));
  padding: var(--table-cell-padding-vertical-px) var(--table-cell-padding-horizontal-px);
}

.sod__tutorial-low-risk-tables .table-missions__cell abbr {
  text-decoration: none;
  cursor: help;
}

.sod__tutorial-low-risk-tables .table-missions__cell--headline {
  font-size: calc(20 / var(--font-size-body) * 100%);
  font-family: var(--font-family-iceland);
  color: var(--color-highlight-system);
  text-transform: uppercase;
  letter-spacing: .05em;
}

.sod__tutorial-low-risk-tables .table-missions__cell--head {
  color: var(--color-highlight);
}

.sod__tutorial-low-risk-tables .table-missions__cell--head .icon {
  width: 1em;
  vertical-align: text-bottom;
}

.sod__tutorial-low-risk-tables .table-missions__cell--name {
  width: var(--table-missions-cell-name-width-px);
  color: var(--color-highlight);
}

.sod__tutorial-low-risk-tables .table-missions__cell--payment {
  width: var(--table-missions-cell-name-width-px);
}

.sod__tutorial-low-risk-tables__description {
  text-align: center;
}

@media (min-width: 920px) {
  .tutorial-table-missions--left {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tutorial-table-missions--left > table {
    width: calc(50% - (var(--table-missions-cell-name-width-px) / 2) - 2px);
  }

  .tutorial-table-missions--left > table:first-child {
    width: calc(50% + (var(--table-missions-cell-name-width-px) / 2) - 2px);
  }

  .tutorial-table-missions--pyro-mining .table-missions__cell--index-0 {
    display: none;
  }
}

@media (min-width: 1200px) {
  .sod__tutorial-low-risk-tables__systems {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sod__tutorial-low-risk-tables__system--pyro {
    width: calc(66.66% + (var(--table-missions-cell-name-width-px) / 3) - 4px);
  }

  .sod__tutorial-low-risk-tables__system--stanton {
    width: calc(33.33% - (var(--table-missions-cell-name-width-px) / 3) - 4px);
  }

  .sod__tutorial-low-risk-tables__system--stanton .table-missions__cell--index-0 {
    display: none;
  }

  .sod__tutorial-low-risk-tables__system-header--stanton {
    margin-left: 0;
  }
}
</style>
