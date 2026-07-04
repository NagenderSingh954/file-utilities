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
     //  console.log("File is Uploaded on Cloudinary",responce.url)
         fs.unlinkSync(localPath) 
         
        return responce;

   } catch (error) {
     //    console.log("error occure while uploading on cloudinary",error)
        fs.unlinkSync(localPath)
        return;
   }
}
const deleteOnCloudinary=async(url)=>{
    const fileName=url.split('/').pop()

    const publicId=fileName.substring(0, fileName.lastIndexOf("."))

   const responce =await cloudinary.uploader.destroy(publicId);

   return responce


}

export {uploader,deleteOnCloudinary}