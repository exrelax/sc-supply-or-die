import { Reward } from '@/models/Reward';

export const getHighestReward = (rewards: Reward[]) => {
  return rewards.reduce((prev, current) => {
    return prev.points > current.points ? prev : current
  })
}

export const getHighestRewardPoints = (rewards: Reward[]) => {
  const highestReward = getHighestReward(rewards)

  return highestReward.points
}
