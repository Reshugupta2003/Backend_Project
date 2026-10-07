// import mongoose from "mongoose";          used in method 1
// import {DB_NAME} from "./constants"
// import express from "express";


import dotenv from "dotenv";
import connectDB from "./db/index.js";  // sometimes we also need to export index.js file, if i write index then it's also wrong .js extension also nessasary
import {app} from "./app.js";


dotenv.config({
    path: "./.env"
});


connectDB() // connect with DB then start the server.
.then(() => {
    app.on((err) => {
        console.log("Error : ", err);
    })

    app.listen(process.env.PORT || 8000, () => {   // if server port not work then it use port 8000, this is good practice to use.
        console.log(`App is listening on port ${process.env.PORT}`);
    });
})
.catch((err) => {
console.log("MongoDB connection failed : ", err);
});





















/*  method 1 : directly connect mongoose in index.js file
const app = express();
(async ()=> {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error", () =>{
         console.log("Error : ", error);
         throw error;
       })
       app.listen(process.env.PORT, () => {
          console.log(`App is listening on port ${process.env.PORT}`);
       })
    } catch (error) {
        console.log("Error : ", error);
        throw error;
    }
})();

/* Two method to connect moongose
1. function connectDB(){}
connectDB();

2. ;(async () => {})()  async IIFE function, we generally use semi-column so anything is remaining execute first and good practice to use.

*/