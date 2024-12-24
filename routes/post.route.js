import express from "express";
import { AddPost, GetAllPost, GetSinglePost, UpdatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/GetAllPost").get(GetAllPost);
router.route("/GetSinglePost/:id").get(GetSinglePost);
router.route("/AddPost").post(AddPost);
router.route("/UpdatePost/:id").put(UpdatePost);

export default router;