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
         font-size:16px !important;
          
        }
        p {
            margin: 0 !important;
            
        }
            tr{
            
            }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="" style="min-width:100%">
        <!-- head -->
        <table style="width:100%;border-collapse:collapse;">
            <tr>
                <td style="font-size:18px;border:none;margin-bottom:0px">
                    <p style="margin-bottom:0px">${ScoreFile.product_district ? ScoreFile.product_district : "Hệ thống"}</p>
                    <div style="max-width:200px;margin-left:11px">
                    <p style="font-weight:bold;">${ScoreFile.scorecommitee_name}</p>
                    </div>
                </td>
                <td style="text-align:right;font-weight:bold;border:none;font-size:18px;">
                    <p style="text-transform:uppercase;margin-bottom:0px">Cộng Hòa xã hội chủ nghĩa việt nam</p>
                    <div style="margin-right:70px">
                        <p>Độc lập - Tự do - Hạnh phúc</p>
                    </div>
                </td>
            </tr>
        </table>
        <!-- subhead -->
        <!-- subhead -->
        <div style="margin-top:40px">
            <p style="text-transform:uppercase;font-weight:bold;text-align:center;font-size:18px">Phiếu đánh giá</p>
            <div style="margin-top:20px;">
                <p>
                    <strong>Tên sản phẩm:</strong>
                    <span style="text-transform:uppercase;">${ScoreFile.product_name}</span>
                </p>
                <p>
                    <strong>Mã sản phẩm:</strong>
                    <span style="text-transform:uppercase;">${ScoreFile.product_code}</span>
                </p>
                <p>
                    <strong>Tên chủ thể sản xuất:</strong>
                    <span style="text-transform:uppercase;">${ScoreFile.customer_name}</span>
                </p>
                <p>
                    <strong>Địa chỉ:</strong>
                    <span style="text-transform:uppercase;">${ScoreFile.customer_address}, ${ScoreFile.wardCustomer_name}, ${ScoreFile.districtCustomer_name} ,tỉnh ${ScoreFile.cityCustomer_name}</span>
                </p>
                <h5 style="color:red;font-style:italic;margin-top:20px;">
                    Bị loại khi: Giả mạo hồ sơ hoặc không tuân thủ đầy đủ các quy định về giấy chứng nhận cơ sở đủ điều kiện ATTP (hoặc tương đương); hoặc Hồ sơ tự công bố sản phẩm, ghi nhãn sản phẩm không đúng theo quy định; hoặc không đáp ứng quy định Hồ sơ dự thi theo quy định.
                </h5>
            </div>
            <table style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="border:none;"></th>
                        <th style="border:none;"></th>
                        <th style="border:none;"></th>
                    </tr>
                </thead>
                <tbody>
                    ${ListScoreFileDetail.map((item, index) => {
                if (item.scoreTempDetail_maxScore > 10 && item.scoreTempDetail_isScore === 0) {
                    countTotal += 1;
                }
                if (item.scoreTempDetail_isScore === 0 && Number(item.scoreTempDetail_name[1])) {
                    countTotalPart += 1;
                }
                return `
                            <tr key="${index}">
                                ${item.scoreTempDetail_isScore ? `
                                    <td style="border:none">
                                        ${item.scoreTempDetail_maxScore === item.Score ? '☒' : '☐'}
                                       </div>
                                    </td>
                                ` : ''}
                              
                                ${item.scoreTempDetail_name && !item.scoreTempDetail_isScore ? `
                                    ${item.scoreTempDetail_maxScore > 10 ? `
                                        <td colspan="3" style="text-align:center;text-transform:uppercase;font-weight:bold;border:1px solid #000;">
                                            <p>${item.scoreTempDetail_name}</p>
                                            ${countTotal === 1 && totalPartA ? `<p style="">Tổng điểm phần A: <span style="color:red;">${totalPartA}</span> điểm</p>` : ''}
                                            ${countTotal === 2 && totalPartB ? `<p style="">Tổng điểm phần B: <span style="color:red;">${totalPartB}</span> điểm</p>` : ''}
                                            ${countTotal === 3 && totalPartC ? `<p style="">Tổng điểm phần C: <span style="color:red;">${totalPartC}</span> điểm</p>` : ''}
                                            ${countTotal === 4 && totalPartD ? `<p style="">Tổng điểm phần D: <span style="color:red;">${totalPartD}</span> điểm</p>` : ''}
                                        </td>
                                    ` : `
                                    
                                        <td colspan="2" style="max-width:300px;border:none">
                                            ${item.scoreTempDetail_isScore === 0 && Number(item.scoreTempDetail_name[1]) ? `
                                            
                                                <div style="margin-top:8px">
                                                <p style="font-weight:bold;text-transform:uppercase;">${item.scoreTempDetail_name} ${totalParts ? `(${totalParts[totalPartsIndex += 1]} điểm)` : ''}</p>
                                                </div>
                                            ` : `
                                                <p style="font-weight:${item.scoreTempDetail_productDetailId ? 'bold' : 'normal'};font-style:${item.scoreTempDetail_productDetailId ? 'normal' : 'italic'};">${item.scoreTempDetail_name}</p>
                                            `}
                                        </td>
                                    `}
                                ` : `
                                    <td style="font-weight:normal;margin-left:10px;border:none">
                                        <p>${item.scoreTempDetail_name} ${item.scoreTempDetail_validateRank ? repeatStarUpdate(item.scoreTempDetail_validateRank) : ''}</p>
                                    </td>
                                `}
                                <td style="border:none">
                                    ${item.scoreTempDetail_maxScore >= 0 && item.scoreTempDetail_isScore ? `
                                        <p style="">${item.scoreTempDetail_maxScore}</p>
                                    ` : `
                                        ${item.scoreTempDetail_productDetailId ? `<p style="font-weight:bold;border-bottom:1px solid #ccc;">${arrScoreMax.length > 0 && arrScoreMax[i += 1]}</p>` : ''}
                                    `}
                                </td>
                            </tr>
                        `;
            }).join('')}
                </tbody>
            </table>
            <div style="border:1px solid #000;padding:3px;font-weight:bold;">
                <p>Kết quả:</p>
                <div style="text-align:center;">
                    <p>Tổng điểm (Phần A + B + C): <span style="color:red;">${totalPartA + totalPartB + totalPartC}</span> Điểm</p>
                    <p>Xếp hạng: <span style="color:red;">${ScoreFile.RankOcop}</span> sao</p>
                </div>
            </div>
            <div style="width:100%;">
                <div style="font-weight:bold;text-decoration:underline;width:150px;margin-top:20px;margin-bottom:20px;margin-left:20px">Ý kiến của người đánh giá</div>
                ${ScoreFile.Note ? `<div style="text-decoration:underline dotted;">${ScoreFile.Note}</div>` : `<div style="font-size:18px;line-height:20px;word-break:break-all;width:200px;">....................................................................................................................................................................................................................................................................................................................................................................</div>`}
            </div>
            
             <table style="width:100%;border-collapse:collapse;margin-top:15px">
            <tr>
                <td style="text-align:center;font-size:16px;width:50%;border:none">
                    <div style=""></div>
                </td>
                <td style="text-align:right; vertical-align: middle;width:50%;border:none">
                    <div style="display:inline-block; text-align:center;">
                        <p style="font-style:italic;">Tỉnh ${ScoreFile.cityCustomer_name}, ${ScoreFile.formattedScoreDatePdf}</p>
                        <p style="font-weight:bold">Người đánh giá</p>
                        <p style="font-style:italic;">(Ký và ghi rõ họ tên)</p>
                        <div style="margin-top:18px;">
                            <p style="font-weight:bold; font-size:18px">${ScoreFile.employee_FullName}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
                
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
            const nameFile = `phieu-cham-${ScoreFile.employee_FullName}.docx`;
            // Tạo file PDF và lưu tại outputPath
            await generatePDFutils(htmlContent, nameFile, res);
            // if (fs.existsSync(outputPath)) {
            //     // Set header để trình duyệt hiểu được dạng file là docx
            //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            //     res.setHeader('Content-Disposition', `attachment; filename=phieu.docx`);
            //     // Đọc file và gửi về client
            //     fs.createReadStream(outputPath).pipe(res);
            // } else {
            //     res.status(404).send('File not found');
            // }
            //    Đảm bảo file PDF đã được tạo thành công
            // if (fs.existsSync(outputPath)) {
            //     console.log("File PDF đã được tạo thành công.");
            //     // Gửi file PDF về client
            //     res.download(outputPath, `phieu-cham-create-${ScoreFile.employee_FullName}.docx`, (err) => {
            //         if (err) {
            //             console.error("Lỗi khi tải file PDF:", err);
            //             return res.status(500).send({
            //                 message: "Lỗi khi tải file PDF",
            //                 error: err.message
            //             });
            //         }
            //         console.log("File PDF đã được tải xuống thành công!");
            //     });
            // } else {
            //     console.error("File PDF không tồn tại tại đường dẫn:", outputPath);
            //     return res.status(500).send({
            //         message: "File PDF không tồn tại"
            //     });
            // }
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
