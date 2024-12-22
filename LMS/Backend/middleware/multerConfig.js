const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log(file)
    const allowedtyes =['image/png','image/jpeg','image/jpg']
    if(!allowedtyes.includes(file.mimetype)){
       cb(new Error('Invalid file type'))
       return
      }
    cb(null, './storage');  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});
 
module.exports = {
  storage,
  multer  
};
