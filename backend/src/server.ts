import cors from 'cors'
import express from 'express'
import path from 'path'
import config from './config/config'
import connectDB from './config/db'
import contactRoutes from './routes/contactRoutes'

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(config.port, () =>
	console.log(`Server starts at port ${config.port}`)
)

app.use('/uploads', express.static(path.join(__dirname, './storage/public')))

app.use('/contacts', contactRoutes)
