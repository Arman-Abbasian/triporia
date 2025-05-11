import { Router } from 'express'
const router = Router()

router.put('/condition', changeCommentconditionController)
router.delete('/remove', removeCommentController)
router.get('/get', getCommentController)

export default router
