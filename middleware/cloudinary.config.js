const multer = require("multer");
const path = require("path");

var upload = multer({ dest: path.resolve(__dirname, "../", './uploads') })

module.exports = upload;