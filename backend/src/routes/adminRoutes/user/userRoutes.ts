import { Router } from 'express'
import {
  addUserController,
  editUserController,
  getAllUsersController,
  getUserController,
  removeUserController,
} from '../../../controllers/adminControllers/userControllers'
const router = Router()

router.post('/user', addUserController)
router.put('/user/:id', editUserController)
router.delete('/user/:id', removeUserController)
router.get('/users', getAllUsersController)
router.get('/users/:id', getUserController)

export default router
