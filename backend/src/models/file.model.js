import mongoose, { Schema } from "mongoose";

const filedetail = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    fileUrl: {
        type: String,
        trim: true,
        required: true
    },
    fileName: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
    },
    fileSecure:{
        type: String,
        trim: true
    }
}, { timestamps: true })

export const FileDetail = mongoose.model("FileDetail", filedetail)