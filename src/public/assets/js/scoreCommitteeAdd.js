const handleAdd = async () => {
    // scoreCommittee
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
        // id scoreCommittee
        const IdScoreCommittee = response.ScoreCommittee._id
        // thuc hien cap nhat scoreFile them scoreCommitee
        const res = await fetch(`/scoreFile/getScoreByStatus`, {
            method: "GET"
        })
        if (!res.ok) {
            alert("Đã xảy ra lỗi không mong muốn")
        }
        const listScoreFile = await res.json()
        // lay danh sach scoreFile , roi cap nhat tung scoreFile co status bang 0
        const form = {
            ScoreCommitee_id: IdScoreCommittee
        }
        if (listScoreFile.length > 0) {
            for (const scoreFile of listScoreFile) {
                await fetch(`/scoreFile/updateScoreCommittOnScoreFile/${scoreFile._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(form),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
        }
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
        window.location.reload()
    }
}