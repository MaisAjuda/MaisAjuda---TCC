const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname,"uploads"));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        
        callback(null, `${file.originalname}`);
    },
    limits:{
        fileSize:2 * 1024 * 1024
    },
    fileFilter:(req,file,callback)=>{
        const allowedMines = ["image/jpeg","image/jpg","image/png","image/gif"]
        if(allowedMines.includes(file.mimetype))callback(null, true)
        else callback(new Error('Tipo do arquivo inválido'))
    }
});

const upload = multer({ storage: storage });

module.exports = upload;