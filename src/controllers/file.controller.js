import { FileDetail } from "../models/file.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponce } from "../utilities/ApiResponce.js";
import { asynchandler } from "../utilities/asynHandler.js";
import { uploader } from "../utilities/cloudinary.js";


const uploadFile=asynchandler(async (req,res)=>{
    const {title,description}=req.body
    if ([title, description].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All field Are Required ")
    }

    const fileLocal=req.file?.path

     if (!fileLocal) {
        throw new ApiError(404, "file is required")
    }

    const file=await uploader(fileLocal)

    if (!file?.url) {
        throw new ApiError(401, "Error while Uploading the new file")
    }

    const dbfile=await FileDetail.create({
        title,
        description,
        fileName:file.original_filename,
        fileSize:file.bytes,
        fileType:file.format
    })

    if(!dbfile){
        throw new ApiError(500,"There is error Occure while uplaoding file on db")
    }

    return res.status(200).json(
        new ApiResponce(200,dbfile,"File Uploaded SuccessFully ")
    )


})

export {uploadFile}