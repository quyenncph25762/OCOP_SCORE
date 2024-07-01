const url = new URL(location.href)
const params = new URLSearchParams(url.searchParams)
var arrIdOld = []
// lay gia tri tren thanh url
if (params.has("ScoreFile_id") || params.has("code") && params.has("productgroupId") && params.has("productId")) {
    showLoading()
    // lay id scorefile tren thanh url
    const product_id = params.get("productId")
    var ScoreFile_id = params.get("ScoreFile_id")
    handleGetScoreFileDetail(ScoreFile_id, product_id)
    hideLoading()
} else {
    console.log("error")
}
// lay ra scoreFile
async function handleGetScoreFileDetail(ScoreFile_id, product_id) {
    // tao ten checkbox mac dinh
    const listScoreFileDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    let tbodyScoreFileUpdate = document.getElementById("tbodyScoreFileUpdate")
    let checkBoxScoreName = "Score1"
    let checkboxScore = 1
    tbodyScoreFileUpdate.innerHTML = ""
    for (let i = 0; i < listScoreFileDetail.length; i++) {
        if (listScoreFileDetail[i].scoreTempDetail_productDetailId) {
            checkBoxScoreName = "Score" + checkboxScore;
            checkboxScore += 1;
        }
        getList = JSON.stringify(listScoreFileDetail[i])
        tbodyScoreFileUpdate.innerHTML += `
            <tr>
                <input type="hidden" class="ScoreTempDetail_id" value="${listScoreFileDetail[i].ScoreTempDetail_id}">
                <input type="hidden" id="ScoreTempDetail${i}" value='${getList}'>
                <input type="hidden" class="Score">
    
                ${listScoreFileDetail[i].scoreTempDetail_name && !listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="font-weight: 600; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                <p class="text-black-custom">
                ${listScoreFileDetail[i].scoreTempDetail_name}
                </p>
                    </td>` :
                `<td style="font-weight:400; color: #000; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;font-size:13px">
                        ${listScoreFileDetail[i].scoreTempDetail_name} ${listScoreFileDetail[i].scoreTempDetail_validateRank ?
                    `<span class="text-start" style="font-size:13px"> ${repeatStarUpdate(listScoreFileDetail[i].scoreTempDetail_validateRank)} </span>`
                    :
                    ""}
                    </td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_maxScore >= 0 && listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="font-style: italic;text-align: center">
                       <p class="text-red" style="font-weight:600">
                             (${listScoreFileDetail[i].scoreTempDetail_maxScore} điểm)
                       </p>
                    </td>` :
                `<td></td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_productDetailId ?
                `<td data-toggle="modal" data-target="#exampleModalProductDetail" onclick="handleShowAttachFile(${product_id}, ${listScoreFileDetail[i].scoreTempDetail_productDetailId})" style="text-align: center;max-width:80px">
                        <ion-icon name="attach-outline"></ion-icon>
                    </td>` :
                `<td></td>`
            }
    
                ${listScoreFileDetail[i].scoreTempDetail_isScore ?
                `<td style="color: red; font-style: italic; text-align: center;">
                        <input type="radio" onChange="handleOnChange()" data-scoreTempDetail="${listScoreFileDetail[i].ScoreTempDetail_id}" class="btnsRadio btnRadioUpdateScoreDetail radio-custom" data-score=${listScoreFileDetail[i].scoreTempDetail_maxScore} data-id="${listScoreFileDetail[i]._id}" value="${listScoreFileDetail[i].scoreTempDetail_maxScore}" id="radio-${i}" name="${checkBoxScoreName}" ${listScoreFileDetail[i].scoreTempDetail_maxScore === listScoreFileDetail[i].Score ? "checked" : ""}>
                        <label for="radio-${i}" class="radio-custom-label"></label>
                    </td>` :
                `<td></td>`
            }
            </tr>
        `;
        // undo radio
        document.querySelectorAll('.btnRadioUpdateScoreDetail').forEach(radio => {
            if (radio.checked) {
                radio.wasChecked = radio.checked;
            }
            radio.addEventListener('click', function () {
                if (this.checked) {
                    if (this.wasChecked) {
                        switch (this.part[0]) {
                            case "A":
                                let numberOfPartA = parseInt(document.querySelector(".partA").textContent)
                                const newNumberA = numberOfPartA - Number(this.value)
                                document.querySelector(".partA").innerHTML = newNumberA
                                break;
                            case "B":
                                let numberOfPartB = parseInt(document.querySelector(".partB").textContent)
                                const newNumberB = numberOfPartB - Number(this.value)
                                document.querySelector(".partB").innerHTML = newNumberB
                                break;
                            case "C":
                                let numberOfPartC = parseInt(document.querySelector(".partC").textContent)
                                const newNumberC = numberOfPartC - Number(this.value)
                                document.querySelector(".partC").innerHTML = newNumberC
                                break;
                            default:
                                break;
                        }
                        let total = parseInt(document.querySelector(".TotalAfter").textContent)
                        const newTotal = total - Number(this.value)
                        document.querySelector(".TotalAfter").innerHTML = newTotal
                        this.checked = false;
                        handleOnChange()
                    }
                    // Truoc khi set wasChecked thi tim nhung radio cung ten truoc do roi set la la false
                    const radiosWithSameName = document.querySelectorAll(`input[type="radio"][name="${this.name}"]`);
                    radiosWithSameName.forEach(otherRadio => {
                        if (otherRadio !== this) {
                            otherRadio.wasChecked = false;
                        }
                    });
                    this.wasChecked = this.checked;
                }
            });
        });
        setScore(listScoreFileDetail)
    }
    // hàm để innter ra score tổng theo phần và tổng điểm

}

