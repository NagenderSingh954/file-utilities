import { 
    getAllFile,
     getFileById,
     updateFile,
     uploadFile } from "../controllers/file.controller.js";
import { Router } from "express";

const router=Router()


router.route('/').post(uploadFile).get(getAllFile)
router.route('/:fileId').get(getFileById).patch(updateFile)