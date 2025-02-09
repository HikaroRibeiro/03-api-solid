import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    /* payload: {
      id: number
    } */
    user: {
      /* id: number
      name: string
      age: number */
      sub: string
      role: 'ADMIN' | 'MEMBER'
    }
  }
}
