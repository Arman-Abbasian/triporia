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
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arman Abasian
 *               email:
 *                 type: string
 *                 example: arman@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Passw0rd!
 *     responses:
 *       201:
 *         description: Signup successful. Activation email sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               isSuccess: true
 *               message: Signup successful. Please check your email to activate your account.
 *               data:
 *                 userId: 1
 *               error: null
 *       400:
 *         description: Bad request (invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               isSuccess: false
 *               message: Invalid request body
 *               data: null
 *               error: { field: "email", issue: "Invalid email format" }
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               isSuccess: false
 *               message: User with this email already exists
 *               data: null
 *               error: {}
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               isSuccess: false
 *               message: Signup failed
 *               data: null
 *               error: {}
 */

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
