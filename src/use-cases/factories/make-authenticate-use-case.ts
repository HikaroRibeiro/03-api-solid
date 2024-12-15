import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const authenticateUseCase = new AuthenticationUseCase(prismaUserRepository)

  return authenticateUseCase
}
