import { Router } from 'express'
import {
  loginController,
  logoutController,
  signupController,
} from '../controllers/authControllers'

const router = Router()

router.post('/login', loginController)
router.post('/signup', signupController)
router.get('/logout', logoutController)

export default router
