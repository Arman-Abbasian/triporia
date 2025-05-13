import { Router } from 'express'
import {
  commentController,
  likeController,
  rateController,
  userController,
} from '../controllers/userControllers'

const router = Router()

router.get('/like', likeController)
router.get('/comment', commentController)
router.get('/rate', rateController)
router.get('/user', userController)

export default router
