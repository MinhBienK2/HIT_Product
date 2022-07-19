const ApiError = require("../utils/ApiError");
const multer = require("multer");

function fileFilterImage(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            new ApiError("Not an image ! Please upload only images .", 400),
            false
        );
    }
}

function fileFilterVideo(req, file, cb) {
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    } else {
        cb(
            new ApiError("Not an video ! Please upload only video .", 400),
            false
        );
    }
}

function fileFilterStory(req, file, cb) {
    try {
        if (
            (file.mimetype.startsWith("video") && file.fieldname === "story") ||
            (file.mimetype.startsWith("image") && file.fieldname === "story")
        )
            cb(null, true);
        else {
            cb(
                new ApiError(
                    "Not an video or image ! Please upload only video or image .",
                    400
                ),
                false
            );
        }
    } catch (error) {
        console.log(error);
    }
}

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        //   console.log(file);
        if (
            file.fieldname === "avatar" ||
            file.fieldname === "banner" ||
            file.fieldname === "photos"
        ) {
            cb(null, `src/public/images/${file.fieldname}`);
        }
    },
    filename: function (req, file, cb) {
        // console.log(req.files.avatar)
        console.log(file);
        if (req.files.avatar || req.files.banner) {
            const nameImage = `${file.fieldname}-${
                req.user.id
            }-${Date.now()}.jpeg`;
            req.body[
                file.fieldname
            ] = `http://localhost:3000/images/${file.fieldname}/${nameImage}`;
            cb(null, nameImage);
        }
        // req.body.photos = [];
        // if (file.fieldname === "photos") {
            console.log(req.body.photos)
        if (req.files.photos) {
            const nameImage = `${file.fieldname}-${
                req.user.id
            }-${Date.now()}.jpeg`;
            cb(null, nameImage);
        }
    },
});

const storageVideo = multer.diskStorage({
    filename: function (req, file, cb) {
        req.body.videos = [];
        const name = `${file.fieldname}-${req.user.id}-${Date.now()}.m3u8`;
        const name2 = `${file.fieldname}-${req.user.id}-${Date.now()}`;
        if (file.fieldname === "videos") {
            req.body.videos.push(
                `http://localhost:3000/videos/${file.fieldname}/${name2}/${name}`
            );
            cb(null, name);
        }
    },
});

const storageStory = multer.diskStorage({
    destination: function (req, file, cb) {
        //   console.log(file);
        if (file.fieldname === "story" && file.mimetype.startsWith("image"))
            cb(null, `src/public/images/stories`);
        if (file.fieldname === "story" && file.mimetype.startsWith("video"))
            cb(null, `src/public/videos/`);
    },
    filename: function (req, file, cb) {
        console.log(file);
        if (file.mimetype.startsWith("image") && file.fieldname === "story") {
            const nameImage = `${file.fieldname}-${
                req.user.id
            }-${Date.now()}.jpeg`;
            req.body[
                file.fieldname
            ] = `http://localhost:3000/images/${file.fieldname}/${nameImage}`;
            cb(null, nameImage);
        }
        const nameVideo = `${file.fieldname}-${req.user.id}-${Date.now()}.m3u8`;
        const nameVideo2 = `${file.fieldname}-${req.user.id}-${Date.now()}`;
        if (file.fieldname === "story" && file.mimetype.startsWith("video")) {
            req.body.story = `http://localhost:3000/videos/${file.fieldname}/${nameVideo2}/${nameVideo}`;
            cb(null, nameVideo);
        }
    },
});

const uploadImage = multer({
    storage: storageImage,
    fileFilter: fileFilterImage,
}).fields([
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "photos",
        maxCount: 20,
    },
    {
        name: "banner",
        maxCount: 1,
    },
]);

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo,
}).fields([
    {
        name: "videos",
        maxCount: 5,
    },
]);

const uploadStory = multer({
    storage: storageStory,
    fileFilter: fileFilterStory,
}).single("story");

module.exports = {
    uploadImage,
    uploadVideo,
    uploadStory,
};
