const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const fs = require("fs");
const path = require("path");

const createDirectory = (dirName, filename) => {
   fs.mkdir(
      path.join(__dirname, `/../public/videos/${dirName}/${filename}`),
      { recursive: true },
      function (err) {
         if (err) {
            console.log(err);
         } else {
            console.log("New directory successfully created.");
         }
      }
   );
};

const deleteFile = (filename) => {
   const pathFile = path.join(__dirname, `/../public/videos/${filename}`);
   fs.unlinkSync(pathFile);
};

const deleteDirectoryOrFile = (fieldName, name, typeFile) => {
   let pathName;
   if (typeFile === "video") {
      pathName = path.join(__dirname, `/../public/videos/${fieldName}/${name}`);
      fs.rmSync(pathName, { recursive: true, force: true });
   } else if (typeFile === "image") {
      pathName = path.join(__dirname, `/../public/images/${fieldName}/${name}`);
      fs.unlinkSync(pathName);
   } else {
      return new ApiError("not foud directory or file !", 400);
   }
};

module.exports = {
   createDirectory,
   deleteFile,
   deleteDirectoryOrFile,
};
