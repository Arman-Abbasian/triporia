//Packages
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
//Routes
import authRoutes from './routes/authRoutes'
import mainRoutes from './routes/mainRoutes'
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'
import path from 'path'
import { prisma } from '../prisma/client'
import { isAdmin } from './middlewares/isAdmin'
import { jwtAuth } from './middlewares/jwtAuth'

dotenv.config()

const app = express()
app.set('trust proxy', true)
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, '..', 'public')))

app.use('/api/', mainRoutes)
app.use('/api/auth', jwtAuth, authRoutes)
app.use('/api/admin', jwtAuth, isAdmin, adminRoutes)
app.use('/api/user', jwtAuth, userRoutes)

async function startServer() {
  try {
    // تست اتصال به دیتابیس
    await prisma.$connect()
    console.log('✅ Connected to database')

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('❌ Failed to connect to database', err)
    process.exit(1) // با خطا خارج شو
  }
}

startServer()
