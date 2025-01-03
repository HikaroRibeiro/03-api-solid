import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)

  return useCase
}
