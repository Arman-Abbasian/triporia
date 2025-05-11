import { Router } from 'express'
const router = Router()

router.post('/place', addPlaceController)
router.put('/comments', editPlaceController)
router.delete('/comments', removePlaceController)
router.get('/comments', getPlaceController)

export default router
