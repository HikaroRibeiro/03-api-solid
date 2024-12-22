/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()

    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'gym-01',
      description: '',
      latitude: new Decimal(-22.5019303),
      longitude: new Decimal(-44.105728),
      phone: null,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in.', async () => {
    vi.setSystemTime(new Date(2024, 11, 21, 6, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5019303,
      userLongitude: -44.105728,
    })
    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day.', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5019303,
      userLongitude: -44.105728,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.5019303,
        userLongitude: -44.105728,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days.', async () => {
    vi.setSystemTime(new Date(2024, 11, 21, 6, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5019303,
      userLongitude: -44.105728,
    })

    vi.setSystemTime(new Date(2024, 11, 22, 6, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5019303,
      userLongitude: -44.105728,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym.', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'gym-02',
      description: '',
      latitude: new Decimal(-22.4843255),
      longitude: new Decimal(-44.0581778),
      phone: null,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.5019303,
        userLongitude: -44.105728,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
