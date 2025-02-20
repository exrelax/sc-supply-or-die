<template>
  <div>
    <DefaultLayout>
      <header>
        <h1>Supply or Die</h1>
      </header>
      <Summary />
      <label>
        Use rounded numbers
        <input type="checkbox" v-model="shortNumberMode" />
      </label>
      <h2>Salvage (low risk)</h2>
      <MissionTable :missions="salvagingMissions" />
      <h2>Mining (low risk)</h2>
      <MissionTable :missions="miningMissions" />
      <h2>Detatrine (high risk)</h2>
      <MissionTable :missions="detatrineMissions" />
    </DefaultLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/Default.vue'
import Summary from './Summary.vue'
import MissionTable from './MissionTable.vue'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const store = useSupplyOrDieStore()
const { missions } = storeToRefs(store)

const shortNumberMode = computed({
  get() {
    return store.shortNumberMode
  },
  set(value) {
    store.setShortNumberMode(value)
  },
})

const salvagingMissions = computed(() => {
  return missions.value.filter((mission) => {
    return mission.id.indexOf('salvage') > -1
  })
})

const miningMissions = computed(() => {
  return missions.value.filter((mission) => {
    return mission.id.indexOf('mining') > -1
  })
})

const detatrineMissions = computed(() => {
  return missions.value.filter((mission) => {
    return mission.id.indexOf('detatrine') > -1
  })
})
</script>

<style>
h1 {
  font-family: var(--font-family-fancy);
  font-size: 300%;
  color: var(--color-yellow-neon);
}
</style>
