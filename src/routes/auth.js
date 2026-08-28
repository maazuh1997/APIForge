import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDatabase } from '../db.js'
import { config } from '../config.js'

const router = Router()

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ error: 'name, email and a password of at least 8 characters are required' })
    }

    const users = getDatabase().collection('users')
    const existing = await users.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(409).json({ error: 'Email is already registered' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = { name, email: email.toLowerCase(), passwordHash, role: 'user', createdAt: new Date() }
    const result = await users.insertOne(user)
    const token = jwt.sign({ sub: result.insertedId.toString(), role: user.role, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })

    res.status(201).json({ token, user: { id: result.insertedId, name, email: user.email, role: user.role } })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getDatabase().collection('users').findOne({ email: email?.toLowerCase() })
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    next(error)
  }
})

export default router
