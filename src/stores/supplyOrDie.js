import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import config from '../config.js'

const numberToFormattedString = (num) => {
  return num.toLocaleString('en-US')
}

const numberToFormattedShortString = (num) => {
  let prefix = ''

  if (num >= 1000000) {
    prefix = 'm'
    num = Math.round((num / 1000000) * 100) / 100
  } else if (num >= 1000) {
    prefix = 'k'
    num = Math.round((num / 1000) * 100) / 100
  }

  return `${numberToFormattedString(num)}${prefix}`
}

const numberToString = (num, shortMode = true) => {
  const formatFn = shortMode ? numberToFormattedShortString : numberToFormattedString

  return formatFn(num)
}

const createFormattedNumberRange = (min, max, shortMode = true) => {
  return min === max
    ? numberToString(min, shortMode)
    : `${numberToString(min, shortMode)} – ${numberToString(max, shortMode)}`
}

const getContainerSizes = (value) => {
  const { scuContainerSizes } = config
  const sizesDescending = [...scuContainerSizes].sort((a, b) => b - a)

  let remainder = value
  const result = []

  for (const size of sizesDescending) {
    if (remainder >= size) {
      const count = Math.floor(remainder / size)
      result.push({ size, count })
      remainder -= count * size
    }
  }

  return result
}

const getHighestReward = (rewards) => {
  return rewards.reduce((prev, current) => {
    return prev.points > current.points ? prev : current
  })
}

const getHighestRewardPoints = (rewards) => {
  const highestReward = getHighestReward(rewards)

  return highestReward.points
}

const createCompleteMissionData = (mission, missionCategory, commodity, rewards) => {
  const foundCategory = missionCategory.value.find(
    (category) => category.id === mission.missionCategory_id,
  )
  const commodities = mission.commodities.map((singleCommodity) => {
    const foundCommodity = commodity.value.find((item) => item.id === singleCommodity.commodity_id)

    const combinedCommodity = { ...singleCommodity, ...foundCommodity }
    const containers = getContainerSizes(singleCommodity.scu)

    const minPrice = combinedCommodity.priceRangePerScu.min * combinedCommodity.scu
    const maxPrice = combinedCommodity.priceRangePerScu.max * combinedCommodity.scu
    const averagePrice = (minPrice + maxPrice) / 2

    return {
      ...combinedCommodity,
      containers,
      minPrice,
      maxPrice,
      averagePrice,
    }
  })
  const minContainerCount = commodities.reduce((containerForMission, commodity) => {
    const commodityContainers = commodity.containers.reduce((acc, container) => {
      return acc + container.count
    }, 0)

    return containerForMission + commodityContainers
  }, 0)
  const highestRewardPoints = getHighestRewardPoints(rewards.value)
  const commoditiesFormatted = commodities
    .map((item) => {
      return `${numberToFormattedString(item.scu)} ${item.nameShort}`
    })
    .join(' + ')
  const missionsNeededForHighestReward = Math.ceil(highestRewardPoints / mission.reward.points)

  return {
    ...mission,
    missionCategory: foundCategory,
    commodities,
    commoditiesFormatted,
    minContainerCount,
    missionsNeededForHighestReward,
  }
}

const getPaymentByMission = (mission, shortNumberMode) => {
  const paymentFormatted = numberToString(mission.reward.payment, shortNumberMode)

  return {
    paymentFormatted,
  }
}

const getScuPerMissionByMission = (mission) => {
  const scuPerMission = mission.commodities.reduce((accumulator, item) => {
    if (item.scu != null && typeof item.scu === 'number' && !isNaN(item.scu)) {
      accumulator = accumulator + item.scu
    }

    return accumulator
  }, 0)
  const scuPerMissionFormatted = numberToFormattedString(scuPerMission)

  return {
    scuPerMission,
    scuPerMissionFormatted,
  }
}

const getMissionsNeededForHighestRewardCount = (mission, rewards) => {
  const highestRewardPoints = getHighestRewardPoints(rewards)

  return Math.ceil(highestRewardPoints / mission.reward.points)
}

const getMissionInvestmentByMission = (mission, shortNumberMode) => {
  const investment = mission.commodities.reduce(
    (accumulator, singleCommodity) => {
      accumulator.min = accumulator.min + singleCommodity.minPrice
      accumulator.max = accumulator.max + singleCommodity.maxPrice
      accumulator.average = accumulator.average + singleCommodity.averagePrice

      return accumulator
    },
    {
      min: 0,
      max: 0,
      average: 0,
    },
  )
  const investmentFormatted = createFormattedNumberRange(
    investment.min,
    investment.max,
    shortNumberMode,
  )

  return {
    investment,
    investmentFormatted,
  }
}

