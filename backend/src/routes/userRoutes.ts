import { Router, RequestHandler } from 'express'
import {
  AddCommentController,
  LikeController,
  BookmarkController,
  AddRateController,
  editUserController,
  userController,
} from '../controllers/userControllers'

const router = Router()

router.post('/like', LikeController as RequestHandler)
router.post('/bookmark', BookmarkController as RequestHandler)
router.post('/comment', AddCommentController as RequestHandler)
router.post('/rate', AddRateController as RequestHandler)
router.get('/user', userController as RequestHandler)
router.put('/user', editUserController as RequestHandler)

export default router
