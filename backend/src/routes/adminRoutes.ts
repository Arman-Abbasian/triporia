import { Router } from 'express'

import placeRoutes from './adminRoutes/Place/placeRoutes'
import commentRoutes from './adminRoutes/comment/commentRoutes'
import userRoutes from './adminRoutes/user/userRoutes'

const router = Router()

router.use('/user', userRoutes)
router.use('/place', placeRoutes)
router.use('/comment', commentRoutes)

export default router
