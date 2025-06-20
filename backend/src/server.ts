import cors from 'cors'
import express from 'express'
import config from './config/config'
import path from 'path'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(config.port, () =>
	console.log(`Server starts at port ${config.port}`)
)

app.use('/uploads', express.static(path.join(__dirname, './storage/public')))
