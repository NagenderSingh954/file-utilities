import mongoose,{Schema} from "mongoose";

const filedetail=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    fileName:{
        type:String,
        required:true,
    },
    fileSize:{
        type:String,
        required:true,
    },
    fileType:{
        type:String,
    }
},{timeseries:true})

export const FileDetail=mongoose.model("FileDetail",filedetail)