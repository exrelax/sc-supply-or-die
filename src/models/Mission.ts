import { Commodity, Container } from './Commodity'
import { MissionCategory } from './MissionCategory'
import { Reward } from './Reward'
import config from '@/config.js'
import {
  createFormattedNumberRange,
  numberToFormattedString,
  numberToString,
} from '@/utils/format.js'
import { getHighestRewardPoints } from '@/utils/rewards'

enum System {
  Pyro = 'Pyro',
  Stanton = 'Stanton',
}

export interface PriceRange {
  average: number,
  min: number,
  max: number,
}

interface ConfigMissionCommodity {
  commodity_id: string,
  scu: number,
}

interface MissionCommodity extends ConfigMissionCommodity, Commodity {}

export interface CompleteMissionCommodity extends MissionCommodity {
  averagePrice: number,
  containers: Container[],
  maxPrice: number,
  minPrice: number,
}

interface MissionReward {
  payment: number,
  points: number,
}

interface ConfigMission {
  id: string,
  name: string,
  nameShort: string,
  missionCategory_id: string,
  system: System,
  commodities: ConfigMissionCommodity[],
  reward: MissionReward,
}

export interface Mission extends ConfigMission {
  missionsNeededForHighestReward: number,
  missionCategory: MissionCategory,
}

export interface CompleteMission extends Mission {
  commodities: CompleteMissionCommodity[],
  commoditiesFormatted: string,
  containerCount: number,
  minContainerCount: number,
  investment: PriceRange,
  investmentFormatted: string,
  paymentFormatted: string,
  pointsPerContainer: number,
  pointsPerScu: number,
  pointsPerScuFormatted: string,
  profit: PriceRange,
  profitAllNeededMissions: PriceRange,
  profitAllNeededMissionsFormatted: string,
  profitFormatted: string,
  profitPerContainerFormatted: string,
  profitPerScuFormatted: string,
  scuPerMission: number,
  scuPerMissionFormatted: string,
}

export const createStateMission = (configMission: ConfigMission, missionCategories: MissionCategory[], rewards: Reward[]): Mission => {
  const foundCategory = missionCategories.find(
    (category) => category.id === configMission.missionCategory_id,
  )
  const highestRewardPoints = getHighestRewardPoints(rewards)
  const missionsNeededForHighestReward = Math.ceil(highestRewardPoints / configMission.reward.points)

  return {
    ...configMission,
    missionCategory: foundCategory,
    missionsNeededForHighestReward,
  }
}

export const getContainerSizes = (scuValue: number): Container[] => {
  const { scuContainerSizes } = config
  const sizesDescending = [...scuContainerSizes].sort((a, b) => b - a)

  let remainder = scuValue
  const result = [] as Container[]

  for (const size of sizesDescending) {
    if (remainder >= size) {
      const count = Math.floor(remainder / size)
      result.push({ size, count } as Container)
      remainder -= count * size
    }
  }

  return result
}

const getContainerCountForMissionCommodities = (completeMissionCommodities: CompleteMissionCommodity[]): number => {
  return completeMissionCommodities.reduce((containerForMission, commodity) => {
    const commodityContainers = commodity.containers.reduce((acc, container) => {
      return acc + container.count
    }, 0)

    return containerForMission + commodityContainers
  }, 0)
}


const isCompleteMissionCommoditiesArray = (commodities: any[]): commodities is CompleteMissionCommodity[] => {
  if (commodities == null || !Array.isArray(commodities)) {
    return false
  }

  return commodities.reduce((result: boolean, entry) => {
    if (result === false) {
      return false
    }

    return (
      entry.commodity_id != null &&
      entry.containers != null &&
      entry.minPrice != null &&
      entry.maxPrice != null &&
      entry.averagePrice != null
    )
  }, null)
}

const useCompleteCommodities = (missionCommodities: ConfigMissionCommodity[]|CompleteMissionCommodity[], commodities: Commodity[]) => {
  return isCompleteMissionCommoditiesArray(missionCommodities)
    ? missionCommodities
    : createCompleteMissionCommodities(missionCommodities, commodities)
}