function handleOnChange() {
    const ScoreTempDetail = document.querySelectorAll("[id^=ScoreTempDetail]")
    const arrScoreTempDetail = []
    for (const item of ScoreTempDetail) {
        arrScoreTempDetail.push(JSON.parse(item.value))
    }
    const list3sao = listScore3sao(arrScoreTempDetail)
    const list4sao = listScore4sao(arrScoreTempDetail)
    const list5sao = listScore5sao(arrScoreTempDetail)

    // ham chia theo cau hoi
    const listCrieriaMax3sao = funcListCriteria(arrScoreTempDetail)
    // nhung cau hoi co max la 4 sao
    const listCriteriaMax4sao = funcListCriteria4sao(arrScoreTempDetail)
    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
    // lọc ra những scoreTempDetail nào đã checked
    const scoreValues = {};
    const arrChecked = []
    for (const btn of btnsRadio) {
        if (btn.checked) {
            const id = btn.dataset.scoretempdetail;
            scoreValues[id] = Number(btn.value);
            arrChecked.push(id)
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
    for (let i = 0; i < arrScoreTempDetail.length; i++) {
        if (arrScoreTempDetail[i].scoreTempDetail_maxScore > 5 && arrScoreTempDetail[i].scoreTempDetail_isScore === 0) {
            count += 1
            switch (count) {
                case 1:
                    totalPartA = arrScoreTempDetail[i].scoreTempDetail_maxScore
                    break;
                case 2:
                    totalPartB = arrScoreTempDetail[i].scoreTempDetail_maxScore
                    break;
                case 3:
                    totalPartC = arrScoreTempDetail[i].scoreTempDetail_maxScore
                    break;
                default:
                    break;
            }
        }
        if (arrScoreTempDetail[i].scoreTempDetail_maxScore > 0 && arrScoreTempDetail[i].scoreTempDetail_isScore === 1) {
            switch (count) {
                case 1:
                    if (scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]) {
                        for (const btn of btnsRadio) {
                            if (Number(btn.dataset.id) === Number(arrScoreTempDetail[i]._id)) {
                                btn.setAttribute("part", "A")
                            }
                        }
                        scorePartA += scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]
                        document.querySelector(".partA").innerHTML = scorePartA
                    }
                    break;
                case 2:
                    if (scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]) {
                        for (const btn of btnsRadio) {
                            if (Number(btn.dataset.id) === Number(arrScoreTempDetail[i]._id)) {
                                btn.setAttribute("part", "B")
                            }
                        }
                        scorePartB += scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]
                        document.querySelector(".partB").innerHTML = scorePartB
                    }
                    break;
                case 3:
                    if (scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]) {
                        scorePartC += scoreValues[arrScoreTempDetail[i].ScoreTempDetail_id]
                        document.querySelector(".partC").innerHTML = scorePartC
                        for (const btn of btnsRadio) {
                            if (Number(btn.dataset.id) === Number(arrScoreTempDetail[i]._id)) {
                                btn.setAttribute("part", "C")
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        document.querySelector(".totalPartA").innerHTML = totalPartA
        document.querySelector(".totalPartB").innerHTML = totalPartB
        document.querySelector(".totalPartC").innerHTML = totalPartC
    }
    // tong diem truoc khi cham
    const TotalBefore = (totalPartA + totalPartB + totalPartC + totalPartD)
    // tong diem sau khi cham
    const TotalAfter = (scorePartA + scorePartB + scorePartC + scorePartD)
    document.querySelector(".TotalAfter").innerHTML = TotalAfter
    document.querySelector(".TotalBefore").innerHTML = TotalBefore
    let RankOcop = 0
    if (TotalAfter >= 90) {
        RankOcop = 5
    } else if (TotalAfter >= 70) {
        RankOcop = 4
    } else if (TotalAfter >= 50) {
        RankOcop = 3
    } else if (TotalAfter >= 30) {
        RankOcop = 2
    } else {
        RankOcop = 1
    }
    const arrNumberChecked = arrChecked.map(Number)

    const newRankOcop = checkRankFilter(list3sao, list4sao, list5sao, RankOcop, arrNumberChecked, listCrieriaMax3sao, listCriteriaMax4sao)
    document.querySelector(".startOcop").innerHTML = `${repeat(newRankOcop)}`
}
// thuc hien hanh dong update
async function handleUpdate() {
    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
    const newArr = []
    for (const btn of btnsRadio) {
        if (btn.checked) {
            const id = btn.dataset.id
            const Score = btn.dataset.score
            newArr.push({
                id: Number(id),
                Score: Number(Score)
            })
        }
    }
    // mảng những id giữ nguyên Score
    const arrIdNoActions = newArr.filter((item) => (arrIdOld.map(e => e.id)).includes(item.id))

    // mảng id đặt lại Score = 0
    const arrIdActionRemoveScore = arrIdOld.filter((item) => !(newArr.map(e => e.id)).includes(item.id))
    const arrResponseRemoveScore = []
    for (const idScoreFileDetail of arrIdActionRemoveScore) {
        if (idScoreFileDetail) {
            const formScoreFileScoreNull = {
                id: idScoreFileDetail.id,
                Score: null
            }
            arrResponseRemoveScore.push(formScoreFileScoreNull)
        }
    }
    const res = await fetch(`/scoreFileDetail/updateScore`, {
        method: "POST",
        body: JSON.stringify(arrResponseRemoveScore),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!res.ok) {
        console.log(`Lỗi khi remove điểm`)
        return
    }
    await Promise.all(arrResponseRemoveScore)

    // mang id update Score = 1
    const arrIdActionUpdateScore = newArr.filter((item) => !(arrIdOld.map(e => e.id)).includes(item.id))
    const arrResponseUpdateScore = []
    if (arrIdActionUpdateScore.length > 0) {
        for (const idScoreFileDetail of arrIdActionUpdateScore) {
            if (idScoreFileDetail) {
                const formScoreFileScoreNull = {
                    id: idScoreFileDetail.id,
                    Score: idScoreFileDetail.Score
                }
                arrResponseUpdateScore.push(formScoreFileScoreNull)
            }
        }
    }
    await fetch(`/scoreFileDetail/updateScore`, {
        method: "POST",
        body: JSON.stringify(arrResponseUpdateScore),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // func cap nhat ScoreTotal in scoreFile 
    await updateScoreTotal()
    // cap nhat tong diem
    localStorage.setItem('toast', JSON.stringify({
        position: "top-right",
        heading: 'SUCCESS',
        text: 'Cập nhật thành công',
        icon: 'success',
        loader: true,
        loaderBg: '#9EC600',
        showHideTransition: 'slide',
        stack: 4
    }));
    const productIsProvince = document.getElementById("product_province").value
    if (Number(productIsProvince) === 0) {
        window.location.replace("/scoreFile")
        return
    } else {
        window.location.replace("/scoreFileProvince")
        return
    }
}

// func cap nhat ScoreTotal 
async function updateScoreTotal() {
    if (params.has("ScoreFile_id") && params.has("productId")) {
        const ScoreFile_id = params.get("ScoreFile_id")
        const productId = params.get("productId")
        const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
        const response = await fetch(`/scoreFileDetail/byScoreFile/${ScoreFile_id}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi k get đc scoreFileDetail")
        }
        const listScoreFileDetail = await response.json()
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
            } else {
                const id = btn.dataset.id
                arrIdOld.push({
                    id: Number(id),
                    Score: null
                })
            }
        }

        const partA = parseInt(document.querySelector(".partA").textContent)
        const partB = parseInt(document.querySelector(".partB").textContent)
        const partC = parseInt(document.querySelector(".partC").textContent)
        let TotalAfter = (partA + partB + partC)
        const newRankOcop = document.querySelector(".startOcop").children.length
        if (TotalAfter >= 0) {
            const res = await fetch(`/scorefile/updateScoreTotal/${ScoreFile_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ScoreTotal: TotalAfter,
                    RankOcop: Number(newRankOcop)
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) {
                console.log(`Lỗi khi cập nhật Total scoreFle`)
            }
        }
    }
}

// list scoreFileDetail by ScoreFile
async function FuncListScoreDetailByScoreFile(ScoreFile_id) {
    const response = await fetch(`/scoreFileDetail/byScoreFile/${ScoreFile_id}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi k get đc scoreFileDetail")
    }
    return await response.json()
}

function checkRankFilter(list3sao, list4sao, list5sao, RankOcop, arrChecked, listCrieriaMax3sao, listCriteriaMax4sao) {
    if (RankOcop === 3) {
        for (const item of list3sao) {
            const results = arrChecked.includes(Number(item.ScoreTempDetail_id))
            if (!results) {
                return RankOcop - 1
            }
        }
        return RankOcop
    } else if (RankOcop === 4) {
        // thuc hien loai nhung cau hoi cao nhat la 3 sao
        const listCrieriaMax3saoId = listCrieriaMax3sao.map((item) => item._id)
        // nếu k có listCrieriaMax3saoId thì điểm sẽ xuống 2 sao
        const validateRankContains = arrChecked.some(id => listCrieriaMax3saoId.includes(Number(id)));
        if (!validateRankContains) {
            return RankOcop = 2
        }
        // 
        const list3saoFilter = list3sao.filter((item) => !listCrieriaMax3saoId.includes(item.ScoreTempDetail_id))
        const arrList3SaoId = list3saoFilter.map((item) => item.ScoreTempDetail_id)
        const containsRank = arrChecked.some(id => arrList3SaoId.includes(Number(id)));
        if (containsRank) {
            return RankOcop - 1
        }
        // Kiểm tra xem có check vào listCriteria 4 sao không ? nếu ko thì RankOcop - 1 (bao gồm cả 4 và 5)
        for (const item of listCriteriaMax4sao) {
            if (arrChecked.some(id => item.includes(Number(id)))) {
                RankOcop
            } else {
                console.log(RankOcop)
                return RankOcop - 1
            }
        }

        return RankOcop
    } else if (RankOcop === 5) {
        // thuc hien loai nhung cau hoi cao nhat la 3 sao
        const listCrieriaMax3saoId = listCrieriaMax3sao.map((item) => item._id)
        // nếu k có listCrieriaMax3saoId thì điểm sẽ xuống 2 sao
        const validateRankContains = arrChecked.some(id => listCrieriaMax3saoId.includes(Number(id)));
        if (!validateRankContains) {
            return RankOcop = 2
        }

        for (const item of list5sao) {
            const results = arrChecked.includes(Number(item.ScoreTempDetail_id))
            // neu khong tich du tieu chi 5 sao thi san pham chi dat 4 sao
            if (!results) {
                return RankOcop - 1
            }
        }

        return RankOcop
    } else {
        return RankOcop
    }
}

function funcListCriteria(arrScoreTempDetail) {
    // tao 1 arr chua khoang cach 
    let arrSpace = []
    // arr chua nhung tieu chi
    let arrListCriteria = []
    for (const item of arrScoreTempDetail) {
        if (item.scoreTempDetail_productDetailId) {
            if (arrSpace.length > 0) {
                arrListCriteria.push(arrSpace)
                arrSpace = []
            }
        }
        if (item.scoreTempDetail_isScore) {
            arrSpace.push(item)
        }
    }
    // console.log(arrSaveCriteria)
    if (arrSpace.length > 0) {
        const arrSaveCriteria = []
        // chuyen arr thanh arr score
        const arrListCriteriaScore = arrListCriteria.map((item) => item.map((criteriaItem) => ({
            _id: criteriaItem.ScoreTempDetail_id,
            rank: criteriaItem.scoreTempDetail_validateRank
        })))
        for (const item of arrListCriteriaScore) {
            if (Math.max(...item.map((rank) => rank.rank)) === 3) {
                const results = item.reduce((max, item) => item.rank > max.rank ? item : max, item[0])
                arrSaveCriteria.push(results)
            }
        }
        return arrSaveCriteria
    }
}

function funcListCriteria4sao(arrScoreTempDetail) {
    // tao 1 arr chua khoang cach 
    let arrSpace = []
    // arr chua nhung tieu chi
    let arrListCriteria = []
    for (const item of arrScoreTempDetail) {
        if (item.scoreTempDetail_productDetailId) {
            if (arrSpace.length > 0) {
                arrListCriteria.push(arrSpace)
                arrSpace = []
            }
        }
        if (item.scoreTempDetail_isScore) {
            arrSpace.push(item)
        }
    }
    if (arrSpace.length > 0) {
        const arrSaveCriteria = []
        // chuyen arr thanh arr score
        const arrListCriteriaScore = arrListCriteria.map((item) => item.map((criteriaItem) => ({
            _id: criteriaItem.ScoreTempDetail_id,
            rank: criteriaItem.scoreTempDetail_validateRank
        })))
        for (const item of arrListCriteriaScore) {
            if (item.some((rank) => rank.rank === 4 || rank.rank === 4 && rank.rank === 5)) {
                const results = item.filter((i) => i.rank >= 4).map((id) => id._id)
                arrSaveCriteria.push(results)
            }
        }
        return arrSaveCriteria
    }
}


function repeatStarUpdate(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += "*"
    }
    return star
}

function repeat(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += `<ion-icon name="star"></ion-icon>`
    }
    return star
}

function listScore3sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list3sao = arrScoreTempDetail.filter((item) => item.
            scoreTempDetail_validateRank
            === 3)
        return list3sao
    }
    return
}
function listScore4sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list4sao = arrScoreTempDetail.filter((item) => item.
            scoreTempDetail_validateRank
            === 4)
        return list4sao
    }
    return
}
function listScore5sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list5sao = arrScoreTempDetail.filter((item) => item.
            scoreTempDetail_validateRank
            === 5)
        return list5sao
    }
    return
}

function setScore(listScoreFileDetail) {
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
    // document.querySelector(".partD").innerHTML = scorePartD
    // document.querySelector(".totalPartD").innerHTML = totalPartD != 0 ? totalPartD : document.querySelector(".box-partD").innerHTML = ""
    // total
    document.querySelector(".TotalBefore").innerHTML = TotalBefore
    document.querySelector(".TotalAfter").innerHTML = TotalAfter

}










