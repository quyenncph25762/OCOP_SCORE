const siteRouter = require('./site.routes');
const customerRouter = require('./customermanage.routes');
const productRouter = require('./productmanage.route');
const productGroupRouter = require("./productGroup.routes")
const reviewYearRouter = require("./yearreiview.routes")
const workDepartmentRouter = require("./workDepartment.routes")
const workPositionRouter = require("./workPosition.routes")
const roleRouter = require("./role.routes")
const employeeRouter = require("./employee.routes");
const filterProduct = require("./filterProduct.routes")
const scoreTempRouter = require("./scoreTemp.routes")
const citationRouter = require("./citation.routes")
const authRouter = require("./auth.routes")
// address
const citiesRouter = require("./city.routes")
const districtRouter = require("./districts")
const wardRouter = require("./wards.routes")

const productDetailRouter = require("./productDetail.routes")
const galleryRouter = require("./gallery.routes")
const clientRouter = require("./client/welcome.routes")
const scoreTempDetailRouter = require("./scoreTempDetail.routes")
const scoreCommitteeRouter = require("./scoreCommittee.routes")
const scoreCommitteeDetailRouter = require("./scoreCommitteeDetail.routes")
const scoreFileRouter = require("./scoreFile.routes")
const scoreFileDetailRouter = require("./scoreFileDetail.routes")
const userPageRouter = require("./userPage.routes")
const pdfRouter = require("./pdfRoutes.routes")
function route(app) {
    // pdf
    app.use("/pdf", pdfRouter)
    // userPage
    app.use("/users", userPageRouter)
    // client
    app.use("/client", clientRouter)
    // scoreFile
    app.use("/scoreFile", scoreFileRouter)
    app.use("/scoreFileDetail", scoreFileDetailRouter)
    // ScoreCommitteeDetail`
    app.use("/scoreCommitteeDetail", scoreCommitteeDetailRouter)
    // scoreCommittee
    app.use("/scoreCommittee", scoreCommitteeRouter)
    // gallery
    app.use("/gallery", galleryRouter)
    // productDetail
    app.use("/productDetail", productDetailRouter)
    // xa
    app.use("/wards", wardRouter)
    // Huyen
    app.use("/districs", districtRouter)
    // thanh pho
    app.use("/cities", citiesRouter)
    // user
    app.use("/auth", authRouter)
    // Phiếu chấm chi tiết
    app.use("/scoreTempDetail", scoreTempDetailRouter)
    // Phiếu chấm
    app.use("/scoreTemp", scoreTempRouter)
    // Tra cứu OCOP
    app.use("/filterProduct", filterProduct)
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
    // Viện dẫn
    app.use("/citation", citationRouter)
    // Chủ thể
    app.use('/customer-manage', customerRouter);
    // năm đánh giá
    app.use('/year-review', reviewYearRouter);

    app.use('/', siteRouter);
}

module.exports = route;