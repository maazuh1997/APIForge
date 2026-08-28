import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { config } from './config.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

export const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'))
app.use(rateLimit({ windowMs: config.rateLimitWindowMs, limit: config.rateLimitMax, standardHeaders: 'draft-8', legacyHeaders: false }))

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'APIForge', timestamp: new Date().toISOString() }))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup({ openapi: '3.0.3', info: { title: 'APIForge API', version: '1.0.0', description: 'Production-style REST API toolkit.' }, servers: [{ url: 'http://localhost:4000' }], paths: {} }))

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
})
