import { computed, ref } from 'vue'
import config from '@/config.js'
import { createCompleteMissionData } from '@/utils/missionData.js'

export const version = ref(config.version)

export const commodity = ref(config.commodity)

export const missionCategory = ref(config.missionCategory)

export const rewards = ref(config.rewards)

export const missions = ref(
  config.missions.map((mission) =>
    createCompleteMissionData(mission, missionCategory, rewards),
  ),
)

export const shortNumberMode = ref(true)
