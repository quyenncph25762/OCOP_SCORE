var SecEmployeeFilter = []
var room = 1;
// getone
const handleGetOneScoreCommittee = async (id) => {
    const tbodyScoreCommittDetail = document.querySelector(`#tbodyScoreCommitteeDetail${id}`)
    // list scoreCommittee detail theo ScoreCommittee id
    const actions = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${id}`, {
        method: "GET"
    })
    if (!actions.ok) {
        alert("Loi khi goi danh sach hoi dong")
    }
    // list employee
    const employees = await actions.json()
    // tao ra 1 mang id cua Employee
    const arrEmployeeId = []
    employees.map((item) => arrEmployeeId.push(item.UserId))
    // lay ra list employee trong dtb
    const actionsListEmployee = await fetch(`/employee/getAll`, {
        method: "GET"
    })
    const SecEmployee = await actionsListEmployee.json()
    // loc ra nhung employee nao khac voi employee trong scoreCommitteeDetail
    SecEmployeeFilter = SecEmployee.filter((employee) => !arrEmployeeId.includes(employee._id))
    tbodyScoreCommittDetail.innerHTML = ""
    let i = 0
    for (const employee of employees) {
        room++
        i += 1
        tbodyScoreCommittDetail.innerHTML += `
        <tr class="form-group removeclass${room} memberCount memberData" data-id="${employee.UserId}">
        <input class="idScoreTempDetail${id}" data-id="${employee._id}" hidden></input>
            <th scope="row">${i}</th>
            <td>
           <div style="display: flex;flex-direction: column">
           <p style="font-weight:600;font-size:14px">${employee.employee_FullName ? employee.employee_FullName : ""}</p>
           <p style="color:#ccc">${employee.employee_Email ? employee.employee_Email : ""}</p>
           </div>
            </td>
            <td>
            <div style="display: flex;flex-direction: column">
            <p style="font-weight:600;font-size:14px">${employee.department_Name ? employee.department_Name : ""}</p>
           <p style="color:#ccc">${employee.workposition_Name ? employee.workposition_Name : ""}</p>
            </div>
            </td>
            <td style="max-width: 130px;">
                <div class="form-group">
                    <select id="ValidatedRankDetail_${room}" name="validateRank" class="form-control CommitteeRole${id}"
                            style="transform: translateY(10px); max-width: 200px; max-height: 200px; overflow-y: hidden;font-size:12px"
                            data-target="#navbar-example2" data-offset="0">
                        <option value="1" ${employee.CommitteeRole === 1 ? "selected" : ""}>Chủ tịch</option>    
                        <option value="2" ${employee.CommitteeRole === 2 ? "selected" : ""}>Thành viên</option>
                        <option value="3" ${employee.CommitteeRole === 3 ? "selected" : ""}>Tư vấn viên</option>
                    </select>
                </div>
            </td>
            <td style="max-width: 250px;font-size:12px">
                <div class="form-group">
                    <select id="Employee_id_${room}" name="validateRank" class="form-control listEmployee${id}"
                            style="transform: translateY(10px); max-width: 200px; max-height: 200px; overflow-y: hidden;font-size:12px"
                            data-target="#navbar-example2" data-offset="0">
                            ${SecEmployeeFilter.map((secEmployee) => {
            return `
                                            <option class="secEmployeeValue${secEmployee._id}" data-id="${secEmployee._id}" value="${secEmployee._id}" ${employee.SecUserId === secEmployee._id ? "selected" : ""}>${secEmployee.FullName}</option>
                                            `
        })}
                    </select >
                </div >
            </td >
            <td>
               <div style="text-align:center">
                 <ion-icon onclick="remove_education_fields(${room});" class="icon__scoreTempDetail" name="trash-outline"></ion-icon>
               </div>
            </td>
        </tr >
        `
        //tim toi select
    }

}
// update

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
    // idScoreTempDetail
    let idScoreTempDetail = Array.from(document.querySelectorAll(`.idScoreTempDetail${id}`)).map(e => e.getAttribute("data-id"))
    idScoreTempDetail = idScoreTempDetail.map(Number)
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
            CommitteeRole: CommitteeRole[i],
            Employee_id: listEmployee[i],
            SecEmployee_id: listSecEmployee[i],
            UserId: listEmployee[i],
            SecUserId: listSecEmployee[i]
        }
        const response = await fetch(`/scoreCommitteeDetail/update/${idScoreTempDetail[i]}`, {
            method: "PUT",
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
        text: 'Cập nhật thành công!',
        icon: 'success',
        loader: true,
        loaderBg: '#9EC600',
        showHideTransition: 'slide',
        stack: 4
    }));
    window.location.reload()
}