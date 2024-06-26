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
        tbodyScoreFileUpdate.innerHTML += `
            <tr>
                <input type="hidden" class="ScoreTempDetail_id" value="${listScoreFileDetail[i].ScoreTempDetail_id}">
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
                `<td style="font-style: italic; font-weight: 600;">
                       <p class="text-red">
                             (${listScoreFileDetail[i].scoreTempDetail_maxScore} điểm)
                       </p>
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
                        <input type="radio" class="btnsRadio btnRadioUpdateScoreDetail radio-custom" data-score=${listScoreFileDetail[i].scoreTempDetail_maxScore} data-id="${listScoreFileDetail[i]._id}" value="${listScoreFileDetail[i].scoreTempDetail_maxScore}" id="radio-${i}" name="${checkBoxScoreName}" ${listScoreFileDetail[i].scoreTempDetail_maxScore === listScoreFileDetail[i].Score ? "checked" : ""}>
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
                        this.checked = false;
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
    }
    // hàm để innter ra score tổng theo phần và tổng điểm
    setScore(listScoreFileDetail)

}

console.log(`arrIdOld chua an nut:`, arrIdOld)
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
    console.log(`newArr:`, newArr)
    console.log(`arrIdOld:`, arrIdOld)
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

    window.location.replace("/scoreFile")
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
        // Phan A
        let scorePartA = 0
        // Phan B
        let scorePartB = 0
        // Phan C
        let scorePartC = 0
        // Phan D
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
        const TotalAfter = (scorePartA + scorePartB + scorePartC + scorePartD)
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

        const newRankOcop = await checkingRankOcop(RankOcop, ScoreFile_id)
        if (TotalAfter >= 0) {
            const res = await fetch(`/scorefile/updateScoreTotal/${ScoreFile_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ScoreTotal: TotalAfter,
                    RankOcop: newRankOcop
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

// hàm tính điểm câu hỏi liệt
async function checkingRankOcop(RankOcop, ScoreFile_id) {
    try {
        if (RankOcop == 1) {
            return RankOcop = 1
        }
        if (RankOcop === 2) {
            return RankOcop = 2
        } else if (RankOcop === 3) {
            const results = await checkScoreFileDetail(ScoreFile_id, RankOcop)
            return results ? results : RankOcop
        } else if (RankOcop === 4) {
            const results = await checkScoreFileDetail(ScoreFile_id, RankOcop)
            return results ? results : RankOcop
        } else {
            const results = await checkScoreFileDetail(ScoreFile_id, RankOcop)
            return results ? results : RankOcop
        }
    } catch (error) {
        console.log(error)
    }
}
// hàm check những scorefileDetail nào đã check và check xem những scoreDetail đó có bỏ qua số sao nào không 
async function checkScoreFileDetail(scoreFileId, RankOcop) {
    // lay ra danh sach scorefileDetail da cham
    const response = await fetch(`/scoreFileDetail/IsScoreByScoreFile/${scoreFileId}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log(`ERR: checkScoreFileDetail`)
        return
    }
    const data = await response.json()
    // lay ra scoretempdetail trong scorefiledetail do
    const listScoreChecked = data.map((scoreDetail) => scoreDetail._id)
    // dieu neu rank ocop = 3   
    if (RankOcop === 2) {
        return await checkRank(RankOcop, listScoreChecked, scoreFileId)
    } else if (RankOcop === 3) {
        return await checkRank(RankOcop, listScoreChecked, scoreFileId)
    } else if (RankOcop === 4) {
        return await checkRank(RankOcop, listScoreChecked, scoreFileId)
        // console.log(resultCheckRank)
        // if (resultCheckRank >= 3) {
        //     const list3sao = await listScoreFileDetail3sao(scoreFileId)
        //     for (const id of list3sao) {
        //         const results = listScoreChecked.includes(id)
        //         if (!results) {
        //             return resultCheckRank - 1
        //         }
        //     }
        // }
        // return resultCheckRank
    } else {
        console.log(listScoreChecked)
        return checkRank(RankOcop, listScoreChecked, scoreFileId)
    }

}

// ham set rankOcop
async function checkRank(RankOcop, listScoreChecked, scoreFileId) {
    if (RankOcop > 3) {
        const list3sao = await listScoreFileDetail3sao(scoreFileId)
        const containsRank = listScoreChecked.some(id => list3sao.includes(id));
        // neu san pham ma tren 3 sao ma tich vao 1 cau 3 sao thi san pham chi la 3 sao
        if (containsRank) {
            return RankOcop = 3
        } else {
            // neu san pham co diem la 5 sao ma tich vao tieu chi 4 sao thi san pham chi dat 4 sao
            if (RankOcop = 5) {

                const list5sao = await listScoreFileDetail5sao(scoreFileId)
                for (const id of list5sao) {
                    const results = listScoreChecked.includes(id)
                    // neu khong tich du tieu chi 5 sao thi san pham chi dat 4 sao
                    if (!results) {
                        return RankOcop - 1

                    }
                }

                return RankOcop

                // const list4sao = await listScoreFileDetail4sao(scoreFileId)
                // const containsRank = listScoreChecked.some(id => list4sao.includes(id));
                // if (containsRank) {
                //     return RankOcop - 1
                // } else {
                //     return RankOcop
                // }
            }
            return RankOcop
        }
        // san pham 3 sao chi da dc khi tich du tieu chi 3 sao
    } else if (RankOcop === 3) {
        const list3sao = await listScoreFileDetail3sao(scoreFileId)
        for (const id of list3sao) {
            const results = listScoreChecked.includes(id)
            // neu khong tich du tieu chi 3 sao thi san pham chi dat 2 sao
            if (!results) {
                return RankOcop - 1
            }
        }
        return RankOcop
    } else {
        return RankOcop
    }
    // const containsRank5 = listScoreChecked.some(id => arrRank.includes(id) && RankOcop === 3);
    // for (const id of arrRank) {
    //     const results = listScoreChecked.includes(id)
    //     if (!results) {
    //         return RankOcop - 1
    //     }
    // }
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


// set Score
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
    document.querySelector(".partD").innerHTML = scorePartD
    document.querySelector(".totalPartD").innerHTML = totalPartD != 0 ? totalPartD : document.querySelector(".box-partD").innerHTML = ""
    // total
    document.querySelector(".TotalBefore").innerHTML = TotalBefore
    document.querySelector(".TotalAfter").innerHTML = TotalAfter

}


// danh sach 3 sao
async function listScoreFileDetail3sao(ScoreFile_id) {
    const listScoreDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    const listScoreDetailFilter = listScoreDetail.filter((scoreDetail) => scoreDetail.scoreTempDetail_validateRank === 3).map((id) => id._id)
    return listScoreDetailFilter
}
// danh sach 4 sao
async function listScoreFileDetail4sao(ScoreFile_id) {
    const listScoreDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    const listScoreDetailFilter = listScoreDetail.filter((scoreDetail) => scoreDetail.scoreTempDetail_validateRank === 4).map((id) => id._id)
    return listScoreDetailFilter
}
// danh sach 5 sao
async function listScoreFileDetail5sao(ScoreFile_id) {
    const listScoreDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    const listScoreDetailFilter = listScoreDetail.filter((scoreDetail) => scoreDetail.scoreTempDetail_validateRank === 5).map((id) => id._id)
    return listScoreDetailFilter
}


function repeatStarUpdate(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += "*"
    }
    return star
}







