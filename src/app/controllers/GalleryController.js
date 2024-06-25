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
    create = async (req, res) => {
        const productDetailIds = req.body.productDetail_id; // Sẽ là một mảng các id
        // Bảo đảm productDetailIds luôn là một mảng
        const productDetailIdsArray = Array.isArray(productDetailIds) ? productDetailIds : [productDetailIds];
        const files = req.files;

        // if (!Array.isArray(productDetailIds) || productDetailIds.length !== files.length) {
        //     // return res.status(400).json({
        //     //     message: "Số lượng productDetail_id và files không khớp"
        //     // });
        //     console.log('1 phần tử')
        // }

        const galleryItems = files.map((file, index) => ({
            productDetail_id: Number(productDetailIdsArray[index]),
            imgUrl: file.path,
            imgName: file.originalname
        }));

        if (galleryItems.length > 0) {
            for (const item of galleryItems) {
                await GalleryModel.createGallery(item)
            }
            return res.status(200).json({
                message: "Tạo thành công"
            })
        } else {
            return res.status(200).json({
                message: "Không có file nào thay đổi"
            })
        }

    }
    delete = async (req, res) => {
        try {
            for (const id of req.body) {
                await GalleryModel.deleteProductDetail(id)
            }
            return res.status(200).json({
                message: "Xoa thanh cong"
            })
        } catch (error) {
            console.log(error)
        }
    }
    getGalleryByProDetail(req, res) {
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