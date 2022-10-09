var ffmpeg = require("fluent-ffmpeg");

const fsService = require("../services/fs.service");
// open input stream
var infs = new ffmpeg();

const streamHls = (inpurtPath, outputPath, screenRatio, duration) => {
    infs.addInput(inpurtPath)
        .outputOptions([
            "-profile:v",
            "baseline",
            "-level 3.0",
            // "-s 640x360",
            `-s ${screenRatio}`,
            "-start_number 0",
            "-hls_time 10",
            "-hls_list_size 0",
            "-f hls",
            `${duration}`,
        ])
        .output(outputPath)
        .on("start", function (commandLine) {
            console.log("Spawned Ffmpeg with command: " + commandLine);
        })
        .on("error", function (err, stdout, stderr) {
            console.log("An error occurred: " + err.message, err, stderr);
        })
        .on("progress", function (progress) {
            console.log("Processing: " + progress.percent + "% done");
        })
        .on("end", function (err, stdout, stderr) {
            console.log("Finished processing!" /*, err, stdout, stderr*/);
        })
        .run();
};

const streamVideo = (fieldname) => {
    try {
        fieldname.forEach((ele) => {
            const path = ele.path;
            const filename = ele.filename.replace(".m3u8", "");
            fsService.createDirectory("posts", filename);
            streamHls(
                path,
                `./src/public/videos/posts/${filename}/${filename}.m3u8`,
                "1920x1080",
                "-t 03:00:00"
            );
        });
    } catch (error) {
        console.log(error);
    }
};

const streamStory = (fieldname) => {
    try {
        const path = fieldname.path;
        const filename = fieldname.filename.replace(".m3u8", "");
        fsService.createDirectory("stories", filename);
        streamHls(
            path,
            `./src/public/videos/stories/${filename}/${filename}.m3u8`,
            "1920x1080",
            "-t 00:00:25"
        );
        setTimeout(() => {
            fsService.deleteFile(fieldname.filename);
        }, 1000);
    } catch (error) {
        //console.log(error);
    }
};

module.exports = {
    streamVideo,
    streamStory,
};
