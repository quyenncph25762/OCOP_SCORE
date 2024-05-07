const path = require('path');
const multer = require('multer');

// Khởi tạo multer để xử lý tải lên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Import File/'); // Thư mục lưu trữ tệp tạm thời
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
module.exports = upload;