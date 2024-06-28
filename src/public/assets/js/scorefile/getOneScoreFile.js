const url = new URL(location.href)
const params = new URLSearchParams(url.searchParams)

if (params.has("productId") || params.has("code") && params.has("productgroupId")) {
    const productId = params.get("productId")
    const code = params.get("code")
    const productgroupId = params.get("productgroupId")
    getOneScoreTemp(code, productId, productgroupId)
} else {
    console.log("error")
}

async function getOneScoreTemp(code, productId, productgroupId) {
    try {
        console.log(`productId:`, productId)
        console.log(`productgroupId:`, productgroupId)
        // goi vien dan theo productDetail
        const responseProductDetailByProduct = await fetch(`/productDetail/${productId}`, {
            method: "GET"
        })
        const listProductDetail = await responseProductDetailByProduct.json()
        // goi scoretemp theo nhom san pham

        const getOneScoreTemp = await getScoreTempByProductGroup(productgroupId)
        if (getOneScoreTemp) {
            // lay ra id cua scoreTemp
            const scoreTempId = getOneScoreTemp._id

            const ListScoreTempDetail = await FuncGetScoreDetailByScoreTempId(scoreTempId)
            // tim den tbody cua scoreFile
            let tbodyScoreFile = document.getElementById("tbodyScoreFile")
            tbodyScoreFile.innerHTML = ""
            // tao ten checkbox mac dinh
            let checkBoxScoreName = "Score1"
            let checkboxScore = 1
            if (ListScoreTempDetail.length > 0) {
                for (let i = 0; i < ListScoreTempDetail.length; i++) {
                    // kiem tra neu ma co attachFile thi name checkbox thay doi
                    if (ListScoreTempDetail[i].ProductDetailId) {
                        checkBoxScoreName = "Score" + checkboxScore
                        checkboxScore += 1
                    }
                    getList = JSON.stringify(ListScoreTempDetail[i])
                    tbodyScoreFile.innerHTML += `
                    <tr>
                    <input type="hidden" class="ScoreTemp_id" value=${getOneScoreTemp._id}>
                    <input type="hidden" id="ScoreTempDetail${i}" value='${getList}'>
                    <input type="hidden" class="Score"></input>
                                ${ListScoreTempDetail[i].Name && !ListScoreTempDetail[i].IsScore ?
                            `
                                    <td style="max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                                    <p class="text-black-custom">
                                    ${ListScoreTempDetail[i].Name}
                                    </p>
                                    </td>
                                    `
                            :
                            `<td style="font-weight: 400; color: #000; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;font-size:13px">
                            
                        ${ListScoreTempDetail[i].Name} ${ListScoreTempDetail[i].ValidatedRank
                                ?
                                `<span class="text-start" style="font-size:13px">${repeatStar(ListScoreTempDetail[i].ValidatedRank)}</span>`
                                :
                                ""}
                                    </td > `
                        }
                                
                                ${ListScoreTempDetail[i].MaxScore >= 0 && ListScoreTempDetail[i].IsScore ?
                            `<td style="font-style: italic;text-align: center">
                             <p class="text-red" style="font-weight:600">
                             (${ListScoreTempDetail[i].MaxScore} điểm)
                             </p>
                            </td>`
                            :
                            `<td></td>`
                        }
                                ${ListScoreTempDetail[i].ProductDetailId ?
                            `<td data-toggle="modal" data-target="#exampleModalProductDetail" onclick="handleShowAttachFile(${productId},${ListScoreTempDetail[i].ProductDetailId})" style="text-align: center;max-width:80px"><ion-icon name="attach-outline"></ion-icon></td>
                                `
                            :
                            `<td></td>`
                        }
                               
                                ${ListScoreTempDetail[i].IsScore ?
                            `
                           
                            <td style="color: red; font-style: italic; text-align: center;"> 
                            <input type="radio" onChange="handleOnChange()" class="btnsRadio radio-custom" id="radio-${i}" data-id="${ListScoreTempDetail[i]._id}" value="${ListScoreTempDetail[i].MaxScore}" name="${checkBoxScoreName}">
                            <label for="radio-${i}" class="radio-custom-label"></label>
                            </td>
                            
                            `
                            :
                            `<td></td>`
                        }
                            </tr>
                        
                        `;
                }
                // undo radio
                document.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.addEventListener('click', function () {
                        if (this.checked) {
                            // console.log(`this.checked:`, this.checked)
                            // console.log(`this.wasChecked:`, this.wasChecked)
                            if (this.wasChecked) {
                                // switch tru diem theo phan
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
                            // Lấy tất cả các radio có cùng name với this
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
            } else {
                tbodyScoreFile.innerHTML = `
                <tr>
                <td colspan="4" class="text-center">Hiện chưa có phiếu</td>
                </tr>
                `
            }
        }

    } catch (error) {
        console.log(error)
    }
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
    // nhung cau hoi co max la 3 sao
    const listCrieriaMax3sao = funcListCriteria3sao(arrScoreTempDetail)
    // nhung cau hoi co điểm 4 và 5
    const listCriteriaMax4sao = funcListCriteria4sao(arrScoreTempDetail)
    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
    // lọc ra những scoreTempDetail nào đã checked
    const scoreValues = {};
    const arrChecked = []
    for (const btn of btnsRadio) {
        if (btn.checked) {
            const id = btn.dataset.id;
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
        if (arrScoreTempDetail[i].MaxScore > 5 && arrScoreTempDetail[i].IsScore === 0) {
            count += 1
            switch (count) {
                case 1:
                    totalPartA = arrScoreTempDetail[i].MaxScore
                    break;
                case 2:
                    totalPartB = arrScoreTempDetail[i].MaxScore
                    break;
                case 3:
                    totalPartC = arrScoreTempDetail[i].MaxScore
                    break;
                default:
                    break;
            }
        }
        if (arrScoreTempDetail[i].MaxScore > 0 && arrScoreTempDetail[i].IsScore
            === 1) {
            switch (count) {
                case 1:
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        for (const btn of btnsRadio) {
                            if (Number(btn.dataset.id) === Number(arrScoreTempDetail[i]._id)) {
                                btn.setAttribute("part", "A")
                            }
                        }
                        scorePartA += scoreValues[arrScoreTempDetail[i]._id]
                        document.querySelector(".partA").innerHTML = scorePartA
                    }
                    break;
                case 2:
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        for (const btn of btnsRadio) {
                            if (Number(btn.dataset.id) === Number(arrScoreTempDetail[i]._id)) {
                                btn.setAttribute("part", "B")
                            }
                        }
                        scorePartB += scoreValues[arrScoreTempDetail[i]._id]
                        document.querySelector(".partB").innerHTML = scorePartB
                    }
                    break;
                case 3:
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartC += scoreValues[arrScoreTempDetail[i]._id]
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

function repeatStar(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += "*"
    }

    return star
}

async function getScoreTempByProductGroup(idProductGroup) {
    try {
        const response = await fetch(`/scoretemp/byProductGroupId/${idProductGroup}`, {
            method: "GET"
        })
        if (!response.ok) {
            alert("Có lỗi không mong muốn , xin vui lòng thử lại")
            return
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function FuncGetScoreDetailByScoreTempId(scoreTempId) {
    // hien thi nhung scoreTempDetail theo scoreTempId
    const responseScoreDetail = await fetch(`/scoreTempDetail/scoreTemp/${scoreTempId}`, {
        method: "GET"
    })
    if (!responseScoreDetail.ok) {
        alert("Có lỗi không mong muốn!")
        return
    }
    return await responseScoreDetail.json()
}

function funcListCriteria3sao(arrScoreTempDetail) {
    // tao 1 arr chua khoang cach 
    let arrSpace = []
    // arr chua nhung tieu chi
    let arrListCriteria = []
    for (const item of arrScoreTempDetail) {
        if (item.ProductDetailId) {
            if (arrSpace.length > 0) {
                arrListCriteria.push(arrSpace)
                arrSpace = []
            }
        }
        if (item.IsScore) {
            arrSpace.push(item)
        }
    }
    if (arrSpace.length > 0) {
        const arrSaveCriteria = []
        // chuyen arr thanh arr score
        const arrListCriteriaScore = arrListCriteria.map((item) => item.map((criteriaItem) => ({
            _id: criteriaItem._id,
            rank: criteriaItem.ValidatedRank
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
        if (item.ProductDetailId) {
            if (arrSpace.length > 0) {
                arrListCriteria.push(arrSpace)
                arrSpace = []
            }
        }
        if (item.IsScore) {
            arrSpace.push(item)
        }
    }
    if (arrSpace.length > 0) {
        const arrSaveCriteria = []
        // chuyen arr thanh arr score
        const arrListCriteriaScore = arrListCriteria.map((item) => item.map((criteriaItem) => ({
            _id: criteriaItem._id,
            rank: criteriaItem.ValidatedRank
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

function checkRankFilter(list3sao, list4sao, list5sao, RankOcop, arrChecked, listCrieriaMax3sao, listCriteriaMax4sao) {
    if (RankOcop === 3) {
        for (const item of list3sao) {
            const results = arrChecked.includes(Number(item._id))
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

        const list3saoFilter = list3sao.filter((item) => !listCrieriaMax3saoId.includes(item._id))
        const arrList3SaoId = list3saoFilter.map((item) => item._id)
        const containsRank = arrChecked.some(id => arrList3SaoId.includes(Number(id)));
        if (containsRank) {
            return RankOcop - 1
        }
        // Kiểm tra xem có check vào listCriteria 4 sao không ? nếu ko thì RankOcop - 1 (bao gồm cả 4 và 5)
        for (const item of listCriteriaMax4sao) {
            if (arrChecked.some(id => item.includes(Number(id)))) {
                RankOcop
            } else {
                return RankOcop - 1
            }
        }
        return RankOcop
    } else if (RankOcop === 5) {
        // neu k dat nhung cau nay max diem la 3sao  xuong 2 sao luon
        const listCrieriaMax3saoId = listCrieriaMax3sao.map((item) => item._id)
        const validateRankContains = arrChecked.some(id => listCrieriaMax3saoId.includes(Number(id)));
        if (!validateRankContains) {
            return RankOcop = 2
        }


        for (const item of list5sao) {
            const results = arrChecked.includes(Number(item._id))
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


function listScore3sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list3sao = arrScoreTempDetail.filter((item) => item.ValidatedRank === 3)
        return list3sao
    }
    return
}
function listScore4sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list4sao = arrScoreTempDetail.filter((item) => item.ValidatedRank === 4)
        return list4sao
    }
    return
}
function listScore5sao(arrScoreTempDetail) {
    if (arrScoreTempDetail.length > 0) {
        const list5sao = arrScoreTempDetail.filter((item) => item.ValidatedRank === 5)
        return list5sao
    }
    return
}

function repeat(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += `<ion-icon name="star"></ion-icon>`
    }
    return star
}