import { Router } from 'express'
import {
  addPlaceController,
  addPlaceImagesController,
  deletePlaceImageController,
  editPlaceController,
  removePlaceController,
} from '../../../controllers/adminControllers/placeControllers'
import { uploadPlaceImage } from '../../../middlewares/multer/uploadPlaceImage'
import { handleMulterErrors } from '../../../middlewares/handleMulterErrors'
import { uploadPlaceImages } from '../../../middlewares/multer/uploadPlaceImages'

const router = Router()

router.post(
  '/addPlace',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  addPlaceController
)

router.post(
  '/placeImages/:id',
  uploadPlaceImages.array('images', 5),
  handleMulterErrors,
  addPlaceImagesController
)

router.patch(
  '/:placeId',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  editPlaceController
)
router.delete('/:placeId/images/:imageId', deletePlaceImageController)

router.delete('/:placeId', removePlaceController)

export default router
