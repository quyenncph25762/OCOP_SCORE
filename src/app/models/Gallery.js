const connection = require("../../config/db")

const GalleryModel = {
    getAllGallery: (callback) => {
        const query = `SELECT * FROM gallerydetail`
        connection.query(query, callback)
    },
    // hien thi anh theo productDetail
    getGalleryByProductDetail: (productDetailId, callback) => {
        const query = `SELECT * FROM gallerydetail WHERE productDetail_id = ?`
        connection.query(query, productDetailId, callback)
    },
    // xoa anh theo productDetail
    deleteGalleryByProductDetail: (productDetailId, callback) => {
        const query = `DELETE gallerydetail WHERE productDetail_id = ?`
        connection.query(query, [productDetailId], callback)
    },
    createGallery: (gallery, callback) => {
        const query = `INSERT INTO gallerydetail (productDetail_id,imgUrl,imgName) VALUES (?,?,?)`
        const VALUES = [gallery.productDetail_id, gallery.imgUrl, gallery.imgName]
        connection.query(query, VALUES, callback)
    },
    deleteProductDetail: (productDetailId, callback) => {
        const query = `DELETE FROM gallerydetail WHERE _id = ?`
        connection.query(query, productDetailId, callback)
    },

}

module.exports = GalleryModel