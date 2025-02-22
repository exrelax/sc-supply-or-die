<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import MissionTableOld from './MissionTableOld.vue'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const props = defineProps({
  mode: String,
})

const store = useSupplyOrDieStore()
const { salvagingMissions, miningMissions, detatrineMissions } = storeToRefs(store)

const shortNumberMode = computed({
  get() {
    return store.shortNumberMode
  },
  set(value) {
    store.setShortNumberMode(value)
  },
})
</script>

<template>
  <div class="supply-or-die__mission-tables">
    <h2>Salvage (low risk)</h2>
    <MissionTableOld :missions="salvagingMissions" :mode="props.mode" />
    <h2>Mining (low risk)</h2>
    <MissionTableOld :missions="miningMissions" :mode="props.mode" />
    <h2>Detatrine (high risk)</h2>
    <MissionTableOld :missions="detatrineMissions" :mode="props.mode" />
  </div>
</template>
