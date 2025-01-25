import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

// "postgresql://docker:docker@localhost:5432/apisolid?schema=public"
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    // console.log('Setup')
    const schema = randomUUID()
    const databaseUrl = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseUrl

    // Essa função execSync é como se estivesse executando o comando no terminal.
    // O parâmetro do prisma - migrate deploy - só abre a pasta migration e execute cada arquivo.
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        // console.log('Teardown')
        await prismaClient.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prismaClient.$disconnect()
      },
    }
  },
}
