// tinh diem trung binh
var AverageScore = 0
// tinh so sao ocop trung bình
var totalRankOcop = 0
async function handleResultScoreFiles(idScoreCommittee, productId) {
    console.log(idScoreCommittee)
    const tbodyResultsScoreFile = document.getElementById(`tbodyResultsScoreFile${productId}`)
    const response = await fetch(`/scorefile/byIdScoreCommittee/${idScoreCommittee}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi khi gọi ResultScoreFiles")
    }
    const listScoreFile = await response.json()
    // Lọc những employee đã chấm xong
    const filterScoreFile = listScoreFile.filter((scorefile) => scorefile.Employee_id && scorefile.Product_id === Number(productId))
    tbodyResultsScoreFile.innerHTML = ""
    if (filterScoreFile.length > 0) {
        let i = 0
        let totalScore = 0

        for (const scorefile of filterScoreFile) {
            i += 1
            // tinh diem trung binh
            AverageScore = ((totalScore += scorefile.ScoreTotal) / filterScoreFile.length)
            // hien thi ra html
            tbodyResultsScoreFile.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>
                        <strong style="font-size: 16px;">${scorefile.employee_FullName}</strong>
                        <p style="font-style: italic;">${scorefile.workposition_name} - ${scorefile.workdepartment_title}</p>
                    </td>
                    <td style="color: #F64E60; font-weight: 600;">${scorefile.ScoreTotal}</td>
                    <td>
                    ${repeatStar(scorefile.RankOcop)}
                    </td>
                    <td>
                        <div class="d-flex" style="gap: 10px;">
                            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Xem chi tiết">
                                <a href="/scoreFile/reviewPage?productId=${scorefile.Product_id}&ScoreFile_id=${scorefile._id}">
                                    <ion-icon name="eye-outline"></ion-icon>
                                </a>
                            </span>
                            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Phiếu chấm">
                                <a href="">
                                    <ion-icon name="link-outline"></ion-icon>
                                </a>
                            </span>
                        </div>
                    </td>
                </tr>
                
            `;
        }
        rankOcop()
        tbodyResultsScoreFile.innerHTML += `
            <tr>
                <td></td>
                <td></td>
                <td id="AverageScore" >
                <p style="font-weight:700; font-size:14px">${AverageScore ? Number(AverageScore.toFixed(1)) : 0}</p>
                </td>
                <td id="AverageRankOcop" >
                <p style="font-size:14px">
                ${totalRankOcop ? repeatStar(totalRankOcop) : 0}
                </p>
                </td>
                <td></td>
            </tr>
        `;
    }
}
function repeatStar(number) {
    let starInnter = "";
    for (let i = 0; i < number; i++) {
        starInnter += `<ion-icon name="star"></ion-icon>`;
    }
    return starInnter;
}
async function handleResult(idProduct) {
    try {
        rankOcop()
        $.confirm({
            title: '<ion-icon name="help-circle-outline"></ion-icon>',
            content: 'Bạn muốn cập nhật phiếu chấm ?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-blue',
                    action: async function () {

                        const formProduct = {
                            RankOcop: Number(totalRankOcop),
                            ScoreTotal: Number(AverageScore.toFixed(1))
                        }
                        const response = await fetch(`/product-manage/updateRankOcop/${idProduct}`, {
                            method: "PATCH",
                            body: JSON.stringify(formProduct),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        if (!response.ok) {
                            console.log("Lỗi khi cập nhât kết quả phiếu chấm")
                            return
                        }
                        localStorage.setItem('toast', JSON.stringify({
                            position: "top-right",
                            heading: 'SUCCESS',
                            text: 'Đã cập nhật thành công',
                            icon: 'success',
                            loader: true,
                            loaderBg: '#9EC600',
                            showHideTransition: 'slide',
                            stack: 4
                        }));
                        window.location.reload()
                    }
                },
                cancel: function () {
                    $.alert('Đã hủy!');
                }
            }
        });


    } catch (error) {
        console.log(error)
    }
}
function rankOcop() {
    if (AverageScore >= 90) {
        totalRankOcop = 5
    } else if (AverageScore >= 70) {
        totalRankOcop = 4
    } else if (AverageScore >= 50) {
        totalRankOcop = 3
    } else if (AverageScore >= 30) {
        totalRankOcop = 2
    } else {
        totalRankOcop = 1
    }
}