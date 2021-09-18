// const cloudinary = require('cloudinary')

class UploadController{
    // [GET] /user/

    index(req, res, next){
        return res.status(200).json({
            message: 'Upload'
        })
    }
}

module.exports = new UploadController