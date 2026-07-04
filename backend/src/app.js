import express from "express";
import cors from "cors"

const app=express()
app.use(cors({
    origin:process.env.CORS,
    credentials:true,
}))

app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.json({limit:'16kb'}))
app.use(express.static('public')) 



//routers 
import fileRouter from './routes/file.routes.js'

app.use('/api/v1/files',fileRouter)






app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});
export {app}