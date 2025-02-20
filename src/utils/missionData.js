import config from '@/config.js'
import {
  createFormattedNumberRange,
  numberToFormattedString,
  numberToString,
} from '@/utils/format.js'

const isCompleteCommoditiesArray = (commodities) => {
  if (commodities == null || !Array.isArray(commodities)) {
    return false
  }

  return commodities.reduce((result, entry) => {
    if (result === false) {
      return false
    }

    return entry.commodity_id != null &&
      entry.containers != null &&
      entry.minPrice != null &&
      entry.maxPrice != null &&
      entry.averagePrice != null
  }, null)
}

const useCompleteCommodities = (missionCommodities, commodity) => {
  return isCompleteCommoditiesArray(missionCommodities) ?
    missionCommodities : createCommodities(missionCommodities, commodity)
}

const createCommodities = (missionCommodities, commodity) => {
  return missionCommodities.map((singleCommodity) => {
    const foundCommodity = commodity.find((item) => item.id === singleCommodity.commodity_id)
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
}

const getContainerCountByMission = (commodities) => {
  return commodities.reduce((containerForMission, commodity) => {
    const commodityContainers = commodity.containers.reduce((acc, container) => {
      return acc + container.count
    }, 0)

    return containerForMission + commodityContainers
  }, 0)
}

export const createCompleteMissionData = (mission, missionCategory, rewards) => {
  const foundCategory = missionCategory.value.find(
    (category) => category.id === mission.missionCategory_id,
  )
  const highestRewardPoints = getHighestRewardPoints(rewards.value)
  const missionsNeededForHighestReward = Math.ceil(highestRewardPoints / mission.reward.points)

  return {
    ...mission,
    missionCategory: foundCategory,
    missionsNeededForHighestReward,
  }
}

export const getCommoditiesForMissionByMission = (mission, commodity) => {
  const commodities = useCompleteCommodities(mission.commodities, commodity)
  const containerCount = getContainerCountByMission(commodities)
  const commoditiesFormatted = commodities
    .map((item) => {
      return `${numberToFormattedString(item.scu)} ${item.nameShort}`
    })
    .join(' + ')

  const minContainerCount = commodities.reduce((containerForMission, commodity) => {
    const commodityContainers = commodity.containers.reduce((acc, container) => {
      return acc + container.count
    }, 0)

    return containerForMission + commodityContainers
  }, 0)

  return {
    commodities,
    commoditiesFormatted,
    minContainerCount,
    containerCount,
  }
}

export const getContainerSizes = (value) => {
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

export const getHighestReward = (rewards) => {
  return rewards.reduce((prev, current) => {
    return prev.points > current.points ? prev : current
  })
}

export const getHighestRewardPoints = (rewards) => {
  const highestReward = getHighestReward(rewards)

  return highestReward.points
}

export const getPaymentByMission = (mission, shortNumberMode) => {
  const paymentFormatted = numberToString(mission.reward.payment, shortNumberMode)

  return {
    paymentFormatted,
  }
}

export const getScuPerMissionByMission = (mission, commodity) => {
  const commodities = useCompleteCommodities(mission.commodities, commodity)
  const scuPerMission = commodities.reduce((accumulator, item) => {
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

export const getMissionsNeededForHighestRewardCount = (mission, rewards) => {
  const highestRewardPoints = getHighestRewardPoints(rewards)

  return Math.ceil(highestRewardPoints / mission.reward.points)
}

export const getMissionInvestmentByMission = (mission, commodity, shortNumberMode) => {
  const commodities = useCompleteCommodities(mission.commodities, commodity)
  const investment = commodities.reduce(
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

export const getMissionProfitByMission = (mission, commodity, shortNumberMode) => {
  const { scuPerMission } = getScuPerMissionByMission(mission, commodity)
  const { investment } = getMissionInvestmentByMission(mission, commodity, shortNumberMode)
  const commodities = useCompleteCommodities(mission.commodities, commodity)

  const containerCount = getContainerCountByMission(commodities)

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

export const getProfitForAllNeededMissionsByMission = (
  mission,
  missionsNeededForHighestReward,
  commodity,
  shortNumberMode,
) => {
  const { profit } = getMissionProfitByMission(mission, commodity, shortNumberMode)
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

export const getPointsPerScuForMissionByMission = (mission, commodity, shortNumberMode) => {
  const { scuPerMission } = getScuPerMissionByMission(mission, commodity)
  const points = mission.reward.points
  const pointsPerScu = points / scuPerMission
  const pointsPerScuRound = Math.round(pointsPerScu * 100) / 100
  const pointsPerScuFormatted = numberToString(pointsPerScuRound, shortNumberMode)

  return {
    pointsPerScu,
    pointsPerScuFormatted,
  }
}

export const getPointsPerContainerByMission = (mission, commodity) => {
  const commodities = useCompleteCommodities(mission.commodities, commodity)
  const containerCount = getContainerCountByMission(commodities)
  const pointsPerContainer = Math.round((mission.reward.points / containerCount) * 100) / 100

  return { pointsPerContainer }
}
