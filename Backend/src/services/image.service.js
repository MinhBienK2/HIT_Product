const ApiError = require('../utils/ApiError')
const multer  = require('multer')

function fileFilter (req, file, cb) {
  if(file.mimetype.startsWith('image')) {
      cb(null,true)
  } else {
      cb(new ApiError('Not an image! Please upload only images.',400), false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/public/images/${file.fieldname}`)
  },
  filename: function (req, file, cb) {
    // console.log(req.files.avatar)
    // if(req.files.avatar || req.files.banner) {
      const fileName = `${file.fieldname}-${req.user.id}-${Date.now()}.jpeg`
      cb(null, fileName)
    // }
    // req.body.photos = [];
    // if(file.fieldname ==='photos'){
    //   req.body.photos.push(`${file.fieldname}-${req.user.id}-${Date.now()}.jpeg`)
    // }
    }
})

  const upload = multer({ storage: storage, fileFilter : fileFilter })

  const uploadImage = upload.fields([
    {
      name : 'avatar',
      maxCount : 1
    },
    {
      name : 'photos',
      maxCount : 20
    },
    {
      name : 'banner',
      maxCount : 1
    }
  ])

module.exports = {
  uploadImage 
}
