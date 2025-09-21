import { Router, RequestHandler } from 'express'
import {
  AddCommentController,
  LikeController,
  BookmarkController,
  AddRateController,
  editUserController,
  userController,
  logoutController,
} from '../controllers/userControllers'

const router = Router()

router.post('/like', LikeController as RequestHandler)
router.post('/bookmark', BookmarkController as RequestHandler)
router.post('/comment', AddCommentController as RequestHandler)
router.post('/rate', AddRateController as RequestHandler)
router.get('/user', userController as RequestHandler)
router.put('/user', editUserController as RequestHandler)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User logout
 *     description: logout a user
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
router.get('/logout', logoutController as RequestHandler)

export default router
