import cors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link'
import { subscribeToEventRoute } from './routes/subscribe-to-event'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Enable CORS
app.register(cors, {
  origin: '*',
})
// Enable Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      description: 'NLW Connect API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

// Enable Swagger UI
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Enable Zod serialization
app.setSerializerCompiler(serializerCompiler)
// Enable Zod validation
app.setValidatorCompiler(validatorCompiler)

const port = env.PORT

app.listen({ port }).then(() => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (request, reply) => {
  reply.send('Hello World!')
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
