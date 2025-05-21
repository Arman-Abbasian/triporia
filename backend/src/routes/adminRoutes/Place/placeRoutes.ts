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
  '/place',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  addPlaceController
)

router.post(
  '/place/:id',
  uploadPlaceImages.array('images', 5),
  handleMulterErrors,
  addPlaceImagesController
)

router.patch(
  '/place/:placeId',
  uploadPlaceImage.single('coverImage'),
  handleMulterErrors,
  editPlaceController
)

router.delete('/place/:placeId', removePlaceController)

router.delete('/place/:placeId/images/:imageId', deletePlaceImageController)

export default router
