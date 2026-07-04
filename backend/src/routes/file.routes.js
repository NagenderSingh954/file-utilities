import { 
    deleteFile,
    getAllFile,
     getFileById,
     updateFile,
     uploadFile, 
     uploadtextFile} from "../controllers/file.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";

const router=Router()
router.route('/').get(getAllFile)


router.route('/upload').post(upload.single("file"),uploadFile)
router.route('/upload/text').post(uploadtextFile)

router.route('/:fileId').get(getFileById).patch(updateFile).delete(deleteFile)


export default router