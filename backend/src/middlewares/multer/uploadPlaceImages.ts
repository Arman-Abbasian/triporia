import multer from 'multer'
import { multerConfig } from './config'

export const uploadPlaceImages = multer(multerConfig)
