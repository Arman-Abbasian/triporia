import { Router } from 'express'
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
import { uploadPlaceImages } from '../../../middlewares/multer/uploadPlaceImages'

const router = Router()

router.get('/:placeId/images', getPlaceImagesController)
router.post(
  '/addPlace',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  addPlaceController
)

router.patch(
  '/:placeId',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  editPlaceController
)

router.delete('/:placeId', removePlaceController)

router.post(
  '/placeImages/:id',
  uploadPlaceImages.array('images', 5),
  handleMulterErrors,
  addPlaceImagesController
)

router.delete('/:placeId/images/:imageId', removePlaceImageController)

export default router
