import { computed } from 'vue'
import {
  getCommoditiesForMissionByMission,
  getHighestReward,
  getHighestRewardPoints,
  getMissionInvestmentByMission,
  getMissionProfitByMission,
  getPaymentByMission,
  getPointsPerContainerByMission,
  getPointsPerScuForMissionByMission,
  getProfitForAllNeededMissionsByMission,
  getScuPerMissionByMission,
} from '@/utils/missionData.js'
import { commodity, rewards, missions, shortNumberMode } from './state.js'

export const highestReward = computed(() => {
  return getHighestReward(rewards.value)
})

export const completeMissions = computed(() => {
  return missions.value.map((mission) => {
    return {
      ...mission,
      ...getCommoditiesForMission.value(mission),
      ...getMissionPayment.value(mission),
      ...getScuPerMission.value(mission),
      ...getMissionInvestment.value(mission),
      ...getMissionProfit.value(mission),
      ...getProfitForAllNeededMissions.value(mission),
      ...getPointsPerScuForMission.value(mission),
      ...getPointsPerContainerForMission.value(mission),
    }
  })
})

export const getCompleteMission = computed(() => {
  return (missionId) => {
    return completeMissions.value.find((mission) => mission.id === missionId)
  }
})

export const getCommoditiesForMission = computed(() => {
  return (mission) => {
    return getCommoditiesForMissionByMission(mission, commodity.value)
  }
})

export const getMissionPayment = computed(() => {
  return (mission) => {
    return getPaymentByMission(mission, shortNumberMode.value)
  }
})

export const getScuPerMission = computed(() => {
  return (mission) => {
    return getScuPerMissionByMission(mission, commodity.value)
  }
})

export const getMissionInvestment = computed(() => {
  return (mission) => {
    return getMissionInvestmentByMission(mission, commodity.value, shortNumberMode.value)
  }
})

export const getMissionProfit = computed(() => {
  return (mission) => {
    return getMissionProfitByMission(mission, commodity.value, shortNumberMode.value)
  }
})

export const getProfitForAllNeededMissions = computed(() => {
  return (mission) => {
    const highestRewardPoints = getHighestRewardPoints(rewards.value)
    const missionsNeededForHighestReward = Math.ceil(highestRewardPoints / mission.reward.points)

    return getProfitForAllNeededMissionsByMission(
      mission,
      missionsNeededForHighestReward,
      commodity.value,
      shortNumberMode.value,
    )
  }
})

export const getPointsPerScuForMission = computed(() => {
  return (mission) => {
    return getPointsPerScuForMissionByMission(mission, commodity.value, shortNumberMode.value)
  }
})

export const getPointsPerContainerForMission = computed(() => {
  return (mission) => {
    return getPointsPerContainerByMission(mission, commodity.value)
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

export const groupedMissions = computed(() => {
  return (missions) => {

  }
})
