import { SearchGymUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new SearchGymUseCase(prismaGymsRepository)

  return useCase
}
