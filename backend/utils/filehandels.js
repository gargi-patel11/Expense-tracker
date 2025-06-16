import { v2 as cloudinary } from 'cloudinary';
// import { response } from 'express';
import dotenv from "dotenv" 
dotenv.config();
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDE_NAME, 
        api_key:process.env.API_KEY, 
        api_secret: process.env.API_SECRET,
    });
    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded successfull
            //console.log("file is uploaded on cloudinary ", response.url);
            fs.unlinkSync(localFilePath)
            return response;
    
        } catch (error) {
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }

    const deleteFile = async(LocalPath)=> {
        if (!LocalPath) return null
        LocalPath = LocalPath.split("/").pop()
        LocalPath = LocalPath.split(".")[0];
        
        const response = await cloudinary.v2.uploader.destroy(LocalPath, {
            resource_type : "auto"
        })



    }
    
    
    
    export {uploadOnCloudinary , deleteFile} 