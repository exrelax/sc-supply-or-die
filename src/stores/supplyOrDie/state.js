import { computed, ref } from 'vue'
import config from '@/config.js'
import { createStateMission } from '@/models/Mission.ts'

export const version = ref(config.version)

export const commodities = ref(config.commodities)

export const missionCategories = ref(config.missionCategories)

export const rewards = ref(config.rewards)

export const missions = ref(
  config.missions.map((mission) => createStateMission(mission, missionCategories.value, rewards.value)),
)

export const shortNumberMode = ref(true)
