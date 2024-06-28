
const multer = require('multer');
const iconv = require('iconv-lite');
// Khởi tạo multer để xử lý tải lên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/'); // Thư mục lưu trữ tệp tạm thời
    },
    filename: function (req, file, cb) {
        const originalname = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
      
        cb(null, originalname);
    }
});
const upload = multer({ storage: storage });
module.exports = upload;