import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true // if credentials is true then it will allow cookies to be sent in cross-origin requests and origin not be * .
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());    // this is help to use cookies in user.controller.js file

//import routes
import userRouter from "./routes/user.route.js"; // we give any (like - userRoute,routes, etc) only if export is default

//routes declaration flow = app -> user.route.js -> user.controller.js -> asyncHandler.js
app.use("/api/v1/users", userRouter)

//http://localhost:8080/api/v1/users/register, here base url is http://localhost:8080/api/v1/users and endpoint is /register.

export {app};