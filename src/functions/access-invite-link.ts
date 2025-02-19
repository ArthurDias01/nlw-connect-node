import { redis } from '../redis/client'

interface AcessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AcessInviteLinkParams) {
  await redis.hincrby('referal:access-count', subscriberId, 1)
}
