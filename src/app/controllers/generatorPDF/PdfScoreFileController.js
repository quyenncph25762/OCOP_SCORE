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



                // 
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
                    } else {
                        if (ListScoreFileDetail[i].Score !== null) {
                            totalPartD += ListScoreFileDetail[i].Score
                        }
                    }



                }
                // tinh diem theo phan nho

            }
            let totalParts = new Array(20).fill(0);
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
                if (countPart >= 1) {
                    if (ListScoreFileDetail[i].scoreTempDetail_productDetailId) {
                        totalParts[countPart - 1] += arrScoreMax[index += 1];
                    }
                }

            }
            let i = -1
            let totalPartsIndex = -1
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
            height: 100vh;
            width: 100%;
        }
        body {
         font-family: 'Times New Roman', Times, serif !important;
            width: 100%;
        }
        p {
            margin: 0 !important;
        }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="" style="min-width:100%">
        <!-- head -->
        <div class="" style="display: flex;justify-content:space-between;align-items:center;width:100%">
            <div class="" style="text-align: center; font-size: 16px;">
                <p style="text-align: center; max-width: 200px;">${ScoreFile.product_district ? ScoreFile.product_district : "Hệ thống"}</p>
                <p style="font-weight: 600; max-width: 200px;">${ScoreFile.scorecommitee_name}</p>
            </div>
            <div class="" style="text-align: center; font-weight: 600">
                <p style="text-transform: uppercase; font-size: 16px;">Cộng Hòa xã hội chủ nghĩa việt nam</p>
                <p style="font-size: 14px;">Độc lập - Tự do - Hạnh phúc</p>
            </div>
        </div>
        <!-- subhead -->
        <div style="padding-top: 40px;">
            <h5 class="text-center" style="text-transform: uppercase;font-weight: 600">Phiếu đánh giá</h5>
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
                    Bị loại khi: Giả mạo hồ sơ hoặc không tuân thủ đầy đủ các quy định về giấy chứng nhận cơ sở đủ điều kiện ATTP (hoặc tương đương); hoặc Hồ sơ tự công bố sản phẩm, ghi nhãn sản phẩm không đúng theo quy định; hoặc không đáp ứng quy định Hồ sơ dự thi theo quy định.
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
                                        <td colspan="3" class="text-center" style="text-transform: uppercase; font-weight: 600; font-size: 14px;padding: 20px 0;">
                                        <div style="border: 1px solid #000;">
                                            <p>${item.scoreTempDetail_name}</p>
                                            <p class="text-center mt-1" style="font-size:13px"> ${countTotal === 1 && totalPartA ? `Tổng điểm phần A: <span style="color:red"> ${totalPartA}</span> điểm` : ""}</p>
                                            <p class="text-center mt-1" style="font-size:13px"> ${countTotal === 2 && totalPartB ? `Tổng điểm phần B:<span style="color:red"> ${totalPartB}</span> điểm` : ""}</p>
                                            <p class="text-center mt-1" style="font-size:13px">${countTotal === 3 && totalPartC ? `Tổng điểm phần C: <span style="color:red"> ${totalPartC}</span> điểm` : ""}</p>
                                            <p class="text-center mt-1" style="font-size:13px">${countTotal === 4 && totalPartD ? `Tổng điểm phần D: <span style="color:red"> ${totalPartD}</span> điểm` : ""}</p>
                                        </div>
                                        </td>
                                    ` :
                            `${`<td colspan="2" style="max-width:300px;">
                                    
                                    ${item.scoreTempDetail_isScore === 0 && Number(item.scoreTempDetail_name[1])
                                ?
                                `<p style="font-weight: 600; font-size: 12px; padding: 6px 0;text-transform: uppercase;text-wrap:wrap">${item.scoreTempDetail_name}
                               ${totalParts ? `(${totalParts[totalPartsIndex += 1]} điểm)` : ""}
                                </p>`
                                :
                                `
                                <p style="${item.scoreTempDetail_productDetailId ? `font-weight: 600` : 'font-weight: 400;font-style:italic'}; font-size: 12px; padding-top: 6px;padding-bottom:3px;">${item.scoreTempDetail_name}</p>
                                `
                            }
                                    </td>`}

                                    
                                    `}
                                ` :
                        `
                                    <td style="font-weight: 400; font-size: 12px; padding-left: 10px;">
                                        <p class="ml-2" style="text-wrap:wrap">${item.scoreTempDetail_name} ${item.scoreTempDetail_validateRank ? repeatStarUpdate(item.scoreTempDetail_validateRank) : ""}</p>
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
            <div class="mt-3" style="border: 1px solid #000; padding: 3px;font-weight:600">
                <p>Kết quả:</p>
                <div class="text-center">
                    <p>Tổng điểm (Phần A + B + C): <span style="color:red">${totalPartA + totalPartB + totalPartC}</span> Điểm</p>
                    <p>Xếp hạng: <span style="color:red">${ScoreFile.RankOcop}</span> sao</p>
                </div>
            </div>
            <div class="" style="width: 100%;font-size:12px">
                <p class="mt-3 ml-4" style="font-weight:600;border-bottom:1px solid #000;width:150px;">Ý kiến của người đánh giá</p>
                ${ScoreFile.Note ? ` <p name="" id="" style="text-decoration: underline dotted">${ScoreFile.Note}</p>` : `<p class="mt-4" style="font-size:14px;line-height:20px;word-break: break-all;width:200px">...................................................................................................................................................................................... <br>......................................................................................................................................................................................</p>`}
               
            </div>
            <div class="mt-4" style="display: flex; justify-content: end;">
                <div style="font-size: 13px; text-align: center;">
                    <p style="font-style: italic">Tỉnh ${ScoreFile.cityCustomer_name}, ${ScoreFile.formattedScoreDatePdf}</p>
                    <strong>Người đánh giá</strong>
                    <p style="font-style: italic">(Ký và ghi rõ họ tên)</p>
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
