const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log(file)
    const allowedtyes =['image/png','image/jpeg','image/jpg']
    if(!allowedtyes.includes(file.mimetype)){
      return cb(new Error('Invalid file type'))
      }
    cb(null, './storage');  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });  

module.exports = {
  upload,  
};
