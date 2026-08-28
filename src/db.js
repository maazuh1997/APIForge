import { MongoClient } from 'mongodb'
import { config } from './config.js'

let client
let db

export async function connectDatabase() {
  client = new MongoClient(config.mongodbUri)
  await client.connect()
  db = client.db()
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  return db
}

export function getDatabase() {
  if (!db) throw new Error('Database has not been connected')
  return db
}

export async function closeDatabase() {
  await client?.close()
}
