import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new CheckInUseCase(prismaCheckInsRepository, gymsRepository)

  return useCase
}
