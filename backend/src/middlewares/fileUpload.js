const multer = require("multer");
// const config = require("../config/config.json");
const path = require("path");
const imageStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    console.log("🚀 ~ file: fileUpload.js:8 ~ file:",  file.fieldname)
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fieldSize: 5248000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Valid Image"));
    }
    cb(undefined, true);
  },
});


module.exports.upload = multer({ 
  storage: imageStorage ,
  limits: {
    fieldSize: 5248000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Valid Image"));
    }
    cb(undefined, true);
  },


});
