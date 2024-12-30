/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms.', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The first gym',
      phone: null,
      latitude: -22.5019303,
      longitude: -44.105728,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'The first gym',
      phone: null,
      latitude: -22.885323789047483,
      longitude: -43.1775205366442,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.5019303,
      userLongitude: -44.105728,
    })
    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
