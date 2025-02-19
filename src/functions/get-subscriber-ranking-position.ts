import { redis } from '../redis/client'

interface GetSubscriberRankingPositionsParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionsParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return {
      position: null,
    }
  }

  return {
    position: rank + 1,
  }
}
