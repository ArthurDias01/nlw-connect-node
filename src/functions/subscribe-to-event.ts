import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEventsParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  email,
  name,
}: SubscribeToEventsParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