const createCompleteMissionCommodities = (missionCommodities: ConfigMissionCommodity[], commodities: Commodity[]): CompleteMissionCommodity[] => {
  return missionCommodities.map((singleCommodity) => {
    const foundCommodity = commodities.find((item) => item.id === singleCommodity.commodity_id)
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

export const getCompleteCommoditiesForMission = (mission: Mission|CompleteMission, commodities: Commodity[]) => {
  const completeMissionCommodities = useCompleteCommodities(mission.commodities, commodities)
  const containerCount = getContainerCountForMissionCommodities(completeMissionCommodities)
  const commoditiesFormatted = completeMissionCommodities
    .map((item) => {
      return `${numberToFormattedString(item.scu)} ${item.nameShort}`
    })
    .join(' + ')

  const minContainerCount = completeMissionCommodities.reduce((containerForMission: number, completeMissionCommodity: CompleteMissionCommodity) => {
    const commodityContainers = completeMissionCommodity.containers.reduce((acc, container) => {
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

export const getCompletePaymentForMission = (mission: Mission|CompleteMission, shortNumberMode: boolean) => {
  const paymentFormatted = numberToString(mission.reward.payment, shortNumberMode)

  return {
    paymentFormatted,
  }
}

export const getMissionInvestmentForMission = (mission: Mission|CompleteMission, commodities: Commodity[], shortNumberMode: boolean) => {
  const completeMissionCommodities: CompleteMissionCommodity[] = useCompleteCommodities(mission.commodities, commodities)
  const investment: PriceRange = completeMissionCommodities.reduce(
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
  const investmentFormatted: string = createFormattedNumberRange(
    investment.min,
    investment.max,
    shortNumberMode,
  )

  return {
    investment,
    investmentFormatted,
  }
}

export const getScuPerMissionForMission = (mission: Mission|CompleteMission, commodities: Commodity[]) => {
  const completeMissionCommodities: CompleteMissionCommodity[] = useCompleteCommodities(mission.commodities, commodities)
  const scuPerMission: number = completeMissionCommodities.reduce((accumulator, item) => {
    if (item.scu != null && typeof item.scu === 'number' && !isNaN(item.scu)) {
      accumulator = accumulator + item.scu
    }

    return accumulator
  }, 0)
  const scuPerMissionFormatted: string = numberToFormattedString(scuPerMission)

  return {
    scuPerMission,
    scuPerMissionFormatted,
  }
}

export const getMissionProfitForMission = (mission: Mission|CompleteMission, commodities: Commodity[], shortNumberMode: boolean) => {
  const { scuPerMission } = getScuPerMissionForMission(mission, commodities)
  const { investment } = getMissionInvestmentForMission(mission, commodities, shortNumberMode)
  const completeMissionCommodities: CompleteMissionCommodity[] = useCompleteCommodities(mission.commodities, commodities)

  const containerCount = getContainerCountForMissionCommodities(completeMissionCommodities)

  const profit : PriceRange = {
    min: mission.reward.payment - investment.max,
    max: mission.reward.payment - investment.min,
    average: mission.reward.payment - investment.average,
  }

  const profitPerScu: PriceRange = {
    min: Math.round(profit.min / scuPerMission),
    max: Math.round(profit.max / scuPerMission),
    average: Math.round(profit.average / scuPerMission),
  }
  const profitPerContainer: PriceRange = {
    min: Math.round(profit.min / containerCount),
    max: Math.round(profit.max / containerCount),
    average: Math.round(profit.average / containerCount),
  }
  const profitFormatted: string = createFormattedNumberRange(profit.min, profit.max, shortNumberMode)
  const profitPerScuFormatted: string = createFormattedNumberRange(
    profitPerScu.min,
    profitPerScu.max,
    shortNumberMode,
  )
  const profitPerContainerFormatted: string = createFormattedNumberRange(
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

export const getProfitForAllNeededMissionsForMission = (
  mission: Mission|CompleteMission,
  commodities: Commodity[],
  shortNumberMode: boolean,
) => {
  const { profit } = getMissionProfitForMission(mission, commodities, shortNumberMode)
  const profitAllNeededMissions: PriceRange = {
    min: profit.min * mission.missionsNeededForHighestReward,
    max: profit.max * mission.missionsNeededForHighestReward,
    average: profit.average * mission.missionsNeededForHighestReward,
  }
  const profitAllNeededMissionsFormatted: string = createFormattedNumberRange(
    profitAllNeededMissions.min,
    profitAllNeededMissions.max,
    shortNumberMode,
  )

  return {
    profitAllNeededMissions,
    profitAllNeededMissionsFormatted,
  }
}

export const getPointsPerScuForMission = (
  mission: Mission|CompleteMission,
  commodities: Commodity[],
  shortNumberMode: boolean,
) => {
  const { scuPerMission } = getScuPerMissionForMission(mission, commodities)
  const points = mission.reward.points
  const pointsPerScu = points / scuPerMission
  const pointsPerScuRound = Math.round(pointsPerScu * 100) / 100
  const pointsPerScuFormatted: string = numberToString(pointsPerScuRound, shortNumberMode)

  return {
    pointsPerScu,
    pointsPerScuFormatted,
  }
}

export const getPointsPerContainerByMission = (
  mission: Mission|CompleteMission,
  commodities: Commodity[]
) => {
  const completeMissionCommodities: CompleteMissionCommodity[] = useCompleteCommodities(mission.commodities, commodities)
  const containerCount: number = getContainerCountForMissionCommodities(completeMissionCommodities)
  const pointsPerContainer: number = Math.round((mission.reward.points / containerCount) * 100) / 100

  return { pointsPerContainer }
}

export const createCompleteMissionData = (
  mission: Mission,
  commodities: Commodity[],
  shortNumberMode: boolean
): any => {
  return {
    ...mission,
    ...getCompleteCommoditiesForMission(mission, commodities),
    ...getCompletePaymentForMission(mission, shortNumberMode),
    ...getScuPerMissionForMission(mission, commodities),
    ...getMissionInvestmentForMission(mission, commodities, shortNumberMode),
    ...getMissionProfitForMission(mission, commodities, shortNumberMode),
    ...getProfitForAllNeededMissionsForMission(mission, commodities, shortNumberMode),
    ...getPointsPerScuForMission(mission, commodities, shortNumberMode),
    ...getPointsPerContainerByMission(mission, commodities),
  }
}
