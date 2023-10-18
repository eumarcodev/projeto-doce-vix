import { multerConfig } from "@/middlewares/multer";
import { uploadFIleController } from "@/modules/file/useCases/uploadFIle";
import { Router } from "express";
import multer from "multer";

const fileRoutes = Router()

const uploads = multer(multerConfig)

fileRoutes.post("/", uploads.single("file"), (request, response, next) => {
    return uploadFIleController.handle(request, response, next);
});

export { fileRoutes };
