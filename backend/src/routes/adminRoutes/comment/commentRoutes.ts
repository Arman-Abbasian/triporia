import { RequestHandler, Router } from 'express'
import {
  acceptCommentController,
  getAllCommentsController,
  getPlaceCommentsController,
  removeCommentController,
} from '../../../controllers/adminControllers/commentControllers'

const router = Router()

router.put('/comment/:id', acceptCommentController as RequestHandler)
router.delete('/comment/:id', removeCommentController as RequestHandler)
router.get('/comment/:placeId', getPlaceCommentsController as RequestHandler)
router.get('/comment', getAllCommentsController)

export default router
