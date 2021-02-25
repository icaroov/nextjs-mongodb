import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

type ConnectionProps = {
  isConnected?: number
}

const connection: ConnectionProps = {}

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
  console.log('✨ Database connected!')
}

export default dbConnect