import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/database'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const port = process.env.PORT || 5000

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
