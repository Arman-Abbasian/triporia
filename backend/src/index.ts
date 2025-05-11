import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running 🎉')
})
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
