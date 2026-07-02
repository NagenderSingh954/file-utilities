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
      console.log(responce.resource_type);
console.log(responce.format);
console.log(responce.secure_url);
         fs.unlinkSync(localPath) 
         
        return responce;

   } catch (error) {
        console.log("error occure while uploading on cloudinary",error)
        fs.unlinkSync(localPath)
        return;
   }
}

export {uploader}