const siteRouter = require('./site.routes');
const customerRouter = require('./customermanage.routes');
const productRouter = require('./productmanage.route');
const productGroupRouter = require("./productGroup.routes")
const reviewYearRouter = require("./yearreiview.routes")
const workDepartmentRouter = require("./workDepartment.routes")
const workPositionRouter = require("./workPosition.routes")
const roleRouter = require("./role.routes")
const employeeRouter = require("./employee.routes");

function route(app) {
    // image
    // employee
    app.use("/employee", employeeRouter)
    // Quản lí vai trò
    app.use("/role", roleRouter)
    // Vị trí chức danh
    app.use("/workPosition", workPositionRouter)
    // Phòng ban
    app.use("/workDepartment", workDepartmentRouter)
    // nhóm sản phẩm
    app.use('/product-group', productGroupRouter);
    // sản phẩm
    app.use('/product-manage', productRouter);
    // Chủ thể
    app.use('/customer-manage', customerRouter);
    // năm đánh giá
    app.use('/year-review', reviewYearRouter);
    app.use('/', siteRouter);
}

module.exports = route;