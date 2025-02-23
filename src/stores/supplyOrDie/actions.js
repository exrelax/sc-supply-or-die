import { createStateMission } from '@/models/Mission.ts'
import { missions, missionCategories, shortNumberMode, commodities, rewards } from './state.js'

export function changeMission(missionData) {
  const missionIndex = missions.value.findIndex((item) => item.id === missionData.id)

  if (missionIndex < 0) {
    return false
  }

  const mission = createStateMission(missionData, missionCategories.value, rewards.value)

  missions.value.splice(missionIndex, 1, mission)
}

export function setShortNumberMode(value) {
  shortNumberMode.value = value
}
