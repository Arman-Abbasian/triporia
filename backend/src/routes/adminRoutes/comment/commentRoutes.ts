import { Router } from 'express'
import {
  acceptCommentController,
  getAllCommentsController,
  getPlaceCommentsController,
  removeCommentController,
} from '../../../controllers/adminControllers/commentControllers'

const router = Router()

router.put('/comment/:id', acceptCommentController)
router.delete('/comment/:id', removeCommentController)
router.get('/comment/:postId', getPlaceCommentsController)
router.get('/comment', getAllCommentsController)

export default router
