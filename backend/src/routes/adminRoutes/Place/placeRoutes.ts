import { RequestHandler, Router } from 'express'
import {
  addPlaceController,
  addPlaceImagesController,
  removePlaceImageController,
  editPlaceController,
  getPlaceImagesController,
  removePlaceController,
} from '../../../controllers/adminControllers/placeControllers'
import { uploadPlaceImage } from '../../../middlewares/multer/uploadPlaceImage'
import { handleMulterErrors } from '../../../middlewares/handleMulterErrors'
import { addPlaceValidator } from '../../../middlewares/validations/placeValidator'
import { validate } from '../../../middlewares/validations/validate'

const router = Router()

router.get('/:placeId/images', getPlaceImagesController)

router.post(
  '/addPlace',
  addPlaceValidator as unknown as RequestHandler,
  validate as RequestHandler,
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  addPlaceController
)

router.put(
  '/:placeId',
  addPlaceValidator as unknown as RequestHandler,
  validate as RequestHandler,
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  editPlaceController
)

router.delete('/:placeId', removePlaceController)

router.post(
  '/placeImages/:id',
  uploadPlaceImage.array('images', 5),
  handleMulterErrors,
  addPlaceImagesController
)

router.delete('/:placeId/images/:imageId', removePlaceImageController)

export default router
