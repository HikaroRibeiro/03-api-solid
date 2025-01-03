import { GetUseMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new GetUseMetricsUseCase(prismaCheckInsRepository)

  return useCase
}
