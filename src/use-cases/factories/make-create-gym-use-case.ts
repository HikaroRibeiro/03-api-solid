import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new CreateGymUseCase(prismaGymsRepository)

  return useCase
}
