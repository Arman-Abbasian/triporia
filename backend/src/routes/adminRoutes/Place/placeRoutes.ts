import { Router } from 'express'
import {
  addPlaceController,
  editPlaceController,
  getPlaceController,
  getPlacesController,
  removePlaceController,
} from '../../../controllers/adminControllers/placeControllers'
const router = Router()

router.post('/place', addPlaceController)
router.put('/place/:id', editPlaceController)
router.delete('/place/:id', removePlaceController)
router.get('/place/:id', getPlaceController)
router.get('/place', getPlacesController)

export default router
