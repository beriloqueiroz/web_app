import { notificationsRepo } from '@/helpers/notification-repo'
import { Notification } from '@/helpers/types'
import { validCityState, validateEmail } from '@/helpers/util'
import { error } from 'console'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  const cityState = searchParams.get('city')
  if (!email || email?.length <= 5) throw error("email inválido")
  if (!validateEmail(email)) {
    throw error("email inválido")
  }
  if (!cityState || cityState?.length <= 6) throw error("cidade inválida")
  if (!validCityState(cityState)) {
    throw error("cidade inválida")
  }
  const state = cityState.split(" - ")[1]
  const city = cityState.split(" - ")[0]
  let notification: Notification | undefined = await notificationsRepo.getByEmailAndCity(email, city, state)
  return Response.json({ notification })
}

export async function POST(request: Request) {
  const res: any[] = await request.json()
  try {
    const notis: Notification[] = res.map(r => {
      return {
        ScheduleNotification: {
          ID: r.ScheduleNotification.ID
        },
        ID: r.ID,
        Message: JSON.parse(r.Message),
        User: r.User
      }
    })
    notificationsRepo.saveAll(notis)
    return Response.json({ res })
  } catch (error) {
    throw error
  }
}