import express from 'express'
import cors from 'cors'
import multer from 'multer'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

// Path setup
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Mongoose Schema
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
})

const Service = mongoose.model('Service', serviceSchema)

// Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// Routes
app.post('/api/services', upload.single('image'), async (req, res) => {
  const { title, description } = req.body
  const imageUrl = req.file.filename
  const newService = new Service({ title, description, imageUrl })
  await newService.save()
  res.json({ message: 'Service created', service: newService })
})

app.get('/api/services', async (req, res) => {
  const services = await Service.find()
  res.json(services)
})

app.get('/', (req, res) => {
  res.send('Backend is working!')
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
