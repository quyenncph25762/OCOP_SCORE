var room = 1;

const handleCheckBoxUpdateListEmployee = (id) => {
    const btnsCheck = document.querySelectorAll(`.checkUpdate${id}`)
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-56159088-1');
    // checkbox All
    const checkAllUpdate = `#checkAllUpdate${id}`
    const checkUpdate = `.checkUpdate${id}`
    $(checkAllUpdate).click(function (e) {
        $(checkUpdate).prop('checked', $(this).prop('checked'));
    });
    window.dataLayer = window.dataLayer || [];

    const btnDisabled = document.querySelector(`.btnDisabledUpdate${id}`)
    let count = 0
    const checkBtnDisabled = () => {
        if (count === 0) {
            btnDisabled.setAttribute("disabled", true)
        } else {
            btnDisabled.removeAttribute("disabled")
        }
    }
    for (let checked of btnsCheck) {
        checkBtnDisabled()
        checked.addEventListener("click", (e) => {
            if (checked.checked) {
                count++
            } else {
                count--
            }
            checkBtnDisabled()
        })
    }
}

const handleGetOneScoreCommittee = async (id) => {
    handleCheckBoxUpdateListEmployee(id)
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
    // lay ra list employee trong dtb
    const actionsListEmployee = await fetch(`/employee/getAll`, {
        method: "GET"
    })
    const SecEmployee = await actionsListEmployee.json()
    const employeeUserIds = employees.map(emp => Number(emp.UserId));
    const filteredSecEmployee = SecEmployee.filter(emp => !employeeUserIds.includes(emp._id));
    tbodyScoreCommittDetail.innerHTML = ""
    let i = 0
    for (const employee of employees) {
        room++
        i += 1
        tbodyScoreCommittDetail.innerHTML += `
        <tr class="form-group removeclass${room} memberData" data-idScoreCommitteeDetail="${employee._id}" data-id="${employee.UserId}">
        <input class="idScoreTempDetail${id}" data-id="${employee._id}" hidden></input>
            <th scope="row">${i}</th>
            <td style="max-width:200px">
           <div style="display: flex;flex-direction: column">
           <p style="font-weight:600;font-size:13px;text-wrap:wrap">${employee.employee_FullName ? employee.employee_FullName : ""}</p>
           <p style="color:#ccc;text-wrap:wrap">${employee.employee_Email ? employee.employee_Email : ""}</p>
           </div>
            </td>
            <td style="max-width:200px">
            <div style="display: flex;flex-direction: column">
            <p style="font-weight:600;font-size:13px;text-wrap:wrap;">${employee.department_Name ? employee.department_Name : ""}</p>
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
                    <select id="Employee_id_${room}" name="validateRank" class="form-control listEmployee${id} listSecEmployee"
                            style="transform: translateY(10px); max-width: 200px; max-height: 200px; overflow-y: hidden;font-size:12px"
                            data-target="#navbar-example2" data-offset="0">
                            <option selected>Không xác định</option>
                            ${filteredSecEmployee.map((item) => {
            return ` <option value="${item._id}" ${item._id === employee.SecUserId ? "selected" : ""}>${item.FullName}</option>`
        })}
                    </select >
                </div >
            </td >
            <td>
               <div style="text-align:center">
                 <ion-icon onclick="remove_education_fields_update(${room},${employee._id});" class="icon__scoreTempDetail" name="trash-outline"></ion-icon>
               </div>
            </td>
        </tr >
        `

    }
}


const handleUpdateIsDefault = (id) => {
    $.confirm({
        title: '<ion-icon name="help-circle-outline"></ion-icon>',
        content: 'Kích hoạt chấm điểm ?',
        buttons: {
            confirm: {
                text: 'Confirm',
                btnClass: 'btn-blue',
                action: async function () {
                    // Gọi API cập nhật chấm điểm hội đồng isDefault = 1
                    try {
                        const res = await fetch(`/scoreCommittee/updateIsDefault/${id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                IsDefault: 1
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        if (!res.ok) {
                            console.log("Cos loi xa ra khi cap nhat isdefault committee")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    try {
                        // Lấy tất cả scoreCommitteeDetail theo scoreCommiteeId
                        // const responseScoreDetail = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${id}`, {
                        //     method: "GET"
                        // })
                        // if (!resScoreDetail.ok) {
                        //     console.log("Loi xay ra khi get scoreCommitteeDetail")
                        // }
                        // const dataScoreDetail = await resScoreDetail.json()
                        // Lấy scorefile chưa chấm điểm status = 0
                        // const resScoreFile = await fetch(`/scoreFile/getScoreByStatus`, {
                        //     method: "GET"
                        // })
                        // if (!resScoreFile.ok) {
                        //     console.log("Loi xay ra khi get scorefile")
                        // }
                        // // thuc hien updateScoreFile
                        // const listScoreFile = await resScoreFile.json()
                        // for (const scoreFile of listScoreFile) {

                        // }

                    } catch (error) {
                        console.log(error)
                    }
                    localStorage.setItem('toast', JSON.stringify({
                        position: "top-right",
                        heading: 'SUCCESS',
                        text: 'Hôi đồng đã bắt đầu chấm điểm',
                        icon: 'success',
                        loader: true,
                        loaderBg: '#9EC600',
                        showHideTransition: 'slide',
                        stack: 4
                    }));
                    window.location.reload()
                }
            },
            cancel: function () {
                $.alert('Đã hủy!');
            }
        }
    });
}