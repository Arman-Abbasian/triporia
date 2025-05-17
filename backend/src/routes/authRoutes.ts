import { Router } from 'express'
import {
  activateAccountController,
  loginController,
  logoutController,
  signupController,
} from '../controllers/authControllers'
import {
  loginValidator,
  signupValidator,
} from '../middlewares/validations/authValidators'
import { validate } from '../middlewares/validations/validate'

const router = Router()

router.post('/signup', signupValidator, validate, signupController)
router.get('/activate/:token', activateAccountController)
router.post('/login', loginValidator, validate, loginController)
router.get('/logout', logoutController)

export default router
