/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms.', async () => {
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'The first gym',
      phone: null,
      latitude: -22.5019303,
      longitude: -44.105728,
    })

    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'The first gym',
      phone: null,
      latitude: -22.5019303,
      longitude: -44.105728,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })
    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })

  it('should be able to search paginated gyms.', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'The first gym',
        phone: null,
        latitude: -22.5019303,
        longitude: -44.105728,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })
    await expect(gyms).toHaveLength(2)
    await expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
