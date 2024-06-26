
var arrIdScoreCommittDetail = []
const FuncArrIdScoreCommittDetaill = (id) => {
    if (id) {
        arrIdScoreCommittDetail.push(Number(id))
    }
}


const handleUpdateScoreCommittee = async (id) => {
    // scoreCommittee
    const Name = document.getElementById(`Name${id}`).value
    const IsActive = document.getElementById(`IsActive${id}`).checked
    const yearReviewId = document.getElementById(`yearReviewId${id}`).value
    const Note = document.getElementById(`Note${id}`).value
    const scoreCommitee = {
        Name: Name,
        IsActive: IsActive === true ? 1 : 0,
        yearReviewId: yearReviewId,
        Note: Note

    }
    const actionUpdate = await fetch(`/scoreCommittee/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(scoreCommitee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!actionUpdate.ok) {
        alert("co lỗi xay ra khi cap nhat scorecommittee")
        return
    }

    //kiem tra neu mang id da xoa ma co thi thuc hien for xoa tung phan tu 1
    if (arrIdScoreCommittDetail.length > 0) {
        await deleteScoreCommitteeDetail(arrIdScoreCommittDetail)
    }
    // update scoreTempDetail
    $('.bootstrap-select').each(function () {
        $(this)
            .removeClass(`CommitteeRole${id}`)
            .removeClass(`memberData`)
            .removeClass(`listEmployee${id}`);
    });
    // idScoreTempDetail
    let idScoreCommittDetail = Array.from(document.querySelectorAll(`.memberData`)).map(e => e.getAttribute("data-idscorecommitteedetail"))
    idScoreCommittDetail = idScoreCommittDetail.map(Number)
    // scorecommitte_detail
    let CommitteeRole = Array.from(document.querySelectorAll(`.CommitteeRole${id}`)).map(e => e.value)
    CommitteeRole = CommitteeRole.map(Number)
    // Lay id employeeId
    let listEmployee = Array.from(document.querySelectorAll(`.memberData`)).map(e => e.getAttribute("data-id"))
    listEmployee = listEmployee.map(Number)
    // SecEmployeeId
    let listSecEmployee = Array.from(document.querySelectorAll(`.listEmployee${id}`)).map(e => e.value)
    listSecEmployee = listSecEmployee.map(Number)
    const arrResponse = []
    for (let i = 0; i < listEmployee.length; i++) {
        const form = {
            ScoreCommittee_id: Number(id),
            idScoreCommitteeDetail: idScoreCommittDetail[i],
            CommitteeRole: CommitteeRole[i],
            Employee_id: listEmployee[i],
            SecEmployee_id: listSecEmployee[i],
            UserId: listEmployee[i],
            SecUserId: listSecEmployee[i]
        }
        arrResponse.push(form)
    }
    await updateScoreCommitteeDetail(arrResponse)

    // doi update xong thi them nhung scoreCommitteeDetail nao chua co
    $('.bootstrap-select').each(function () {
        $(this).removeClass(`CommitteeRole${id}`)
            .removeClass(`listSecEmployee_newMember`)
            .removeClass(`newMember`)
            .removeClass(`CommitteeRole_newMember`);
    });
    // vai tro cua hoi dong
    let CommitteeRole_newMember = Array.from(document.querySelectorAll(".CommitteeRole_newMember")).map(e => e.value)
    CommitteeRole_newMember = CommitteeRole_newMember.map(Number)
    // Lay id employeeId
    let newMember = Array.from(document.querySelectorAll(".newMember")).map(e => e.getAttribute("data-id"))
    newMember = newMember.map(Number)
    // SecEmployeeId
    let listSecEmployee_newMember = Array.from(document.querySelectorAll(".listSecEmployee_newMember")).map(e => e.value)
    listSecEmployee_newMember = listSecEmployee_newMember.map(Number)
    const arrScoreCommitteeDetailAdd = []
    for (let i = 0; i < newMember.length; i++) {
        const form = {
            ScoreCommittee_id: id,
            CommitteeRole: CommitteeRole_newMember[i],
            Employee_id: newMember[i] === 0 ? null : newMember[i],
            SecEmployee_id: listSecEmployee_newMember[i] === 0 ? null : listSecEmployee_newMember[i],
            UserId: newMember[i] === 0 ? null : newMember[i],
            SecUserId: listSecEmployee_newMember[i] === null ? 0 : listSecEmployee_newMember[i]
        }

        arrScoreCommitteeDetailAdd.push(form)
    }
    await addScoreCommitteeDetail(arrScoreCommitteeDetailAdd)

    //Chức năng lấy ra charMan

    // lay ra nhng scoreCommitteeDetail vua them


    const listScoreCommittDetail = await listScoreCommittee(id)
    const charMan = listScoreCommittDetail?.find((item) => item.CommitteeRole === 1)
    if (charMan) {
        const formUpdate = {
            Employee_id: charMan.UserId ? charMan.UserId : charMan.SecUserId
        }
        await funcUpdateCharman(id, formUpdate)

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
        const formUpdate = {
            Employee_id: null
        }
        await funcUpdateCharman(id, formUpdate)
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
    // xoa xong set lai mang arrId rong
    arrIdScoreCommittDetail = []
    window.location.reload()
}



// ham xoa scorecommitteeDetail
async function deleteScoreCommitteeDetail(arrIdScoreCommittDetail) {
    try {
        await fetch(`/scoreCommitteeDetail/delete`, {
            method: "POST",
            body: JSON.stringify(arrIdScoreCommittDetail),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}


// ham update scorecommitteeDetail
async function updateScoreCommitteeDetail(arrResponse) {
    try {
        const response = await fetch(`/scoreCommitteeDetail/update`, {
            method: "PATCH",
            body: JSON.stringify(arrResponse),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            return console.log("Lỗi khi cập nhật hội đồng")
        }
    } catch (error) {
        console.log(error)
    }
}

// ham them nhung scoreCommittDetail chua co 
async function addScoreCommitteeDetail(arrScoreCommitteeDetailAdd) {
    try {
        const response = await fetch(`/scoreCommitteeDetail/add`, {
            method: "POST",
            body: JSON.stringify(arrScoreCommitteeDetailAdd),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            console.log("Lỗi khi thêm scorecommitteeDetail")
            return
        }
    } catch (error) {
        console.log(error)
    }
}

// Ham hien thi ra nhung scorecommittdetail vua them
async function listScoreCommittee(id) {
    try {
        const responseScoreDetail = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${id}`, {
            method: "GET"
        })
        if (!responseScoreDetail.ok) {
            alert("Đã xảy ra lỗi không mong muốn")
            return
        }
        return await responseScoreDetail.json()
    } catch (error) {
        console.log(error)
    }
}

// Ham update chu tich
async function funcUpdateCharman(id, formUpdate) {
    try {
        const updateCharMan = await fetch(`/scoreCommittee/updateCharMan/${id}`, {
            method: "PATCH",
            body: JSON.stringify(formUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!updateCharMan.ok) {
            alert("Lỗi update charMan")
        }
    } catch (error) {
        console.log(error)
    }
}