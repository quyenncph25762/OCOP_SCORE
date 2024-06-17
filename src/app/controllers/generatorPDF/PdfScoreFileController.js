const path = require('path');
const generatePDFutils = require('../../../utils/pdfGenerator');
const fs = require('fs');
const ScoreFileModel = require('../../models/scorefile/ScoreFileModel');
const ScoreDetailModel = require('../../models/scorefile/ScoreFileDetailModel');
class PdfScoreFileController {
    async generatePDF(req, res) {
        try {
            const scorefileId = req.params.scorefileId
            const scoreFileFount = await ScoreFileModel.getOne(scorefileId)
            const ScoreFile = scoreFileFount ? scoreFileFount[0] : []
            // lay danh sach scorefiledetail by scorefileId
            const ListScoreFileDetail = await ScoreDetailModel.getByScoreFileId(scorefileId)

            // tinh diem tong 
            // Phan A

            // count += tong
            let count = 0
            // tinh diem theo phan nho?
            let countPart = 0
            // 
            // count tong diem tung phan
            let countTotal = 0
            // count tong diem tung phan nho
            let countTotalPart = 0

            let totalPartA = 0;
            // Phan B
            let totalPartB = 0;
            // Phan C
            let totalPartC = 0;
            // Phan D
            let totalPartD = 0;

            let totalPartALittle = 0
            let totalPartBLittle = 0
            let totalPartCLittle = 0
            let totalPartDLittle = 0
            let totalPartELittle = 0
            let totalPartGLittle = 0
            let totalPartHLittle = 0
            let totalPartILittle = 0
            let totalPartKLittle = 0
            let totalPartLLittle = 0
            let totalPartMLittle = 0
            let totalPartSLittle = 0
            // phan theo cau hoi
            let checkBoxScoreName = "Score0"
            let checkboxScore = 0



            // Tạo mảng chứa tất cả số điểm nhưng k có productdetail kết thúc
            let allIsScoreForScoreTempDetail = []
            // tạo 1 mảng chứa tất cả số điểm
            const allIsScore = []


            // tao ra 1 arr động chua cac cau hoi trong khoang tu scoreTempDetail_productDetailId nay , den scoreTempDetail_productDetailId kia
            var arrIsScore = []
            // mang tat ca so to
            const arrScoreMax = []
            // tao vong lap o ngoai de tinh diem tong

            for (let i = 0; i < ListScoreFileDetail.length; i++) {
                // Nếu productDetail
                if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                    if (arrIsScore.length > 0) {
                        // mảng này để tính những score còn xót lại
                        arrIsScore.map((number) => {
                            allIsScoreForScoreTempDetail.push(number)
                        })
                        // Lấy những số số lớn nhất trong từng khoảng cách productdetail này đến productdetail kia rồi push vào mảng
                        const maxNumber = Math.max(...arrIsScore)
                        arrScoreMax.push(maxNumber)
                        // sau khi xét xong thì đặt arr là rỗng
                        arrIsScore = []
                    }
                }
                // if (arrIsScore.length > 0) {
                //     console.log(arrIsScore)
                // }

                if (ListScoreFileDetail[i].scoreTempDetail_maxScore > 5 && ListScoreFileDetail[i].scoreTempDetail_isScore === 0) {
                    count += 1
                }

                // tinh diem theo cau hoi
                if (ListScoreFileDetail[i].scoreTempDetail_maxScore >= 0 && ListScoreFileDetail[i].scoreTempDetail_isScore === 1) {
                    arrIsScore.push(ListScoreFileDetail[i].scoreTempDetail_maxScore)
                    allIsScore.push(ListScoreFileDetail[i].scoreTempDetail_maxScore)
                    // tinh diem theo phan
                    if (count === 1) {
                        if (ListScoreFileDetail[i].Score !== null) {
                            totalPartA += ListScoreFileDetail[i].Score
                        }
                    } else if (count === 2) {
                        if (ListScoreFileDetail[i].Score !== null) {
                            totalPartB += ListScoreFileDetail[i].Score
                        }
                    } else if (count === 3) {
                        if (ListScoreFileDetail[i].Score !== null) {
                            totalPartC += ListScoreFileDetail[i].Score
                        }
                    }



                }
                // tinh diem theo phan nho

            }
            // Lấy những số còn lại khi k có productdetail kết thúc
            let numberSlice = allIsScore.length - allIsScoreForScoreTempDetail.length
            const arrNumber = Math.max(...allIsScore.slice(- numberSlice))
            arrScoreMax.push(arrNumber)
            let index = -1
            // Sau khi có những số còn lại thì lấy ra những điểm cao nhất của mảng đó , push vào mảng chứa những số lớn
            for (let i = 0; i < ListScoreFileDetail.length; i++) {
                // tinh diem theo phan nho?
                if (ListScoreFileDetail[i].scoreTempDetail_isScore === 0 && Number(ListScoreFileDetail[i].scoreTempDetail_name[1])) {
                    countPart += 1
                }
                if (countPart === 1) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartALittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 2) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartBLittle += arrScoreMax[index += 1]

                    }
                } else if (countPart === 3) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartCLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 4) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartDLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 5) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartELittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 6) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartGLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 7) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartHLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 8) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartILittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 9) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartKLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 10) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartLLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 11) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartMLittle += arrScoreMax[index += 1]
                    }
                } else if (countPart === 12) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalPartSLittle += arrScoreMax[index += 1]
                    }
                }
            }
            let i = -1
            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>phieu-cham-${ScoreFile.employee_FullName}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html {
            font-family: 'Times New Roman', Times, serif !important;
            height: 100vh;
            width: 100%;
        }
        body {
            width: 100%;
        }
        p {
            margin: 0 !important;
        }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="" style="min-width:100%; padding:40px">
        <!-- head -->
        <div class="" style="display: flex;justify-content:space-between;align-items:center;width:100%">
            <div class="" style="text-align: center; font-size: 16px;">
                <p style="text-align: center; max-width: 200px;">${ScoreFile.product_district ? ScoreFile.product_district : "Hệ thống"}</p>
                <p style="font-weight: 600; max-width: 200px;">${ScoreFile.scorecommitee_name}</p>
            </div>
            <div class="" style="text-align: center;">
                <p style="text-transform: uppercase; font-size: 16px; font-weight: 600;">Cộng Hòa xã hội chủ nghĩa việt nam</p>
                <p style="font-size: 14px;">Độc lập - Tự do - Hạnh phúc</p>
            </div>
        </div>
        <!-- subhead -->
        <div style="padding-top: 40px;">
            <h5 class="text-center" style="text-transform: uppercase;">Phiếu đánh giá</h5>
            <ul style="list-style-type: none; font-size: 13px; margin-top: 20px;padding:0">
                <li style="margin-top:5px">
                    <strong>Tên sản phẩm:</strong>
                    <span style="text-transform: uppercase;">${ScoreFile.product_name}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Mã sản phẩm:</strong>
                    <span style="text-transform: uppercase;">${ScoreFile.product_code}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Tên chủ thể sản xuất:</strong>
                    <span style="text-transform: uppercase;">${ScoreFile.customer_name}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Địa chỉ:</strong>
                    <span style="text-transform: uppercase;">${ScoreFile.customer_address} ${ScoreFile.wardCustomer_name} ${ScoreFile.districtCustomer_name} tỉnh ${ScoreFile.cityCustomer_name}</span>
                </li>
                <p style="font-size: 12px; color: red; font-style: italic; padding-top: 20px;">
                    Bị loại khi: Giả mạo hồ sơ hoặc không đủ điều kiện bắt buộc để sản xuất sản phẩm theo quy định quản lí chuyên ngành của bộ Y Tế hoặc không có bản công bố sản phẩm (hoặc tương đương)
                </p>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    ${ListScoreFileDetail.map((item, index) => {
                if (item.scoreTempDetail_maxScore > 10 && item.scoreTempDetail_isScore === 0) {
                    countTotal += 1
                }

                if (item.scoreTempDetail_isScore === 0 && Number(item.scoreTempDetail_name[1])) {
                    countTotalPart += 1
                }

                return `
                            <tr key="${index}">
                                ${item.scoreTempDetail_isScore ? `
                                    <td>
                                        ${item.scoreTempDetail_isScore && item.Score ? `☒` : "☐"}
                                    </td>
                                ` : ``}
                                ${item.scoreTempDetail_name && !item.scoreTempDetail_isScore ? `
                                    ${item.scoreTempDetail_maxScore > 10 ? `
                                        <td colspan="3" class="text-center" style="text-transform: uppercase; font-weight: 600; font-size: 14px; padding: 20px 0; border: 2px solid #000">
                                            <p>${item.scoreTempDetail_name}</p>
                                            <p class="text-center mt-2" style="font-size:13px">${countTotal === 1 && totalPartA ? `Tổng điểm phần A: ${totalPartA} điểm` : ""}</p>
                                            <p class="text-center mt-2" style="font-size:13px">${countTotal === 2 && totalPartB ? `Tổng điểm phần B: ${totalPartB} điểm` : ""}</p>
                                            <p class="text-center mt-2" style="font-size:13px">${countTotal === 3 && totalPartC ? `Tổng điểm phần C: ${totalPartC} điểm` : ""}</p>
                                        </td>
                                    ` :
                            `${`<td colspan="2">
                                    
                                    ${item.scoreTempDetail_isScore === 0 && Number(item.scoreTempDetail_name[1])
                                ?
                                `<p style="font-weight: 500; font-size: 12px; padding: 6px 0;text-transform: uppercase">${item.scoreTempDetail_name}
                               ${countTotalPart === 1 && totalPartALittle ? `(${totalPartALittle} điểm)` : ""}
                               ${countTotalPart === 2 && totalPartBLittle ? `(${totalPartBLittle} điểm)` : ""}
                               ${countTotalPart === 3 && totalPartCLittle ? `(${totalPartCLittle} điểm)` : ""}
                               ${countTotalPart === 4 && totalPartDLittle ? `(${totalPartDLittle} điểm)` : ""}
                               ${countTotalPart === 5 && totalPartELittle ? `(${totalPartELittle} điểm)` : ""}
                               ${countTotalPart === 6 && totalPartGLittle ? `(${totalPartGLittle} điểm)` : ""}
                               ${countTotalPart === 7 && totalPartHLittle ? `(${totalPartHLittle} điểm)` : ""}
                               ${countTotalPart === 8 && totalPartILittle ? `(${totalPartILittle} điểm)` : ""}
                               ${countTotalPart === 9 && totalPartKLittle ? `(${totalPartKLittle} điểm)` : ""}
                               ${countTotalPart === 10 && totalPartLLittle ? `(${totalPartLLittle} điểm)` : ""}
                               ${countTotalPart === 11 && totalPartMLittle ? `(${totalPartMLittle} điểm)` : ""}
                               ${countTotalPart === 12 && totalPartSLittle ? `(${totalPartSLittle} điểm)` : ""}
                                </p>`
                                :
                                `
                                <p style="font-weight: 400; font-size: 12px; padding: 6px 0;font-style:italic">${item.scoreTempDetail_name}</p>
                                `
                            }
                                    </td>`}

                                    
                                    `}
                                ` :
                        `
                                    <td style="font-weight: 400; font-size: 12px; padding-left: 10px; max-width:600px">
                                        <p class="ml-2">${item.scoreTempDetail_name} ${item.scoreTempDetail_validateRank ? repeatStarUpdate(item.scoreTempDetail_validateRank) : ""}</p>
                                    </td>
                                `}
                                <td>
                                    ${item.scoreTempDetail_maxScore >= 0 && item.scoreTempDetail_isScore ? `
                                        <p style="font-size:12px">${item.scoreTempDetail_maxScore}</p>
                                    ` : `
                                        ${item.scoreTempDetail_productDetailId ? `<p style="font-weight:600; font-size:12px;border-bottom:1px solid #ccc">${arrScoreMax.length > 0 && arrScoreMax[i += 1]}</p>` : ""}
                                    `}
                                </td>
                            </tr>
                        `;
            }).join('')}
                </tbody>
            </table>
            <div class="" style="border: 1px solid #ccc; padding: 16px;">
                <p>Kết quả:</p>
                <div class="text-center">
                    <p>Tổng điểm (Phần A + B + C): ${totalPartA + totalPartB + totalPartC} Điểm</p>
                    <p>Xếp hạng: ${ScoreFile.RankOcop} sao</p>
                </div>
            </div>
            <div class="" style="padding: 16px;">
                <p style="text-decoration: dashed;">Ý kiến người đánh giá</p>
                <textarea name="" id="" style="width: 100%;">${ScoreFile.Note}</textarea>
            </div>
            <div class="" style="display: flex; justify-content: end;">
                <div style="font-size: 14px; text-align: center;">
                    <p>Tỉnh ${ScoreFile.cityCustomer_name}, ${ScoreFile.formattedScoreDatePdf}</p>
                    <strong style="font-size: 16px;">Người đánh giá</strong>
                    <p>(Ký và ghi rõ họ tên)</p>
                    <p style="font-size: 18px; font-weight: 550; padding-top: 14px;">${ScoreFile.employee_FullName}</p>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;


            function repeatStarUpdate(number) {
                let star = ""
                for (let i = 0; i < number; i++) {
                    star += "*"
                }
                return star
            }
            const outputPath = path.join(__dirname, `../../../../Uploads/phieu-cham-${ScoreFile.employee_FullName}.pdf`);
            console.log(`Saving PDF to: ${outputPath}`);

            // Tạo file PDF và lưu tại outputPath
            await generatePDFutils(htmlContent, outputPath);

            // Đảm bảo file PDF đã được tạo thành công
            if (fs.existsSync(outputPath)) {
                console.log("File PDF đã được tạo thành công.");
                // Gửi file PDF về client
                res.download(outputPath, `phieu-cham-${ScoreFile.employee_FullName}.pdf`, (err) => {
                    if (err) {
                        console.error("Lỗi khi tải file PDF:", err);
                        return res.status(500).send({
                            message: "Lỗi khi tải file PDF",
                            error: err.message
                        });
                    }
                    console.log("File PDF đã được tải xuống thành công!");
                });
            } else {
                console.error("File PDF không tồn tại tại đường dẫn:", outputPath);
                return res.status(500).send({
                    message: "File PDF không tồn tại"
                });
            }
        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({
                message: "Lỗi server",
                error: error.message
            });
        }
    }
}

module.exports = new PdfScoreFileController();
