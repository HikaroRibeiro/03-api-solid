import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)

  return useCase
}
