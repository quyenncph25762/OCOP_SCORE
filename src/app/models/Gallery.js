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
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO gallerydetail (productDetail_id,imgUrl,imgName) VALUES (?,?,?)`
            const VALUES = [gallery.productDetail_id, gallery.imgUrl, gallery.imgName]
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, VALUES, ((err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            }))
        })
        connection.query(query, VALUES, callback)
    },
    deleteProductDetail: (productDetailId) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM gallerydetail WHERE _id = ${productDetailId}`
            if (!connection) {
                return reject(new Error("Database connection is not established"));
            }
            connection.query(query, ((err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            }))

        })
    },

}

module.exports = GalleryModel