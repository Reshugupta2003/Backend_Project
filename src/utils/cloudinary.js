import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
 try {
    if(!localFilePath) return null;

    //upload on cloudinary
    const responce = await cloudinary.uploader.upload(localFilePath,{
       resource_type : "auto"
    })
    //file upload successfully
    console.log("File upload successfully on cloudinary", responce.url);
    return responce;

 } catch (error) {
    fs.unlinkSync(localFilePath) // remove locally save temparory file if upload operation get failed.
    return null; 
 }
}

export {uploadOnCloudinary};

// First we upload a file on our local server storage area then send on cloudinary (two step process), don't take directly from user and send it to on cloudinary.