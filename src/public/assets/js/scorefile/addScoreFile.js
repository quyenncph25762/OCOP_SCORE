const handleAddScoreFile = async () => {
    if (params.has("_id")) {
        showLoading()
        const scoreFileId = params.get("_id")
        const Product_id = document.getElementById("Product_id").value
        const Customer_id = document.getElementById("Customer_id").value
        const CreatorUser_id = document.getElementById("CreatorUser_id").value
        console.log(CreatorUser_id)
        const Note = document.getElementById("Note").value
        const ScoreTemp_id = Array.from(document.querySelectorAll(".ScoreTemp_id"))[0].value
        const Code = document.querySelector(".Code").value
        // const response = await fetch(`/scoreTemp/add`)

        const ScoreTempDetail_id = Array.from(document.querySelectorAll(".ScoreTempDetail_id")).map(e => (e.value))
        const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio"))
        // lọc ra những scoreTempDetail nào đã checked
        const scoreValues = {};
        for (const btn of btnsRadio) {
            if (btn.checked) {
                const id = btn.dataset.id;
                scoreValues[id] = Number(btn.value);
            }
        }

        // dùng for chạy qua các id để lấy phiếu chi tiết rồi push vào mảng 
        const arrScoreTempDetail = []
        for (const id of ScoreTempDetail_id) {
            const response = await fetch(`/scoreTempDetail/getOne/${id}`, {
                method: "GET"
            })
            if (!response.ok) {
                console.log("Lỗi khi fetch danh sách scoretempdetail")
                return
            }
            const data = await response.json()
            arrScoreTempDetail.push(data)
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
        //ADD scoreFileDetail
        // Sau khi co nhung phieu chi tiet thuc hien them vao scoreFileDetail
        if (arrScoreTempDetail.length > 0) {
            const arrResponse = []
            for (const item of arrScoreTempDetail) {
                const form = {
                    ScoreFile_id: Number(scoreFileId),
                    CreatorUser_id: Number(CreatorUser_id),
                    ScoreTempDetail_id: item._id,
                    Score: (scoreValues[item._id] !== undefined && scoreValues[item._id] !== null) ? scoreValues[item._id] : null
                }
                const response = await fetch(`/scoreFileDetail/add`, {
                    method: "POST",
                    body: JSON.stringify(form),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!response.ok) {
                    console.log("Lỗi khi thêm scoreFileDetail")
                    return
                }
                arrResponse.push(response)
            }
            await Promise.all(arrResponse)
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
        const response = await fetch(`/scoreTempDetail/byScoreFile/${ScoreFile_id}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi call scoretempDetail By scoreFile")
        }
        const listScoreDetail = await response.json()
        if (RankOcop === 2) {
            return RankOcop === 2
        } else if (RankOcop === 3) {
            // lay danh sach cau hoi 3 sao
            let scoreRank = listScoreDetail.filter((scoreDetail) => scoreDetail.ValidatedRank === RankOcop).map((item) => item._id)
            const results = await checkScoreFileDetail(ScoreFile_id, scoreRank, RankOcop)
            // kiem tra neu ma dat het thi lay rank ocop
            return results ? results : RankOcop
        } else if (RankOcop === 4) {
            // lay danh sach cau hoi 4 sao
            let scoreRank = listScoreDetail.filter((scoreDetail) => scoreDetail.ValidatedRank === RankOcop).map((item) => item._id)
            const results = await checkScoreFileDetail(ScoreFile_id, scoreRank, RankOcop)
            return results ? results : RankOcop
        } else {
            // lay danh sach cau hoi 5 sao
            let scoreRank = listScoreDetail.filter((scoreDetail) => scoreDetail.ValidatedRank === 5).map((item) => item._id)
            const results = await checkScoreFileDetail(ScoreFile_id, scoreRank, RankOcop)
            return results ? results : RankOcop
        }
    } catch (error) {
        console.log(error)
    }
}
// hàm check những scorefileDetail nào đã check và check xem những scoreDetail đó có bỏ qua số sao nào không 
async function checkScoreFileDetail(scoreFileId, arrRank, RankOcop) {
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
    const listScoreChecked = data.map((scoreDetail) => scoreDetail.ScoreTempDetail_id)
    // dieu neu rank ocop = 3   
    if (RankOcop === 2) {
        return checkRank(RankOcop, arrRank, listScoreChecked)
    } else if (RankOcop === 3) {
        return checkRank(RankOcop, arrRank, listScoreChecked)
    } else if (RankOcop === 4) {
        return checkRank(RankOcop, arrRank, listScoreChecked)
    } else {
        return checkRank(RankOcop, arrRank, listScoreChecked)
    }

}

function checkRank(RankOcop, arrRank, listScoreChecked) {
    for (const id of arrRank) {
        const results = listScoreChecked.includes(id)
        if (!results) {
            return RankOcop - 1
        }
    }
}