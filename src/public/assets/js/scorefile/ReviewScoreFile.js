const url = new URL(location.href)
const params = new URLSearchParams(url.searchParams)
var arrIdOld = []
// lay gia tri tren thanh url
if (params.has("ScoreFile_id") && params.has("productId")) {
    let tbodyScoreFileUpdate = document.getElementById("tbodyScoreFileUpdate")
    // lay id scorefile tren thanh url
    const product_id = params.get("productId")
    const ScoreFile_id = params.get("ScoreFile_id")
    handleGetScoreFileDetail(ScoreFile_id, product_id, tbodyScoreFileUpdate)
} else {
    console.log("error")
}
// lay ra scoreFile
async function handleGetScoreFileDetail(ScoreFile_id, product_id, tbodyScoreFileUpdate) {
    // tao ten checkbox mac dinh
    const listScoreFileDetail = await FuncListScoreFileDetail(ScoreFile_id, tbodyScoreFileUpdate)
    let checkBoxScoreName = "Score1"
    let checkboxScore = 1
    for (let i = 0; i < listScoreFileDetail.length; i++) {
        if (listScoreFileDetail[i].scoreTempDetail_productDetailId) {
            checkBoxScoreName = "Score" + checkboxScore;
            checkboxScore += 1;
        }
        tbodyScoreFileUpdate.innerHTML += `
            <tr>
                <input type="hidden" class="ScoreTempDetail_id" value="${listScoreFileDetail[i].ScoreTempDetail_id}">
                <input type="hidden" class="Score">
    
                ${listScoreFileDetail[i].scoreTempDetail_name && !listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="font-weight: 600; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                        ${listScoreFileDetail[i].scoreTempDetail_name}
                    </td>` :
                `<td style="font-weight: 300; color: #ccc; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                        ${listScoreFileDetail[i].scoreTempDetail_name} ${listScoreFileDetail[i].scoreTempDetail_validateRank
                    ?
                    `<span style="color:yellow">${repeatStarUpdate(listScoreFileDetail[i].scoreTempDetail_validateRank)}</span>`
                    :
                    ""}
                    </td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_maxScore >= 0 && listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="font-style: italic; color: rgb(232, 67, 67); font-weight: 600;">
                        (${listScoreFileDetail[i].scoreTempDetail_maxScore} điểm)
                    </td>` :
                `<td></td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_productDetailId ?
                `<td data-toggle="modal" data-target="#exampleModalProductDetail" onclick="handleShowAttachFile(${product_id}, ${listScoreFileDetail[i].scoreTempDetail_productDetailId})">
                        <ion-icon name="attach-outline"></ion-icon>
                    </td>` :
                `<td></td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="color: red; font-style: italic; text-align: center;">
                        <input type="radio" class="btnsRadio radio-custom" data-score=${listScoreFileDetail[i].scoreTempDetail_maxScore} data-id="${listScoreFileDetail[i]._id}" value="${listScoreFileDetail[i].scoreTempDetail_maxScore}" id="radio-${i}" name="${checkBoxScoreName}" ${listScoreFileDetail[i].scoreTempDetail_maxScore === listScoreFileDetail[i].Score ? "checked" : "disabled"}>
                        <label for="radio-${i}" class="radio-custom-label"></label>
                    </td>` :
                `<td></td>`
            }
            </tr>
        `;
    }

    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
    // lọc ra những scoreTempDetail nào đã checked
    const scoreValues = {};
    for (const btn of btnsRadio) {
        if (btn.checked) {
            const id = btn.dataset.id;
            const Score = btn.dataset.score
            arrIdOld.push({
                id: Number(id),
                Score: Number(Score)
            })
            scoreValues[id] = Number(btn.value);
        }
    }
    // Phan A
    let totalPartA = 0;
    let scorePartA = 0
    // Phan B
    let totalPartB = 0;
    let scorePartB = 0
    // Phan C
    let totalPartC = 0;
    let scorePartC = 0
    // Phan D
    let totalPartD = 0;
    let scorePartD = 0

    // count de phan chia phan
    let count = 0
    for (let i = 0; i < listScoreFileDetail.length; i++) {
        if (listScoreFileDetail[i].scoreTempDetail_maxScore > 5 && listScoreFileDetail[i].scoreTempDetail_isScore === 0) {
            count += 1
            if (count === 1) {
                totalPartA = listScoreFileDetail[i].scoreTempDetail_maxScore
            } else if (count === 2) {
                totalPartB = listScoreFileDetail[i].scoreTempDetail_maxScore
            } else {
                totalPartC = listScoreFileDetail[i].scoreTempDetail_maxScore
            }
        }
        if (listScoreFileDetail[i].scoreTempDetail_maxScore > 0 && listScoreFileDetail[i].scoreTempDetail_isScore
            === 1) {
            if (count === 1) {
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartA += scoreValues[listScoreFileDetail[i]._id]

                }
            } else if (count === 2) {
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartB += scoreValues[listScoreFileDetail[i]._id]
                }
            } else if (count === 3) {
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartC += scoreValues[listScoreFileDetail[i]._id]
                }
            } else {
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartD += scoreValues[listScoreFileDetail[i]._id]
                }
            }
        }
    }
    // tong diem truoc khi cham
    const TotalBefore = (totalPartA + totalPartB + totalPartC + totalPartD)
    // tong diem sau khi cham
    const TotalAfter = (scorePartA + scorePartB + scorePartC + scorePartD)

    document.querySelector(".partA").innerHTML = scorePartA
    document.querySelector(".totalPartA").innerHTML = totalPartA != 0 ? totalPartA : document.querySelector(".box-partA").innerHTML = ""
    // B
    document.querySelector(".partB").innerHTML = scorePartB
    document.querySelector(".totalPartB").innerHTML = totalPartB != 0 ? totalPartB : document.querySelector(".box-partB").innerHTML = ""
    // C
    document.querySelector(".partC").innerHTML = scorePartC
    document.querySelector(".totalPartC").innerHTML = totalPartC != 0 ? totalPartC : document.querySelector(".box-partC").innerHTML = ""
    // D
    document.querySelector(".partD").innerHTML = scorePartD
    document.querySelector(".totalPartD").innerHTML = totalPartD != 0 ? totalPartD : document.querySelector(".box-partD").innerHTML = ""

    // total
    document.querySelector(".TotalBefore").innerHTML = TotalBefore
    document.querySelector(".TotalAfter").innerHTML = TotalAfter


}

