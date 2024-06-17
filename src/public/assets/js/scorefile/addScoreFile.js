const handleAddScoreFile = async () => {
    if (params.has("_id")) {
        showLoading()
        const scoreFileId = params.get("_id")
        const Product_id = document.getElementById("Product_id").value
        const Customer_id = document.getElementById("Customer_id").value
        const CreatorUser_id = document.getElementById("CreatorUser_id").value
        const Note = document.getElementById("Note").value
        const ScoreTemp_id = Array.from(document.querySelectorAll(".ScoreTemp_id"))[0].value
        const Code = document.querySelector(".Code").value
        // const response = await fetch(`/scoreTemp/add`)

        const ScoreTempDetail = document.querySelectorAll("[id^=ScoreTempDetail]")
        const arrScoreTempDetail = []
        for (const item of ScoreTempDetail) {
            arrScoreTempDetail.push(JSON.parse(item.value))
        }
        console.log(arrScoreTempDetail)
        const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
        // lọc ra những scoreTempDetail nào đã checked
        const scoreValues = {};
        for (const btn of btnsRadio) {
            if (btn.checked) {
                const id = btn.dataset.id;
                scoreValues[id] = Number(btn.value);
            }
        }



        // 
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
                if (count === 1) {
                    totalPartA = arrScoreTempDetail[i].MaxScore
                } else if (count === 2) {
                    totalPartB = arrScoreTempDetail[i].MaxScore
                } else {
                    totalPartC = arrScoreTempDetail[i].MaxScore
                }
            }
            if (arrScoreTempDetail[i].MaxScore > 0 && arrScoreTempDetail[i].IsScore
                === 1) {
                if (count === 1) {
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartA += scoreValues[arrScoreTempDetail[i]._id]

                    }
                } else if (count === 2) {
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartB += scoreValues[arrScoreTempDetail[i]._id]
                    }
                } else if (count === 3) {
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartC += scoreValues[arrScoreTempDetail[i]._id]
                    }
                } else {
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartD += scoreValues[arrScoreTempDetail[i]._id]
                    }
                }
            }
        }
        // tong diem truoc khi cham
        const TotalBefore = (totalPartA + totalPartB + totalPartC + totalPartD)
        // tong diem sau khi cham
        const TotalAfter = (scorePartA + scorePartB + scorePartC + scorePartD)
        // RankOcop


        //ADD scoreFileDetail
        // Sau khi co nhung phieu chi tiet thuc hien them vao scoreFileDetail
        if (arrScoreTempDetail.length > 0) {
            const items = []
            for (const item of arrScoreTempDetail) {
                const form = {
                    ScoreFile_id: Number(scoreFileId),
                    CreatorUser_id: Number(CreatorUser_id),
                    ScoreTempDetail_id: item._id,
                    Score: (scoreValues[item._id] !== undefined && scoreValues[item._id] !== null) ? scoreValues[item._id] : null
                }
                items.push(form)
            }
            const res = await fetch(`/scoreFileDetail/add`, {
                method: "POST",
                body: JSON.stringify(items),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) {
                console.log("Lỗi khi thêm scoreFileDetail")
                return
            }
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
            const newRankOcop = await checkingRankOcop(RankOcop, scoreFileId)
            // ADD SCOREFILE
            const now = Date.now();
            const date = new Date(now);
            const formScoreFile = {
                Product_id: Number(Product_id),
                Customer_id: Number(Customer_id),
                CreatorUser_id: Number(CreatorUser_id),
                Employee_id: Number(CreatorUser_id),
                EmployeeUserId: Number(CreatorUser_id),
                ScoreDate: date,
                RankOcop: newRankOcop,
                Note: Note,
                Code: Code,
                ScoreTotal: TotalAfter,
                ScoreTemp_id: Number(ScoreTemp_id),
                Status: 1,
                IsActive: 1
            }
            // actions them scorefile
            const response = await fetch(`/scorefile/update/${scoreFileId}`, {
                method: "PATCH",
                body: JSON.stringify(formScoreFile),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                console.log("Lỗi khi thêm scorefile")
            }
            hideLoading()
            localStorage.setItem('toast', JSON.stringify({
                position: "top-right",
                heading: 'SUCCESS',
                text: 'Đã thêm thành công',
                icon: 'success',
                loader: true,
                loaderBg: '#9EC600',
                stack: 4
            }));
            window.location.replace("/scoreFile")
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
        return checkRank(RankOcop, listScoreChecked, scoreFileId)
    } else if (RankOcop === 3) {
        return checkRank(RankOcop, listScoreChecked, scoreFileId)
    } else if (RankOcop === 4) {
        return checkRank(RankOcop, listScoreChecked, scoreFileId)
    } else {
        return checkRank(RankOcop, listScoreChecked, scoreFileId)
    }

}

async function checkRank(RankOcop, listScoreChecked, scoreFileId) {
    console.log(RankOcop)
    if (RankOcop > 3) {
        const list3sao = await listScoreFileDetail3sao(scoreFileId)
        const containsRank = listScoreChecked.some(id => list3sao.includes(id));
        if (containsRank) {
            return RankOcop = 3
        } else {
            if (RankOcop = 5) {
                const list4sao = await listScoreFileDetail4sao(scoreFileId)
                const containsRank = listScoreChecked.some(id => list4sao.includes(id));
                if (containsRank) {
                    return RankOcop - 1
                } else {
                    return RankOcop
                }
            }
            return RankOcop
        }
    } else if (RankOcop === 3) {
        const list3sao = await listScoreFileDetail3sao(scoreFileId)
        console.log(list3sao)
        console.log(listScoreChecked)
        for (const id of list3sao) {
            const results = listScoreChecked.includes(id)
            console.log(results)
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

async function listScoreFileDetail3sao(ScoreFile_id) {
    const listScoreDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    const listScoreDetailFilter = listScoreDetail.filter((scoreDetail) => scoreDetail.scoreTempDetail_validateRank === 3).map((id) => id._id)
    return listScoreDetailFilter
}
async function listScoreFileDetail4sao(ScoreFile_id) {
    const listScoreDetail = await FuncListScoreDetailByScoreFile(ScoreFile_id)
    const listScoreDetailFilter = listScoreDetail.filter((scoreDetail) => scoreDetail.scoreTempDetail_validateRank === 4).map((id) => id._id)
    return listScoreDetailFilter
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