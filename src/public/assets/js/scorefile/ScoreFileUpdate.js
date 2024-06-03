const url = new URL(location.href)
const params = new URLSearchParams(url.searchParams)
if (params.has("ScoreFile_id") && params.has("code") && params.has("productId")) {
    // lay id scorefile tren thanh url
    const product_id = params.get("productId")
    const ScoreFile_id = params.get("ScoreFile_id")
    handleGetScoreFileDetail(ScoreFile_id, product_id)
} else {
    console.log("error")
}
// lay ra scoreFile
async function handleGetScoreFileDetail(ScoreFile_id, product_id) {

    // tao ten checkbox mac dinh
    const response = await fetch(`/scoreFileDetail/byScoreFile/${ScoreFile_id}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi k get đc scoreFileDetail")
    }
    const listScoreFileDetail = await response.json()
    let tbodyScoreFileUpdate = document.getElementById("tbodyScoreFileUpdate")
    let checkBoxScoreName = "Score1"
    let checkboxScore = 1
    tbodyScoreFileUpdate.innerHTML = ""
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
                        ${listScoreFileDetail[i].scoreTempDetail_name} ${listScoreFileDetail[i].scoreTempDetail_validateRank ? repeatStarUpdate(listScoreFileDetail[i].scoreTempDetail_validateRank) : ""}
                    </td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_maxScore > 0 && listScoreFileDetail[i].scoreTempDetail_isScore ?
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
                        <input type="radio" class="btnsRadio" data-id="${listScoreFileDetail[i]._id}" value="${listScoreFileDetail[i].scoreTempDetail_maxScore}" name="${checkBoxScoreName}" ${listScoreFileDetail[i].scoreTempDetail_maxScore === listScoreFileDetail[i].Score ? "checked" : ""}>
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
        }
        if (listScoreFileDetail[i].scoreTempDetail_maxScore > 0 && listScoreFileDetail[i].scoreTempDetail_isScore
            === 1) {
            if (count === 1) {
                totalPartA += listScoreFileDetail[i].scoreTempDetail_maxScore
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartA += scoreValues[listScoreFileDetail[i]._id]

                }
            } else if (count === 2) {
                totalPartB += listScoreFileDetail[i].scoreTempDetail_maxScore
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartB += scoreValues[listScoreFileDetail[i]._id]
                }
            } else if (count === 3) {
                totalPartC += listScoreFileDetail[i].MaxScore
                if (scoreValues[listScoreFileDetail[i]._id]) {
                    scorePartC += scoreValues[listScoreFileDetail[i]._id]
                }
            } else {
                totalPartD += listScoreFileDetail[i].MaxScore
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

// thuc hien hanh dong update
async function handleUpdate() {
    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
    for (const btn of btnsRadio) {
        if (btn.checked) {
            const id = btn.dataset.id
        }
    }
}



