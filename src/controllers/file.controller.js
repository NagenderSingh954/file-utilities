import { FileDetail } from "../models/file.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponce } from "../utilities/ApiResponce.js";
import { asynchandler } from "../utilities/asynHandler.js";
import { uploader } from "../utilities/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";


const uploadFile = asynchandler(async (req, res) => {
    const { title, description } = req.body
    if ([title, description].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All field Are Required ")
    }

    const fileLocal = req.file?.path

    if (!fileLocal) {
        throw new ApiError(404, "file is required")
    }

    const file = await uploader(fileLocal)

    if (!file?.url) {
        throw new ApiError(401, "Error while Uploading the new file")
    }

    const dbfile = await FileDetail.create({
        title,
        description,
        fileName: file.original_filename,
        fileSize: file.bytes,
        fileType: file.format
    })

    if (!dbfile) {
        throw new ApiError(500, "There is error Occure while uplaoding file on db")
    }

    return res.status(200).json(
        new ApiResponce(200, dbfile, "File Uploaded SuccessFully ")
    )


})

const getFileById = asynchandler(async (req, res) => {
    const { fileId } = req.params
    if (!isValidObjectId(fileId)) {
        throw new ApiError(404, "Pleas provvide the valid file Id")
    }

    const file = await FileDetail.findById(fileId)

    if (!file) {
        throw new ApiError(404, "File Not Found")
    }

    return res.status(200).json(
        new ApiResponce(200, file, "File fetched Successfully")
    )

})

const updateFile = asynchandler(async (req, res) => {
    const { fileId } = req.params
    const { title, description } = req.body

    if (!isValidObjectId(fileId)) {
        throw new ApiError(400, "Invalid File Access")
    }
    if ([title, description].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All Field Are required ")
    }

    const file = await FileDetail.findByIdAndUpdate(
        fileId,
        {
            $set: {
                title,
                description
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!file) {
        throw new ApiError(400, "Error While Updating ")
    }
    return res.status(200).json(
        new ApiResponce(200, file, "File Updated SuccessFully")
    )
})

const getAllFile=asynchandler(async(req,res)=>{
    const file=await FileDetail.find({})

    if(!file){
        throw new ApiError(404,"No Item Found")
    }
    return res.status(200).json(
        new ApiResponce(200,file,"All File fetched Successfully")
    )
})

export { uploadFile,getFileById,updateFile,getAllFile}