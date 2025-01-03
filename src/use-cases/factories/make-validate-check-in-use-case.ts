import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return useCase
}
