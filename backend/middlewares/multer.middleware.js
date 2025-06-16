import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })

  const fileFilter = (req, file , cb)=>{
    const alowtypes = ["image/jpg" , "image/png" , "image/jpeg"]
  }
  
 const upload = multer({ 
    storage, 
})


export {upload} ;