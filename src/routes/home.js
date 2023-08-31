import { Router } from 'express'
import { getAll } from '../controllers/courses.js'

const router = Router()

router.get('/', getAll)

export default router