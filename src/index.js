import connectDb from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
    path:"./.env"
})

connectDb()
.then(()=>{
    app.on('error',(error)=>{
        console.log("There is issue while connecting")
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("App is listning on port",process.env.PORT)
    })
}).catch((error)=>{
    console.log('Mongo DB Connection Failed !!!', error)
})
