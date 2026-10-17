import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    //we can't send file data in json format so we need to use multer middleware to inject the file data into req.body
    // here middleware add the file data to req.body which excessible using req.files .
    upload.fields([
    { 
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1 
    }
    ]),
    registerUser,
)
//router.route("/login").post(login)

export default router