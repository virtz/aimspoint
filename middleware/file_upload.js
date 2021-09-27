const multer = require('multer');
const util = require("util");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'https://aimsassets.com/AppImages');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file'); 
let uploadFileMiddleware = util.promisify(upload);
module.exports = uploadFileMiddleware;
