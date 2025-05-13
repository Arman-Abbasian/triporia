//Packages
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
//Routes
import authRoutes from './routes/authRoutes'
import mainRoutes from './routes/mainRoutes'
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running 🎉')
})

app.use('/', mainRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
