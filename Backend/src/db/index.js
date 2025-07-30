const mongoose = require('mongoose')
// Connect to MongoDB
const connectDB = async () => {
    try {
     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
     console.log(`MongoDB Connected! DB Host:${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log ("MongoDB Connection Error", error)
        process.exit(1)
    }
    
}
module.exports = connectDB;
