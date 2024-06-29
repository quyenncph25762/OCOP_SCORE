const CustomerManagerModel = require("../../models/customer/CustomermanageModel")
const ProvinceModel = require("../../models/Province")
const DistrictModel = require("../../models/District")
const WardModel = require("../../models/Wards")
const AccountModel = require("../../models/Account")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const { SECRET_CODE } = process.env
class CustomerManageController {
    index(req, res) {
        const cookie = req.cookies
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 10; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const search = req.query.searchName || ''
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                CustomerManagerModel.getAllCustomer(User[0].DistrictId, (err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err)
                    }
                    ProvinceModel.getAllProvince((err, Province) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Lỗi truy vấn"
                            })
                        }
                        DistrictModel.getAllDistrict((err, District) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                            WardModel.getAllWard((err, Ward) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: "Lỗi truy vấn"
                                    })
                                }
                                else {
                                    console.log(data)
                                    const totalPages = Math.ceil(data.length / pageSize);
                                    const pages = Array.from({ length: totalPages }, (_, index) => {
                                        return {
                                            number: index + 1,
                                            active: index + 1 === page,
                                            isDots: index + 1 > 5
                                        };
                                    });
                                    const paginatedData = data.slice(startIndex, endIndex);
                                    // Chuẩn bị dữ liệu để truyền vào template
                                    const viewData = {
                                        search: search,
                                        Customer: paginatedData,
                                        User: User[0],
                                        Province: Province,
                                        District: District,
                                        Ward: Ward,
                                        pagination: {
                                            prev: page > 1 ? page - 1 : null,
                                            next: endIndex < data.length ? page + 1 : null,
                                            pages: pages,
                                        },
                                    };
                                    res.render('customer/customer_manage', viewData);
                                }

                            })
                        })
                    })
                })
            })
        }

    }
    getbyId() {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        CustomerManagerModel.getCustomerbyId((err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
            } else {
                const totalPages = Math.ceil(data_id.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data_id.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };

                res.render('customer/customer_manager', viewData);
            }
        })
    }
    create(req, res) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                CustomerManagerModel.findCustomerAdd(req.body, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Lỗi truy vấn"
                        })
                    }
                    if (results.length === 0) {
                        CustomerManagerModel.addCustomer(req.body, (err) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).json({
                                    message: "Lỗi truy vấn"
                                })
                            }
                            else {
                                return res.status(201).json({
                                    message: "Thêm thành công"
                                })
                            }
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: "Số điện thoại chủ thể đã tồn tại"
                        })
                    }
                })
            })
        }

    }
    edit(req, res) {
        const Id = req.params.id;
        CustomerManagerModel.getCustomerbyId(Id, (err, data_id) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
            }
            else {
                CustomerManagerModel.getAllCustomer((err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err);
                    }
                    else {
                        if (err) {
                            console.log('Lỗi truy vấn', err);
                        }
                        else {
                            res.render('customer/customer_manager', { data: data_id[0], data });
                        }
                    }
                })

            }
        })
    }
    update(req, res) {
        const cookie = req.cookies
        const customer_id = req.params.id;
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                CustomerManagerModel.findCustomerUpdate(customer_id, req.body, (err, data) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Lỗi truy vấn' });
                    }
                    if (data.length === 0) {
                        console.log(req.body)
                        CustomerManagerModel.updateCustomer(customer_id, req.body, (err, result) => {
                            if (err) {
                                // Xử lý lỗi nếu có
                                console.error('Lỗi khi cập nhật thông tin khách hàng:', err);
                                return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật thông tin khách hàng' });
                            } else {
                                return res.status(202).json({
                                    message: "Sửa thành công"
                                })
                            }
                        });
                    } else {
                        return res.status(400).json({
                            message: "Số điện thoại chủ thể đã tồn tại"
                        })
                    }
                })
            })
        }


    }
    delete(req, res, next) {
        const id = req.params.id
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                CustomerManagerModel.deleteCustomer(id, UserDataCookie?._id, (err, results) => {
                    if (err) {
                        console.error('Lỗi truy vấn:', err);
                        return res.status(500).send('Internal Server Error');
                    } else {
                        return res.status(203).json({
                            message: "Xóa thành công"
                        })

                    }
                })
            })
        }

    }
    deleteAll = async (req, res, next) => {
        try {
            console.log(req.body)
            const cookie = req.cookies
            if (cookie?.User) {
                const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
                AccountModel.fetchOneUser(UserDataCookie?._id, async (err, User) => {
                    if (err) {
                        return res.status(400).json({
                            message: err
                        })
                    }
                    for (const id of req.body) {
                        await CustomerManagerModel.deleteCustomerAll(id, UserDataCookie?._id)
                    }
                    return res.status(203).json({
                        message: "Xóa thành công"
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    // trash
    getAllTrash(req, res, next) {
        const cookie = req.cookies
        if (cookie?.User) {
            const UserDataCookie = jwt.verify(cookie.User, SECRET_CODE)
            AccountModel.fetchOneUser(UserDataCookie?._id, (err, User) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                }
                CustomerManagerModel.getAllCustomerFromTrash(User[0].DistrictId, (err, data) => {
                    if (err) {
                        console.log('Lỗi truy vấn', err)
                    }

                    res.render('customer/trash', { Customer: data, User: User[0] });
                })
            })
        }
    }
    deleteForever(req, res, next) {
        const id = req.params.id
        CustomerManagerModel.remove(id, (err, results) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            } else {
                return res.status(203).json({
                    message: "Xóa thành công"
                })
            }
        })
    }
    // khoi phuc
    revertCustomer(req, res, next) {
        const id = req.params.id
        CustomerManagerModel.revert(id, (err, results) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            } else {
                return res.status(203).json({
                    message: "Khôi phục thành công"
                })
            }
        })
    }
    // khoi phuc nhieu
    revertCustomerAll = async (req, res, next) => {
        try {
            for (const id of req.body) {
                await CustomerManagerModel.revertAll(id)
            }
            return res.status(203).json({
                message: "Khôi phục thành công"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CustomerManageController;
