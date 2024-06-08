const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fetch = require('node-fetch'); // Import fetch nếu bạn đang sử dụng node-fetch
dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE; // Sửa SECRET_CODE để lấy từ process.env
class CheckController {
    async checkout(req, res, next) {
        const token = req.cookies.User;
        if (!token) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập!"
            });
        }
        try {
            const payload = jwt.verify(token, SECRET_CODE);
            const userResponse = await fetch(`http://localhost:3000/auth/get/${payload?._id}`, {
                method: "GET"
            });
            if (!userResponse.ok) {
                return res.status(500).json({
                    message: "Lỗi khi lấy thông tin người dùng"
                });
            }

            const data = await userResponse.json();
            const RoleId = data?.RoleId;

            if (!RoleId) {
                return res.status(400).json({
                    message: "USER KHONG TON TAI TRONG HE THONG"
                });
            }

            if (RoleId !== 1) {
                return res.status(403).json({
                    message: "Bạn không có quyền để thực hiện hành động này",
                });
            }
            next(); // Chỉ gọi next() nếu không có lỗi nào xảy ra
        } catch (err) {
            if (err.name === "JsonWebTokenError") {
                return res.status(400).json({
                    message: "Token lỗi",
                });
            } else if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token hết hạn",
                });
            } else {
                return res.status(500).json({
                    message: "Lỗi xác thực token",
                });
            }
        }
    }
}

module.exports = new CheckController();
