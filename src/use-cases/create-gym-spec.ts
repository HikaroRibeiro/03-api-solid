import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym.', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: 'The first gym',
      phone: null,
      latitude: -22.5019303,
      longitude: -44.105728,
    })
    await expect(gym.id).toEqual(expect.any(String))
  })
})
