const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Permission = require('../models/permission/permissionModle')
const Employee = require('../models/employee/EmployeeModel');
const WelcomeController = require("../controllers/clients/WelcomeController");
// Import fetch nếu bạn đang sử dụng node-fetch
dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE; // Sửa SECRET_CODE để lấy từ process.env
// class CheckController {
//     async checkout(req, res, next) {
//         const token = req.cookies.User;
//         if (!token) {
//             return res.status(400).json({
//                 message: "Bạn chưa đăng nhập!"
//             });
//         }
//         try {
//             const payload = jwt.verify(token, SECRET_CODE);
//             const userResponse = await fetch(`http://localhost:3000/auth/get/${payload?._id}`, {
//                 method: "GET"
//             });
//             if (!userResponse.ok) {
//                 return res.status(500).json({
//                     message: "Lỗi khi lấy thông tin người dùng"
//                 });
//             }

//             const data = await userResponse.json();
//             const RoleId = data?.RoleId;

//             if (!RoleId) {
//                 return res.status(400).json({
//                     message: "USER KHONG TON TAI TRONG HE THONG"
//                 });
//             }

//             if (RoleId !== 1) {
//                 return res.status(403).json({
//                     message: "Bạn không có quyền để thực hiện hành động này",
//                 });
//             }
//             next(); // Chỉ gọi next() nếu không có lỗi nào xảy ra
//         } catch (err) {
//             if (err.name === "JsonWebTokenError") {
//                 return res.status(400).json({
//                     message: "Token lỗi",
//                 });
//             } else if (err.name === "TokenExpiredError") {
//                 return res.status(401).json({
//                     message: "Token hết hạn",
//                 });
//             } else {
//                 return res.status(500).json({
//                     message: "Lỗi xác thực token",
//                 });
//             }
//         }
//     }
// }
const checkout = (NamePermission) => {
    return (req, res, next) => {
        const token = req.cookies.User;
        if (token) {
            const payload = jwt.verify(token, SECRET_CODE);
            Employee.getOneEmployee(payload._id, (err, data) => {
                if (err) {
                    console.log('Error', err)
                } else {
                    Permission.getAllPermissionBy_Role_And_Name(data[0]?.RoleId, NamePermission, (err, results) => {
                        if (err) {
                            console.log('Error', err)
                        }
                        else {
                            if (results.length > 0) {
                                Permission.getAllPermissionBy_Role(data[0].RoleId, (err, result) => {
                                    if (err) {
                                        console.log('Error', err)
                                    }
                                    else {
                                        var permission = result.map(item => {
                                            return item.NamePermission
                                        })
                                        res.locals.permission = permission
                                        next()
                                    }
                                })
                            }
                            else {
                                Permission.getAllPermissionBy_Role_And_Name(data[0]?.RoleId, 'Client', (err, results) => {
                                    if (err) {
                                        console.log('Error', err)
                                    }
                                    else {
                                        if (results.length > 0) {
                                            Permission.getAllPermissionBy_Role(data[0].RoleId, (err, result) => {
                                                if (err) {
                                                    console.log('Error', err)
                                                }
                                                else {
                                                    var permission = result.map(item => {
                                                        return item.NamePermission
                                                    })
                                                    res.locals.permission = permission
                                                    WelcomeController.index(req, res, next);
                                                }
                                            })
                                        }
                                        else {
                                            res.redirect('/auth/loginPage')
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
        } else {
            res.redirect('/auth/loginPage')
        }
    }

}
module.exports = { checkout }
