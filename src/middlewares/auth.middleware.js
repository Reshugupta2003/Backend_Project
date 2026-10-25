import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/* It's middleware use when user send to request and to fullfill that request we need user object
   from mongoDB, but request object doesn't contains anything like that but it have cookies so now
   we are using those cookies add new key-value pair (user : {..user_object..}) in object
*/  


export const verifyJWT = asyncHandler(async (req, _, next) => {

    try {
        const authorizationHeader = req.header("Authorization");
        const token = req.cookies?.accessToken || authorizationHeader?.replace("Bearer", "").trim();
    
        if(!token){
            throw new ApiError(401, "UnAutherized request")
        }
    
        // contain similar payload which we provide to while creating access token.
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodeToken);
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401, "Invalid access token, user doesn't exist");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access token")
    }
})
