import dotenv from 'dotenv'

dotenv.config()

const required = ['JWT_SECRET']

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apiforge',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100)
}
