import { FileDetail } from "../models/file.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponce } from "../utilities/ApiResponce.js";
import { asynchandler } from "../utilities/asynHandler.js";
import { deleteOnCloudinary, uploader } from "../utilities/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";
import fs from "fs";
import path from "path";


const uploadFile = asynchandler(async (req, res) => {

    const { title, description } = req.body
    if ([title, description].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All field Are Required ")
    }

    const fileLocal = req.file?.path
    const fileExtension = req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

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
        fileUrl: file.url,
        fileName: file.original_filename,
        fileSize: file.bytes,
        fileType: fileExtension
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
            returnDocument: "after",
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

const getAllFile = asynchandler(async (req, res) => {
    const file = await FileDetail.find({}).sort({ createdAt: -1 });

    if (!file) {
        throw new ApiError(404, "No Item Found")
    }
    return res.status(200).json(
        new ApiResponce(200, file, "All File fetched Successfully")
    )
})

const deleteFile = asynchandler(async (req, res) => {
    const { fileId } = req.params

    if (!fileId) {
        throw new ApiError(404, "File not found")
    }
    const filedetails=await FileDetail.findById(fileId)
    if(!filedetails){
        throw new ApiError(404, "File not found")
    }

    const deleteFile = await deleteOnCloudinary(filedetails.fileUrl)

     if (!deleteFile) {
        throw new ApiError(400, "Error in deleting teh video on cloudinary")
    }
    const deleteing = await FileDetail.findByIdAndDelete(fileId)
   

    if (!deleteing) {
        throw new ApiError(500, "File not exist")
    }
    return res.status(200).json(
        new ApiResponce(200, { fileId }, "File Deleted Successfully ")
    )
})
const uploadtextFile = asynchandler(async (req, res) => {
 
    const { title, description, content } = req.body;
   

    if ([title, description, content].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All field Are Required ")
    }
    const safeTitle = title
        .trim()
        .replace(/[<>:"/\\|?*]/g, "_");

    const fileName = `${safeTitle}.txt`;
    const tempDir = path.join("public", "temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempPath = path.join(tempDir, fileName);
    fs.writeFileSync(tempPath, content);

        const uploadResponse = await uploader(tempPath);
        if (!uploadResponse) {
            throw new ApiError(404, "Error Occure While Uploading on cloudinary ")
        }

        const fileUpload = await FileDetail.create({
            title,
            description,
            fileUrl: uploadResponse.url,
            fileName,
            fileSize:uploadResponse.bytes,
            fileType: "txt",

        })
        if (!fileUpload) {
            throw new ApiError(500, "There is Error while uploading on DB")
        }


        return res.status(200).json(
            new ApiResponce(200, fileUpload, "Text File Uploade Successfully")
        )

    


})
export { uploadFile, getFileById, updateFile, getAllFile, deleteFile, uploadtextFile }