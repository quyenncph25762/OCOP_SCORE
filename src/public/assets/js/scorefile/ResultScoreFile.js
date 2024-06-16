// tinh diem trung binh
var AverageScore = 0
// tinh so sao ocop trung bình
var AverageRankOcop = 0
async function handleResultScoreFiles(idScoreCommittee, productId) {
    const btnUpdate = document.getElementById(`btnUpdate${productId}`)
    const ArrSecUserId = await FuncListSecUserId(idScoreCommittee)
    // Lay ra tat ca scorefile co status = 2
    const listScoreFile = await FuncListScoreFileByScoreCommittee(idScoreCommittee)
    // lay ra tat ca scorefile
    const listScoreFileAll = await FuncListScoreFileByScoreCommitteeAll(idScoreCommittee)
    // Lay 1 scoreCommitt
    const ScoreCommitteeByid = await getOneScoreCommittee(idScoreCommittee)
    const tbodyResultsScoreFile = document.getElementById(`tbodyResultsScoreFile${productId}`)
    // lay ra the in ra nhung can bo da cham / tong so can bo trong employee
    const employeeScored = document.querySelector(".employeeScored")
    employeeScored.innerHTML = ""
    // lay tat ca scorefile trong hoi dong
    const filterScoreFileScoreCommit = listScoreFileAll.filter(scorefile => scorefile.Product_id === Number(productId) &&
        !ArrSecUserId.includes(scorefile.forEmployeeId) && scorefile.IsActive === 1);
    // console.log(`Tổng Employee trong hội đồng:`, filterScoreFileScoreCommit)


    // Lọc những employee đã chấm xong và k có secUserId
    const filterScoreFile = listScoreFile.filter(scorefile =>
        scorefile.Employee_id && scorefile.Product_id === Number(productId) &&
        !ArrSecUserId.includes(scorefile.Employee_id)
    );
    // Gọi hàm tính điểm chênh lệch phiếu k lớn hơn 10
    const alert = caculatorScoreEmployee(filterScoreFile)
    if (alert) {
        document.querySelector(".alert").innerHTML = "Điểm hội đồng chấm chênh lệch quá 10 điểm"
        btnUpdate.disabled = true
    } else {
        btnUpdate.disabled = false
    }
    // console.log(`Employee đã chấm: `, filterScoreFile)
    employeeScored.innerHTML = `(${filterScoreFile.length}/${filterScoreFileScoreCommit.length})`

    tbodyResultsScoreFile.innerHTML = ""
    if (filterScoreFile.length > 0) {
        let i = 0
        let totalScore = 0
        let totalRankOcop = 0
        // Hiển thị ra list Employeee
        for (const scorefile of filterScoreFile) {
            i += 1
            // tinh diem trung binh
            AverageScore = ((totalScore += scorefile.ScoreTotal) / filterScoreFile.length)
            AverageRankOcop = ((totalRankOcop += scorefile.RankOcop) / filterScoreFile.length)
            // hien thi ra html
            tbodyResultsScoreFile.innerHTML += `
                <tr class="tr">
                    <td>${i}</td>
                    <td>
                        <strong style="font-size: 16px;">${scorefile.employee_FullName}</strong>
                        <p style="font-style: italic;text-wrap:wrap">${scorefile.workposition_name} - ${scorefile.workdepartment_title}</p>
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
                            
                            ${ScoreCommitteeByid.IsActive != 0 ?
                    ` <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Yêu cầu chấm lại">
                                    <ion-icon name="hand-left-outline" onclick="handleRevertScoreFile(${scorefile._id})"></ion-icon>
                            </span>` : ""
                }
                           
                            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Phiếu chấm">
                                <ion-icon name="link-outline" onclick="generatePDF(${scorefile._id})"></ion-icon>
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
                ${AverageRankOcop ? repeatStar(Number(Math.floor(AverageRankOcop))) : 0}
                </p>
                </td>
                <td>
                <p style="text-align:center;font-weight: 600">${Number(Math.floor(AverageRankOcop)) > 2 ? "Đạt" : "Không đạt"}</p>
                </td>
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
// ham cap nhat tong diem va rank ocop
async function handleResult(idProduct) {
    try {
        // rankOcop()
        $.confirm({
            title: '<ion-icon name="help-circle-outline"></ion-icon>',
            content: 'Bạn muốn cập nhật phiếu chấm ?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-blue',
                    action: async function () {

                        const formProduct = {
                            RankOcop: Number(Math.floor(AverageRankOcop)),
                            ScoreTotal: Number(AverageScore.toFixed(1)),
                            IsPassed: 1
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
// ham tinh rank ocop
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
// ham goi ra danh sach thu ki
async function FuncListSecUserId(idScoreCommittee) {
    try {
        const response = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${idScoreCommittee}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi lấy ra danh sách scoreCommitteeDetail")
            return
        }
        const listUser = await response.json()

        const arrSecUserId = listUser.map((user) => Number(user.SecUserId)).filter(id => id !== undefined && id !== null)
        return arrSecUserId
    } catch (error) {
        console.log(error)
    }
}
// ham cham lai
async function handleRevertScoreFile(idScoreFile) {
    $.confirm({
        title: '<ion-icon name="help-circle-outline"></ion-icon>',
        content: 'Yêu cầu chấm lại ?',
        buttons: {
            confirm: {
                text: 'Confirm',
                btnClass: 'btn-blue',
                action: async function () {
                    const response = await fetch(`/scorefile/updateStatus/${idScoreFile}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            Status: 1
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if (!response.ok) {
                        console.log("Lỗi khi yêu cầu chấm lại")
                        return
                    }
                    localStorage.setItem('toast', JSON.stringify({
                        position: "top-right",
                        heading: 'SUCCESS',
                        text: 'Cập nhật thành công!',
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

}

//list ScoreFile theo scoreCommittee status = 2
async function FuncListScoreFileByScoreCommittee(idScoreCommittee) {
    try {
        const response = await fetch(`/scorefile/byIdScoreCommittee/${idScoreCommittee}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi gọi ResultScoreFiles")
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// listScoreFile theo scoreCommittee
async function FuncListScoreFileByScoreCommitteeAll(idScoreCommittee) {
    try {
        const response = await fetch(`/scorefile/byIdScoreCommitteeAll/${idScoreCommittee}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi gọi ResultScoreFiles")
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// getOneScoreCommitt
async function getOneScoreCommittee(idScoreCommittee) {
    try {
        const response = await fetch(`/scoreCommittee/getOne/${idScoreCommittee}`, {
            method: "GET"
        })
        if (!response.ok) {
            return console.log("Loi khi get One ScoreCommittee")
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

// function tim ra nhung so diem can bo đã chấm để tính điểm chênh lệch k được lớn hơn 10
function caculatorScoreEmployee(filterScoreFile) {
    if (filterScoreFile.length > 1) {
        for (i = 0; i < filterScoreFile.length; i++) {
            for (j = i + 1; j < filterScoreFile.length; j++) {
                // Tính giá trị tuyệt dối của 1 số
                if (Math.abs(filterScoreFile[i].ScoreTotal - filterScoreFile[j].ScoreTotal) > 10) {
                    return true
                }

            }
        }
    }
    return false
}