const CustomerManagerModel = require("../models/CustomermanageModel")
class CustomerManageController {
    index(req, res) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        CustomerManagerModel.getAllCustomer((err, data) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
            } else {
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
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };

                res.render('customer/customer_manage', viewData);
            }
        })
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
        const customer_name = req.body.customer_name;
        const customer_phone = req.body.customer_phone;
        const customer_address = req.body.customer_address;
        const customer_otherName = req.body.customer_otherName;
        const customer_email = req.body.customer_email;
        const form = {
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_address: customer_address,
            customer_otherName: customer_otherName,
            customer_email: customer_email
        };
        CustomerManagerModel.findCustomer(customer_name, customer_phone, customer_address, customer_otherName, customer_email, (err, results) => {
            if (err) {
                console.log('Lỗi truy vấn', err);
                res.json({ success: false, message: 'Lỗi truy vấn' });
            }
            else {
                if (results.length === 0) {
                    CustomerManagerModel.addCustomer(form, (err) => {
                        if (err) {
                            console.log('lỗi truy vấn', err);
                            res.json({ success: false, message: 'Lỗi truy vấn' });
                        }
                        else {
                            res.redirect('back');
                        }
                    })
                }
                else {
                    // Nếu khách hàng đã tồn tại, trả về thông báo cho người dùng
                    res.json({ success: false, message: 'Khách hàng đã tồn tại trong cơ sở dữ liệu' });
                }

            }
        })
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
        const customer_id = req.params.id; // ID của khách hàng cần cập nhật
        const { customer_name, customer_phone, customer_address, customer_otherName, customer_email } = req.body; // Thông tin mới của khách hàng
        // Gọi hàm updateCustomer từ model
        CustomerManagerModel.updateCustomer(customer_id, { customer_name, customer_phone, customer_address, customer_otherName, customer_email }, (err, result) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật thông tin khách hàng:', err);
                res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật thông tin khách hàng' });
            } else {
                res.redirect('back');
            }
        });
    }
    delete(req, res, next) {
        const id = req.params.id
        CustomerManagerModel.deleteCustomer(id, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn:', err);
                return res.status(500).send('Internal Server Error');
            } else {
                return res.status(203).json({
                    message: "Xoa thanh cong"
                }, res.redirect('back'))

            }
        })
    }
    // trash
    getAllTrash(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 8; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchItem = req.query.search || '';
        CustomerManagerModel.getAllCustomerFromTrash((err, data) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
            } else {
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
                    data: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                res.render('customer/trash', viewData);
            }
        })
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
}

module.exports = new CustomerManageController;
