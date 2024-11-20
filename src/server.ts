/* eslint-disable prettier/prettier */
import{ app } from '@/app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Servidor On-Line! On Port: ` + env.PORT)
  })
