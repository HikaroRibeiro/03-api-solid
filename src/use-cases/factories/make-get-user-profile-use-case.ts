import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const useCase = new GetUserProfileUseCase(prismaUserRepository)

  return useCase
}
