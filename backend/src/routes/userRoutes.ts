import { Router, RequestHandler } from 'express'
import {
  AddCommentController,
  LikeController,
  BookmarkController,
  AddRateController,
  editUserController,
  userController,
  logoutController,
  activateAccountController,
  resendActivateLinkController,
} from '../controllers/userControllers'
import { resendActivateLinkValidator } from '../middlewares/validations/authValidators'
import { validate } from '../middlewares/validations/validate'
import { idValidator } from '../middlewares/validations/globalValidators'
import {
  commentValidator,
  rateValidator,
} from '../middlewares/validations/userValidators'

const router = Router()

/**
 * @swagger
 * /user/like:
 *   post:
 *     summary: User like/unlike a place
 *     description: User like/unlike a place
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       200:
 *         description: like/unlike successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: placeId is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: place not found
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
  '/like',
  idValidator as unknown as RequestHandler,
  validate as RequestHandler,
  LikeController as RequestHandler
)
/**
 * @swagger
 * /user/bookmark:
 *   post:
 *     summary: User bookmark/unbookmark a place
 *     description: User like/unlike a place
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       200:
 *         description: like/unlike successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: placeId is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: place not found
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
  '/bookmark',
  idValidator as unknown as RequestHandler,
  validate as RequestHandler,
  BookmarkController as RequestHandler
)

/**
 * @swagger
 * /user/comment:
 *   post:
 *     summary: User bookmark/unbookmark a place
 *     description: User bookmark/unbookmark a place
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Comment added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: place not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation failed
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
  '/comment',
  idValidator as unknown as RequestHandler,
  commentValidator as unknown as RequestHandler,
  validate as RequestHandler,
  AddCommentController as RequestHandler
)
/**
 * @swagger
 * /user/comment:
 *   post:
 *     summary: User bookmark/unbookmark a place
 *     description: User bookmark/unbookmark a place
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Rating submitted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: place not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Validation failed
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
  '/rate',
  idValidator as unknown as RequestHandler,
  rateValidator as unknown as RequestHandler,
  validate as RequestHandler,
  AddRateController as RequestHandler
)
/**
 * @swagger
 * /user/comment:
 *   post:
 *     summary: User bookmark/unbookmark a place
 *     description: User bookmark/unbookmark a place
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
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
router.get('/user', userController as RequestHandler)
router.put('/user', editUserController as RequestHandler)

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User logout
 *     description: logout a user
 *     tags: [User]
 *     schema:
 *           type: string
 *     responses:
 *       200:
 *         description: logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: No refresh token found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
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

/**
 * @swagger
 * /user/activate/{token}:
 *   get:
 *     summary: Activate user account
 *     description: >
 *       Activates a user account by validating the activation token.
 *       Middleware `checkUser` validates authentication using accessToken and refreshToken cookies.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Activation token sent to the user via email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Token is invalid or has expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required (no valid access/refresh token)
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

router.get('/activate/:token', activateAccountController as RequestHandler)

/**
 * @swagger
 * /user/activate/resend-activation:
 *   post:
 *     summary: Resend account activation link
 *     description: >
 *       Resends a new activation link to the user's email if the account is not already active
 *       and the previous token is expired.
 *     tags: [User]
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
 *                 example: arman@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Activation email resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: User is already active OR previous link is still valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required OR Refresh token expired. Please login again OR Invalid refresh token
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
 *         description: Internal server error (resendActivateLinkError)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post(
  '/activate/resend-activation',
  resendActivateLinkValidator as unknown as RequestHandler,
  validate as RequestHandler,
  resendActivateLinkController as RequestHandler
)

export default router
