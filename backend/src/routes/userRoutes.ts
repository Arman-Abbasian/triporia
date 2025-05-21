import { Router, RequestHandler } from 'express'
import {
  AddCommentController,
  AddlikeController,
  AddRateController,
  editUserController,
  userController,
} from '../controllers/userControllers'

const router = Router()

router.post('/like', AddlikeController as RequestHandler)
router.post('/comment', AddCommentController as RequestHandler)
router.post('/rate', AddRateController as RequestHandler)
router.get('/user', userController as RequestHandler)
router.put('/user', editUserController as RequestHandler)

export default router
