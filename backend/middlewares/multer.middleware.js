import multer from "multer";

const storage = multer.memoryStorage() ; 

  const fileFilter = (req, file , cb)=>{
    const allowtypes = ["image/jpg" , "image/png" , "image/jpeg"]
    if(allowtypes.includes(file.mimetype)){
      cb(null , true)
    }
    else {
      cb(new Error('only .jpg .png .jpeg allow ') , false)
    }
  }
  
 const upload = multer({ 
    storage, 
    fileFilter ,
    limits: { fileSize: 2 * 1024 * 1024 }
})


export {upload} ;

// {
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   }