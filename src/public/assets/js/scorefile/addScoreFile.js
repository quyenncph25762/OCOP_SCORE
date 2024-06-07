const handleAddScoreFile = async () => {
    if (params.has("_id")) {
        const scoreFileId = params.get("_id")
        const Product_id = document.getElementById("Product_id").value
        const Customer_id = document.getElementById("Customer_id").value
        const CreatorUser_id = document.getElementById("CreatorUser_id").value
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
            const response = await fetch(`/scoreTempDetail/${id}`, {
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
            }
            if (arrScoreTempDetail[i].MaxScore > 0 && arrScoreTempDetail[i].IsScore
                === 1) {
                if (count === 1) {
                    totalPartA += arrScoreTempDetail[i].MaxScore
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartA += scoreValues[arrScoreTempDetail[i]._id]

                    }
                } else if (count === 2) {
                    totalPartB += arrScoreTempDetail[i].MaxScore
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartB += scoreValues[arrScoreTempDetail[i]._id]
                    }
                } else if (count === 3) {
                    totalPartC += arrScoreTempDetail[i].MaxScore
                    if (scoreValues[arrScoreTempDetail[i]._id]) {
                        scorePartC += scoreValues[arrScoreTempDetail[i]._id]
                    }
                } else {
                    totalPartD += arrScoreTempDetail[i].MaxScore
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
            RankOcop: RankOcop,
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