import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

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
    registerUser,   // Express calls: registerUser(req, res)
)

router.route("/login").post(loginUser)

// secure method
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router

// work flow router take text data(username, email, password) & file data(coverImage, avatar)