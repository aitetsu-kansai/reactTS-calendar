import dotenv from 'dotenv'

dotenv.config()

interface Config {
	port: number
	mongoUrl: string
	nodeEnv: string
}

const config: Config = {
	port: Number(process.env.PORT) || 5000,
	mongoUrl: process.env.MONGO_URL || '',
	nodeEnv: process.env.NODE_ENV || 'development',
}

export default config