function repeatStarUpdate(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += "*"
    }
    return star
}

async function handleAddScoreFile(userId, scoreFileId, ScoreCommitee_id, productId, productgroupId) {
    const getOneScoreFile = await FuncGetOneScoreFile(scoreFileId)
    const listScoreFile = await FuncListScoreFileDetail(scoreFileId)
    const idScoreFileUpdate = await filterScoreFileId(userId, ScoreCommitee_id)

    // lấy tất cả trường của scorefile getOne
    const { Product_id, Customer_id, CreatorUser_id, Employee_id, EmployeeUserId, ScoreDate, RankOcop, Note, Code, ScoreTotal, ScoreTemp_id, Status, IsActive } = getOneScoreFile
    const now = Date.now();
    const date = new Date(now);
    const formScoreFile = {
        Product_id: Product_id,
        Customer_id: Customer_id,
        CreatorUser_id: Number(userId),
        Employee_id: Number(userId),
        EmployeeUserId: Number(userId),
        ScoreDate: date,
        RankOcop: RankOcop,
        Note: Note,
        Code: (("copy") + Code),
        ScoreTotal: ScoreTotal,
        ScoreTemp_id: ScoreTemp_id,
        Status: 1,
        IsActive: IsActive
    }
    // thực hiện update scorefile userId theo thư kí
    const res = await fetch(`/scorefile/update/${idScoreFileUpdate}`, {
        method: "PATCH",
        body: JSON.stringify(formScoreFile),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!res.ok) {
        console.log("Lỗi khi cập nhật scorefile")
        return
    }
    // sau khi update scorefile xong thực hiện thếm scorefile detail
    if (listScoreFile.length > 0) {
        const items = []
        for (const scorefile of listScoreFile) {
            const { ScoreTempDetail_id, Score } = scorefile
            const formScoreFile = {
                ScoreFile_id: idScoreFileUpdate,
                ScoreTempDetail_id: ScoreTempDetail_id,
                Score: Score,
                CreatorUser_id: userId
            }
            items.push(formScoreFile)

        }
        console.log(items)
        const response = await fetch(`/scoreFileDetail/add`, {
            method: "POST",
            body: JSON.stringify(items),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            console.log("Lỗi khi thêm scoreFileDetail")
            return
        }
        if (response.ok) {
            localStorage.setItem('toast', JSON.stringify({
                position: "top-right",
                heading: 'SUCCESS',
                text: 'Đã thêm thành công',
                icon: 'success',
                loader: true,
                loaderBg: '#9EC600',
                stack: 4
            }));
            window.location.replace(`/scoreFile/updateScoreFile?productId=${productId}&productgroupId=${productgroupId}&ScoreFile_id=${idScoreFileUpdate}`)
        }
    }
}

// danh sach scorefile detail
async function FuncListScoreFileDetail(scoreFileId) {
    tbodyScoreFileUpdate.innerHTML = ""
    const response = await fetch(`/scoreFileDetail/byScoreFile/${scoreFileId}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi khi goi danh sách scorefiledetail theo scorefile")
        return
    }
    return await response.json()
}
// lay ra idScoreFile can cap nhat
async function filterScoreFileId(userId, ScoreCommitee_id) {
    try {
        const response = await fetch(`/scoreFile/byIdScoreCommitteeAll/${ScoreCommitee_id}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi gọi danh sách scorefile theo id hội đồng")
        }
        const listScoreFile = await response.json()
        if (listScoreFile) {
            const arrUserId = listScoreFile.find((scorefile) => scorefile.forEmployeeId === Number(userId))
            if (arrUserId) {
                const idScoreFile = arrUserId._id
                return idScoreFile
            }

        }
    } catch (error) {
        console.log(error)
    }
}
// 
async function FuncGetOneScoreFile(scoreFileId) {
    try {
        const response = await fetch(`/scoreFile/getOne/${scoreFileId}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi get 1 scorefile")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}





