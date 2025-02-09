import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // Valida que o usuário está autenticado mas não vai olhar para a informação no cabeçalho.
  // Vai olhar para os coockies da requisição para ver se existe o RefreshToken.
  // Se existindo e sendo válido irá gerar um novo token.

  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  // Se ficar mais de 7 dias sem logar ele perde o Token do seu usuário.
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  // Para trabalhar com coockies instalar 'npm i @fastify/cookie'.
  // Parâmetro "path: '/'" quais rotas do nosso backend terá acesso a esse coockie.
  // Parâmetro "secure: true" o coockie será encriptado por HTTPs.
  // Parâmetro "httpOnly: true" só vai conseguir acessado pelo backend da aplicação.

  console.log(refreshToken)
  return await reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
