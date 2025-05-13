import { Router } from 'express'
import {
  acceptCommentController,
  getAllCommentsController,
  getPostCommentsController,
  removeCommentController,
} from '../../../controllers/adminControllers/commentControllers'

const router = Router()

router.put('/comment/:id', acceptCommentController)
router.delete('/comment/:id', removeCommentController)
router.get('/comment/:postId', getPostCommentsController)
router.get('/comment', getAllCommentsController)

export default router
