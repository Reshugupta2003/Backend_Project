import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
 
const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected : ${mongoose.connection.host} \n`);
        //console.log(mongoose.connection.host);
    }
    catch(error){
        console.log("MongoDB connection error : ", error);  //this is helpful to debug the error.
        process.exit(1); // explore it more about exit codes 1,2,3 etc.
    }
}

export default connectDB;