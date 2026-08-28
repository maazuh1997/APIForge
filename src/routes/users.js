import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { authenticate, authorize } from '../middleware/auth.js'
import { getDatabase } from '../db.js'

const router = Router()
router.use(authenticate)

router.get('/me', async (req, res, next) => {
  try {
    const user = await getDatabase().collection('users').findOne({ _id: new ObjectId(req.user.sub) }, { projection: { passwordHash: 0 } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

router.get('/', authorize('admin'), async (req, res, next) => {
  try {
    const users = await getDatabase().collection('users').find({}, { projection: { passwordHash: 0 } }).limit(100).toArray()
    res.json({ data: users })
  } catch (error) {
    next(error)
  }
})

export default router
