const ApiError = require('../utils/ApiError')
const multer  = require('multer')

function fileFilter (req, file, cb) {
    if(file.mimetype.startsWith('image')) {
      cb(null,true)
  } else {
      cb(new ApiError('Not an image! Please upload only images.',400),false)
  }
}
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `src/public/images/${file.fieldname}`)
      },
      filename: function (req, file, cb) {
          // console.log(req.files.avatar)
          if(req.files.avatar || req.files.banner) {
            req.body[file.fieldname] =`${file.fieldname}-${req.user.id}-${Date.now()}.jpeg`
            cb(null,req.body[file.fieldname])
          }
          req.body.photos = [];
          if(file.fieldname ==='photos'){
            req.body.photos.push(`${file.fieldname}-${req.user.id}-${Date.now()}.jpeg`)
          }
      }
  })

  const uploadImage = multer({ storage: storage,fileFilter : fileFilter }).fields([
    {
      name : 'avatar',
      maxCount : 1
    },
    {
      name : 'photos',
      maxCount : 20
    },{
      name : 'banner',
      maxCount : 1
    }
  ])

module.exports = {
  uploadImage 
}
