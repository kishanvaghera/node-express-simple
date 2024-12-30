import express from "express";
import { AddPost, GetAllPost, GetSinglePost, UpdatePost, FileUpload, DeleteFile } from "../controllers/post.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.route("/GetAllPost").get(GetAllPost);
router.route("/GetSinglePost/:id").get(GetSinglePost);
router.route("/AddPost").post(AddPost);
router.route("/UpdatePost/:id").put(UpdatePost);
router.route("/UploadImage").post(upload.single('image'), FileUpload);
router.route("/DeleteImage").delete(DeleteFile);

export default router;