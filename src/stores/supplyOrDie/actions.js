import { createCompleteMissionData } from '@/utils/missionData.js'
import { missions, missionCategory, shortNumberMode, commodity, rewards } from './state.js'

export function changeMission(missionData) {
  const missionIndex = missions.value.findIndex((item) => item.id === missionData.id)

  if (missionIndex < 0) {
    return false
  }

  const mission = createCompleteMissionData(missionData, missionCategory, rewards)

  missions.value.splice(missionIndex, 1, mission)
}

export function setShortNumberMode(value) {
  shortNumberMode.value = value
}
