const GalleryModel = require("../models/Gallery")

class GalleryController {
    getAll(req, res) {
        GalleryModel.getAllGallery((err, Gallery) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(Gallery)
        })
    }
    create(req, res) {
        console.log(req.file)
        GalleryModel.createGallery({
            productDetail_id: req.body.productDetail_id,
            imgUrl: req.file.path,
            imgName: req.file.originalname
        }, (err, Gallery) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(Gallery)
        })
    }
    delete(req, res) {
        const id = req.params.id
        GalleryModel.deleteProductDetail(id, (err, Gallery) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json({
                message: "Xoa thanh cong"
            })
        })
    }
    getGalleryByProDetail(req, res) {
        console.log(1)
        const productDetailId = req.params.id
        GalleryModel.getGalleryByProductDetail(productDetailId, (err, Gallery) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json(Gallery)
        })
    }
}

module.exports = new GalleryController