import mongoose from "mongoose";

const connectDb=async()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`) //todo study this connectionInstance


    } catch (error) {
        console.log("MongoDB Connection Failed : ", error)
        process.exit(1)
    }
}

export default connectDb