import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository() // Caso um dia precise trocar de tipo de repositório basta trocar aqui.
  const registerUseCase = new RegisterUseCase(prismaUserRepository)

  return registerUseCase
}
