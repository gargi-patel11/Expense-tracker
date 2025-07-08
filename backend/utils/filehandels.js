import { v2 as cloudinary } from 'cloudinary';
// import { response } from 'express';
import dotenv from "dotenv" 
dotenv.config();
import fs from "fs"
import streamifier from "streamifier";

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDE_NAME, 
        api_key:process.env.API_KEY, 
        api_secret: process.env.API_SECRET,
    });

    //upload on local storage 
    // const uploadOnCloudinary = async (localFilePath) => {

    //     try {
    //         if (!localFilePath) return null
    //         //upload the file on cloudinary
    //         const response = await cloudinary.uploader.upload(localFilePath, {
    //             resource_type: "auto"
    //         })
    //         // file has been uploaded successfull
    //         fs.unlinkSync(localFilePath)
    //         return response;
    
    //     } catch (error) {
    //          fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    //         return null;
    //     }
    // }


    const uploadOnCloudinary = async (buffer) => {

      if (!buffer) return null;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Cloudinary upload timeout"));
    }, 20000); // 20s max

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        clearTimeout(timeout);
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
    

    const deleteFile = async(LocalPath)=> {
        if (!LocalPath) return null
        LocalPath = LocalPath.split("/").pop()
        LocalPath = LocalPath.split(".")[0];
        
        const response = await cloudinary.v2.uploader.destroy(LocalPath, {
            resource_type : "auto"
        })



    }
    
    
    
    export {uploadOnCloudinary , deleteFile} 