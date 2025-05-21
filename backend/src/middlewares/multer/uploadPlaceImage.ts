import multer from 'multer'
import { multerConfig } from './config'

export const uploadPlaceImage = multer(multerConfig)
