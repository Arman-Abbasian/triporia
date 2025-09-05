import { Router, RequestHandler } from 'express'
import {
  activateAccountController,
  loginController,
  logoutController,
  resendActivateLinkController,
  signupController,
} from '../controllers/authControllers'
import {
  loginValidator,
  resendActivateLinkValidator,
  signupValidator,
} from '../middlewares/validations/authValidators'
import { validate } from '../middlewares/validations/validate'

const router = Router()

router.post(
  '/signup',
  signupValidator as unknown as RequestHandler,
  validate as RequestHandler,
  signupController as RequestHandler
)
router.get('/activate/:token', activateAccountController as RequestHandler)
router.post(
  '/activate/resend-activation',
  resendActivateLinkValidator as unknown as RequestHandler,
  validate as RequestHandler,
  resendActivateLinkController as RequestHandler
)
router.post(
  '/login',
  loginValidator as unknown as RequestHandler,
  validate as unknown as RequestHandler,
  loginController as RequestHandler
)
router.get('/logout', logoutController as RequestHandler)

export default router
