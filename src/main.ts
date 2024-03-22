import Fastify from 'fastify'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT! || 3000
const DATA_CHAR = process.env.DATA_CHAR! || 'x'

const fastify = Fastify({ logger: true })

fastify.get('/data', async (request: any, reply) => {
  const minimumDataLength = 11
  const requestedAmount = parseInt(request.query.amount, 10)

  if (isNaN(requestedAmount) || requestedAmount <= 0) {
    reply.status(400).send({ error: 'Invalid amount specified' })
    return
  }

  const dataLength =
    requestedAmount > minimumDataLength
      ? requestedAmount - minimumDataLength
      : 0
  const data = DATA_CHAR.repeat(dataLength)
  return { data }
})

fastify.post('/data', async (_request, _reply) => {
  return { message: 'Data received successfully.' }
})

fastify.listen({ port: +PORT }, (err) => {
  if (err) throw err
})
