const handleAdd = async () => {
    // add scoreCommittee
    const Name = document.getElementById("Name").value
    const IsActive = document.getElementById("IsActive").checked
    const yearReviewId = document.getElementById("yearReviewId").value
    const Note = document.getElementById("Note").value
    const CreatorUser_id = document.getElementById("CreatorUser_id").value
    if (Name.trim() === "") {
        document.querySelector("#ErrorName").innerHTML = "Tên không được để trống"
        return
    } else {
        document.querySelector("#ErrorName").innerHTML = ""
    }
    const ScoreCommittee = {
        Name: Name,
        IsActive: IsActive === true ? 1 : 0,
        yearReviewId: yearReviewId,
        Note: Note,
        CreatorUser_id: CreatorUser_id,
    }
    const res = await fetch(`/scoreCommittee/add`, {
        method: "POST",
        body: JSON.stringify(ScoreCommittee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!res.ok) {
        alert("Có lỗi xảy ra khi thêm Hội đồng")
        return
    }
    const response = await res.json()


    if (response) {
        // lay id scoreCommittee vua them 
        const IdScoreCommittee = response.ScoreCommittee._id
        // Them scoreCommittee detail
        // vai tro cua hoi dong
        let CommitteeRole = Array.from(document.querySelectorAll(".CommitteeRole")).map(e => e.value)
        CommitteeRole = CommitteeRole.map(Number)
        // Lay id employeeId
        let listEmployee = Array.from(document.querySelectorAll(".memberCount")).map(e => e.getAttribute("data-id"))
        listEmployee = listEmployee.map(Number)
        // SecEmployeeId
        let listSecEmployee = Array.from(document.querySelectorAll(".listEmployee")).map(e => e.value)
        listSecEmployee = listSecEmployee.map(Number)
        const arrResponse = []
        for (let i = 0; i < listEmployee.length; i++) {
            const form = {
                // id scoreCommitee vua them
                ScoreCommittee_id: IdScoreCommittee,
                CommitteeRole: CommitteeRole[i],
                Employee_id: listEmployee[i],
                SecEmployee_id: listSecEmployee[i] === 0 ? null : listSecEmployee[i],
                UserId: listEmployee[i],
                SecUserId: listSecEmployee[i] === 0 ? null : listSecEmployee[i]
            }
            const response = await fetch(`/scoreCommitteeDetail/add`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            arrResponse.push(response)
        }
        await Promise.all(arrResponse)

        // thuc hien them charName cho scorecommittee 

        // lay ra nhng scoreCommitteeDetail vua them
        const responseScoreDetail = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${IdScoreCommittee}`, {
            method: "GET"
        })
        if (!responseScoreDetail.ok) {
            alert("Đã xảy ra lỗi không mong muốn")
            return
        }
        const listScoreCommittDetail = await responseScoreDetail.json()
        const charMan = listScoreCommittDetail.find((item) => item.CommitteeRole === 1)
        if (charMan) {
            const formUpdate = {
                Employee_id: charMan.UserId ? charMan.UserId : charMan.SecUserId
            }
            const updateCharMan = await fetch(`/scoreCommittee/updateCharMan/${IdScoreCommittee}`, {
                method: "PATCH",
                body: JSON.stringify(formUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!updateCharMan.ok) {
                alert("Lỗi update charMan")
            }
            localStorage.setItem('toast', JSON.stringify({
                position: "top-right",
                heading: 'SUCCESS',
                text: 'Đã thêm thành công!',
                icon: 'success',
                loader: true,
                loaderBg: '#9EC600',
                showHideTransition: 'slide',
                stack: 4
            }));
        } else {
            localStorage.setItem('toast', JSON.stringify({
                position: "top-right",
                heading: 'WARNING',
                text: 'Hiện hội đồng chấm không có chủ tịch!',
                icon: 'warning',
                loader: true,
                loaderBg: '#9EC600',
                showHideTransition: 'slide',
                stack: 4
            }));
        }
        window.location.reload()
    }
}