const getMissionProfitByMission = (mission, shortNumberMode) => {
  const { scuPerMission } = getScuPerMissionByMission(mission)
  const { investment } = getMissionInvestmentByMission(mission)
  const containerCount = getContainerCountByMission(mission)
  const profit = {
    min: mission.reward.payment - investment.max,
    max: mission.reward.payment - investment.min,
    average: mission.reward.payment - investment.average,
  }

  const profitPerScu = {
    min: Math.round(profit.min / scuPerMission),
    max: Math.round(profit.max / scuPerMission),
    average: Math.round(profit.average / scuPerMission),
  }
  const profitPerContainer = {
    min: Math.round(profit.min / containerCount),
    max: Math.round(profit.max / containerCount),
    average: Math.round(profit.average / containerCount),
  }
  const profitFormatted = createFormattedNumberRange(profit.min, profit.max, shortNumberMode)
  const profitPerScuFormatted = createFormattedNumberRange(
    profitPerScu.min,
    profitPerScu.max,
    shortNumberMode,
  )
  const profitPerContainerFormatted = createFormattedNumberRange(
    profitPerContainer.min,
    profitPerContainer.max,
    shortNumberMode,
  )

  return {
    profit,
    profitFormatted,
    profitPerScuFormatted,
    profitPerContainerFormatted,
  }
}

const getProfitForAllNeededMissionsByMission = (
  mission,
  missionsNeededForHighestReward,
  shortNumberMode,
) => {
  const { profit } = getMissionProfitByMission(mission)
  const profitAllNeededMissions = {
    min: profit.min * missionsNeededForHighestReward,
    max: profit.max * missionsNeededForHighestReward,
    average: profit.average * missionsNeededForHighestReward,
  }
  const profitAllNeededMissionsFormatted = createFormattedNumberRange(
    profitAllNeededMissions.min,
    profitAllNeededMissions.max,
    shortNumberMode,
  )

  return {
    profitAllNeededMissions,
    profitAllNeededMissionsFormatted,
  }
}

const getPointsPerScuForMissionByMission = (mission, shortNumberMode) => {
  const { scuPerMission } = getScuPerMissionByMission(mission)
  const points = mission.reward.points
  const pointsPerScu = points / scuPerMission
  const pointsPerScuRound = Math.round(pointsPerScu * 100) / 100
  const pointsPerScuFormatted = numberToString(pointsPerScuRound, shortNumberMode)

  return {
    pointsPerScu,
    pointsPerScuFormatted,
  }
}

const getContainerCountByMission = (mission) => {
  return mission.commodities.reduce((containerForMission, commodity) => {
    const commodityContainers = commodity.containers.reduce((acc, container) => {
      return acc + container.count
    }, 0)

    return containerForMission + commodityContainers
  }, 0)
}

const getPointsPerContainerByMission = (mission) => {
  const containerCount = getContainerCountByMission(mission)
  const pointsPerContainer = Math.round((mission.reward.points / containerCount) * 100) / 100

  return { pointsPerContainer }
}

export const useSupplyOrDieStore = defineStore('supply-or-die', () => {
  const commodity = ref(config.commodity)
  const missionCategory = ref(config.missionCategory)
  const rewards = ref(config.rewards)
  const missions = ref(
    config.missions.map((mission) =>
      createCompleteMissionData(mission, missionCategory, commodity, rewards),
    ),
  )
  const shortNumberMode = ref(true)

  const highestReward = computed(() => {
    return getHighestReward(rewards.value)
  })

  const getMissionPayment = computed(() => {
    return (mission) => {
      return getPaymentByMission(mission, shortNumberMode.value)
    }
  })

  const getScuPerMission = computed(() => {
    return (mission) => {
      return getScuPerMissionByMission(mission)
    }
  })

  const getMissionInvestment = computed(() => {
    return (mission) => {
      return getMissionInvestmentByMission(mission, shortNumberMode.value)
    }
  })

  const getMissionProfit = computed(() => {
    return (mission) => {
      return getMissionProfitByMission(mission, shortNumberMode.value)
    }
  })

  const getProfitForAllNeededMissions = computed(() => {
    return (mission) => {
      const highestRewardPoints = getHighestRewardPoints(rewards.value)
      const missionsNeededForHighestReward = Math.ceil(highestRewardPoints / mission.reward.points)

      return getProfitForAllNeededMissionsByMission(
        mission,
        missionsNeededForHighestReward,
        shortNumberMode.value,
      )
    }
  })

  const getPointsPerScuForMission = computed(() => {
    return (mission) => {
      return getPointsPerScuForMissionByMission(mission, shortNumberMode.value)
    }
  })

  const getPointsPerContainerForMission = computed(() => {
    return (mission) => {
      return getPointsPerContainerByMission(mission)
    }
  })

  function changeMission(missionData) {
    const missionIndex = missions.findIndex((item) => item.id === missionData.id)

    if (missionIndex < 0) {
      return false
    }

    const mission = createCompleteMissionData(missionData, missionCategory, commodity, rewards)

    missions.splice(missionIndex, 1, mission)
  }

  function setShortNumberMode(value) {
    shortNumberMode.value = value
  }

  return {
    commodity,
    missions,
    missionCategory,
    rewards,
    shortNumberMode,
    highestReward,
    getMissionPayment,
    getScuPerMission,
    getMissionInvestment,
    getMissionProfit,
    getProfitForAllNeededMissions,
    getPointsPerScuForMission,
    getPointsPerContainerForMission,
    changeMission,
    setShortNumberMode,
  }
})
