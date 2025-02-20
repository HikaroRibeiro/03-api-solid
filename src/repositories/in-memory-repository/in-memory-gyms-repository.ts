import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyParms, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findManyNearby(params: findManyNearbyParms): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      // console.log('A distância entre as coordenadas é: ' + distance)
      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }
    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    // Como o Prisma não aceita Undefined definir que se não houver o valor para a variável será nula.
    // No campo "id", se vier um "id" de "data" será utilizado, caso contrário gerar um novo.
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym)

    return gym
  }
}
