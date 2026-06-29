import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploader=async (localPath)=>{
   try {
    const responce=await cloudinary.uploader.upload(localPath,{
         resource_type:"auto",
     })
      console.log("File is Uploaded on Cloudinary",responce.url)
         fs.unlinkSync(localFilePath) 
        return responce;

   } catch (error) {
        console("error occure while uploading on cloudinary")
        fs.unlink(localPath)
        return;
   }
}

export {uploader}