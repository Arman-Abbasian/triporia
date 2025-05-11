import { Router } from 'express'
const router = Router()
import placeRoutes from './Place/placeRoutes'
import commentRoutes from './comment/commentRoutes'

router.use('/place', placeRoutes)
router.use('/comments', commentRoutes)

export default router
