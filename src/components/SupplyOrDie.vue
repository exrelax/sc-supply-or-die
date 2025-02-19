<template>
  <div>
    <DefaultLayout>
      <header>
        <h1>Supply or Die</h1>
      </header>
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
      <p>
        Special thanks to
        <a href="https://www.youtube.com/MrKraken" title="YouTube">MrKraken</a>
        for the
        <a
          href="https://robertsspaceindustries.com/community-hub/post/supply-or-die-one-page-guide-wQFyeQ03XmuZm"
          title="Star Citizen Community Hub"
        >infographic on the SC Community Hub</a
        >!
      </p>
    </DefaultLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/Default.vue'
import MissionTable from '@/components/MissionTable.vue'
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
