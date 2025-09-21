import { Router, RequestHandler } from 'express'
import {
  activateAccountController,
  loginController,
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
 *     summary: User signup
 *     description: Register a new user account.
 *                  Middleware checks if user is already logged in
 *                  and validates input before proceeding.
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Signup successful. Activation email sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: User already logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation failed (invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post(
  '/signup',
  signupValidator as unknown as RequestHandler,
  validate as RequestHandler,
  signupController as RequestHandler
)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: login a user
 *                  Middleware checkGuest  checks if user is not already logged in
 *                  Middleware Valdidate  checks the body for any validation errors
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: User already logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Email or Password is not true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation failed (invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post(
  '/login',
  loginValidator as unknown as RequestHandler,
  validate as unknown as RequestHandler,
  loginController as RequestHandler
)

router.get('/activate/:token', activateAccountController as RequestHandler)
router.post(
  '/activate/resend-activation',
  resendActivateLinkValidator as unknown as RequestHandler,
  validate as RequestHandler,
  resendActivateLinkController as RequestHandler
)

export default router
