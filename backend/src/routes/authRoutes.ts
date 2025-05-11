import { Router } from 'express'
import {
  loginController,
  signupController,
  userController,
} from '../controllers/authControllers'

const router = Router()

router.post('/login', loginController)
router.post('/signup', signupController)
router.get('/user', userController)

export default router
