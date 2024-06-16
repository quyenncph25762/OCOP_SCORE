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
            let count = 0
            let totalPartA = 0;
            // Phan B
            let totalPartB = 0;
            // Phan C
            let totalPartC = 0;
            // Phan D
            let totalPartD = 0;
            for (let i = 0; i < ListScoreFileDetail.length; i++) {
                if (ListScoreFileDetail[i].scoreTempDetail_maxScore > 5 && ListScoreFileDetail[i].scoreTempDetail_isScore === 0) {
                    count += 1
                }
                if (ListScoreFileDetail[i].scoreTempDetail_maxScore > 0 && ListScoreFileDetail[i].scoreTempDetail_isScore === 1) {
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
            }
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
        <div class="row">
            <div class="col-6" style="text-align: center; font-size: 16px;">
                <p style="text-align: center; max-width: 200px;">Huyện ${ScoreFile.product_district ? ScoreFile.product_district : "Hệ thống"}</p>
                <p style="font-weight: 600; text-wrap: wrap; max-width: 200px;">${ScoreFile.scorecommitee_name}</p>
            </div>
            <div class="col-6" style="text-align: center;">
                <p style="text-transform: uppercase; font-size: 16px; font-weight: 600;">Cộng Hòa xã hội chủ nghĩa việt nam</p>
                <p style="font-size: 14px;">Độc lập - Tự do - Hạnh phúc</p>
                <p style="font-weight: 600; margin-top: 16px; font-size: 14px;">${ScoreFile.formattedScoreDatePdf}</p>
            </div>
        </div>
        <!-- subhead -->
        <div style="padding-top: 40px;">
            <h5 class="text-center" style="text-transform: uppercase;">Phiếu đánh giá</h5>
            <ul style="list-style-type: none; font-size: 14px; margin-top: 20px;">
                <li style="margin-top:5px">
                    <strong>Tên sản phẩm:</strong>
                    <span style="text-transform: uppercase; text-wrap: wrap;">${ScoreFile.product_name}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Mã sản phẩm:</strong>
                    <span style="text-transform: uppercase; text-wrap: wrap;">${ScoreFile.product_code}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Tên chủ thể sản xuất:</strong>
                    <span style="text-transform: uppercase; text-wrap: wrap;">${ScoreFile.customer_name}</span>
                </li>
                <li style="margin-top:5px">
                    <strong>Địa chỉ:</strong>
                    <span style="text-transform: uppercase; text-wrap: wrap;">${ScoreFile.customer_address} ${ScoreFile.wardCustomer_name} ${ScoreFile.districtCustomer_name} tỉnh ${ScoreFile.cityCustomer_name}</span>
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

                return `
                            <tr>
                                ${item.scoreTempDetail_isScore ? `
                                    <td style="padding-left: 10px">
                                        ${item.scoreTempDetail_isScore && item.Score ? `☒` : "☐"}
                                    </td>
                                ` : `<td></td>`}
                                ${item.scoreTempDetail_name && !item.scoreTempDetail_isScore ? `
                                ${item.scoreTempDetail_maxScore > 10 ? `
                                <td colspan="3" class="text-center" style="text-transform: uppercase; font-weight: 600; font-size: 14px;padding: 20px 0">
                                        ${item.scoreTempDetail_name}
                                    </td>   
                                ` : `
                                <td colspan="3" style="text-transform: uppercase; font-weight: 500; font-size: 13px;padding: 6px 0">${item.scoreTempDetail_name}</td>
                                `}
                                    
                                ` : `
                                    <td style="font-weight: 400; font-size: 13px;padding-left: 10px">
                                        <p class="ml-2">
                                        ${item.scoreTempDetail_name} ${item.scoreTempDetail_validateRank ? repeatStarUpdate(item.scoreTempDetail_validateRank) : ""}
                                        </p>
                                    </td>
                                `}
                                <td>
                                    ${item.scoreTempDetail_maxScore >= 0 && item.scoreTempDetail_isScore ? item.scoreTempDetail_maxScore : ""}
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
                    <p>...., ${ScoreFile.formattedScoreDatePdf}</p>
                    <strong style="font-size: 16px;">Người dánh giá</strong>
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
