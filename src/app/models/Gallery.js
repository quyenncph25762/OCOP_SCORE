const connection = require("../../config/db")

const GalleryModel = {
    getAllGallery: (callback) => {
        const query = `SELECT * FROM gallerydetail`
        connection.query(query, callback)
    },
    getGalleryByProductDetail: (productDetailId, callback) => {
        const query = `SELECT * FROM gallerydetail WHERE productDetail_id = ? ORDER BY _id ASC`
        connection.query(query, productDetailId, callback)
    },
    createGallery: (gallery, callback) => {
        const query = `INSERT INTO gallerydetail (productDetail_id,imgUrl,imgName) VALUES (?,?,?)`
        const VALUES = [gallery.productDetail_id, gallery.imgUrl, gallery.imgName]
        connection.query(query, VALUES, callback)
    },
    deleteProductDetail: (productDetailId, callback) => {
        const query = `SELECT * FROM gallerydetail WHERE _id = ?`
        connection.query(query, productDetailId, callback)
    },
}

module.exports = GalleryModel