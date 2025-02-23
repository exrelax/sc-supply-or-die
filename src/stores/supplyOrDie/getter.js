import { computed } from 'vue'
import {
  getCompleteCommoditiesForMission,
  getCompletePaymentForMission,
  getScuPerMissionForMission,
  getMissionInvestmentForMission,
  getMissionProfitForMission,
  getProfitForAllNeededMissionsForMission,
  getPointsPerScuForMission,
  getPointsPerContainerByMission,
} from '@/models/Mission.ts'
import { getHighestReward } from '@/utils/rewards.ts'
import { commodities, rewards, missions, shortNumberMode } from './state.js'

export const highestReward = computed(() => {
  return getHighestReward(rewards.value)
})

export const completeMissions = computed(() => {
  return missions.value.map((mission) => {
    return {
      ...mission,
      ...getCompleteCommoditiesForMission(mission, commodities.value),
      ...getCompletePaymentForMission(mission, shortNumberMode.value),
      ...getScuPerMissionForMission(mission, commodities.value),
      ...getMissionInvestmentForMission(mission, commodities.value, shortNumberMode.value),
      ...getMissionProfitForMission(mission, commodities.value, shortNumberMode.value),
      ...getProfitForAllNeededMissionsForMission(mission, commodities.value, shortNumberMode.value),
      ...getPointsPerScuForMission(mission, commodities.value, shortNumberMode.value),
      ...getPointsPerContainerByMission(mission, commodities.value),
    }
  })
})

export const getCompleteMission = computed(() => {
  return (missionId) => {
    return completeMissions.value.find((mission) => mission.id === missionId)
  }
})

export const salvagingMissions = computed(() => {
  return completeMissions.value.filter((mission) => mission.id.indexOf('salvage') > -1)
})

export const miningMissions = computed(() => {
  return completeMissions.value.filter((mission) => mission.id.indexOf('mining') > -1)
})

export const detatrineMissions = computed(() => {
  return completeMissions.value.filter((mission) => mission.id.indexOf('detatrine') > -1)
})

export const pyroSalvagingMissions = computed(() => {
  return salvagingMissions.value.filter((mission) => mission.system.toLowerCase().indexOf('pyro') > -1)
})

export const stantonSalvagingMissions = computed(() => {
  return salvagingMissions.value.filter((mission) => mission.system.toLowerCase().indexOf('stanton') > -1)
})

export const pyroMiningMissions = computed(() => {
  return miningMissions.value.filter((mission) => mission.system.toLowerCase().indexOf('pyro') > -1)
})

export const stantonMiningMissions = computed(() => {
  return miningMissions.value.filter((mission) => mission.system.toLowerCase().indexOf('stanton') > -1)
})

