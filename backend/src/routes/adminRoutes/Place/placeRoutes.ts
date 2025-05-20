import { Router } from 'express'
import {
  addPlaceController,
  addPlaceImagesController,
  editPlaceController,
  removePlaceController,
} from '../../../controllers/adminControllers/placeControllers'
const router = Router()

router.post('/place', addPlaceController)
router.put('/place/:id', editPlaceController)
router.delete('/place/:id', removePlaceController)
router.post('/place/:id', addPlaceImagesController)

export default router
