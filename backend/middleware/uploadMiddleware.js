const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,"uploads/");

    },


    filename:function(req,file,cb){

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});


const upload = multer({

    storage:storage,

    limits:{
        fileSize:5 * 1024 * 1024
    },

    fileFilter:function(req,file,cb){

        const fileTypes = /jpeg|jpg|png|webp/;

        const extname =
        fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );


        const mimetype =
        fileTypes.test(file.mimetype);


        if(extname && mimetype){

            cb(null,true);

        }else{

            cb(new Error("Only images allowed"));

        }

    }

});


module.exports = upload;