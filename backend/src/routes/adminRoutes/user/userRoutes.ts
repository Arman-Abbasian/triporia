import { RequestHandler, Router } from 'express'
import {
  editUserController,
  getAllUsersController,
  getUserController,
  removeUserController,
} from '../../../controllers/adminControllers/userControllers'
const router = Router()

router.put('/user/:id', editUserController as RequestHandler)
router.delete('/user/:id', removeUserController as RequestHandler)
router.get('/users', getAllUsersController as RequestHandler)
router.get('/users/:id', getUserController as RequestHandler)

export default router
