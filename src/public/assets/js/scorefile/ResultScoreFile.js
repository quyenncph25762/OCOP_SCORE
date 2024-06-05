async function handleResultScoreFiles(idScoreCommittee) {
    const tbodyResultsScoreFile = document.getElementById("tbodyResultsScoreFile")
    const response = await fetch(`/scorefile/byIdScoreCommittee/${idScoreCommittee}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi khi gọi ResultScoreFiles")
    }
    const listScoreFile = await response.json()
    console.log(listScoreFile)
    let i = 0
    tbodyResultsScoreFile.innerHTML = ""
    // Giả sử listScoreFile là một mảng các phần tử HTML (ví dụ: các đối tượng DOM trỏ tới các bảng)
    for (const scorefile of listScoreFile) {
        if (scorefile.Employee_id) {
            i += 1
            tbodyResultsScoreFile.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>
                    <strong style="font-size: 16px;">${scorefile.employee_FullName}</strong>
                    <p style="font-style: italic;">${scorefile.workposition_name} - ${scorefile.workdepartment_title}</p>
                </td>
                <td style="color: #F64E60; font-weight: 600;">${scorefile.ScoreTotal}</td>
                <td>
                ${repeatStar(scorefile.RankOcop)}
                </td>
                <td>
                    <div class="d-flex" style="gap: 10px;">
                        <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Xem chi tiết">
                            <a href="">
                                <ion-icon name="eye-outline"></ion-icon>
                            </a>
                        </span>
                        <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Phiếu chấm">
                            <a href="">
                                <ion-icon name="link-outline"></ion-icon>
                            </a>
                        </span>
                    </div>
                </td>
            </tr>
        `;
        }
    }
}

function repeatStar(number) {
    let starInnter = "";
    for (let i = 0; i < number; i++) {
        starInnter += `<ion-icon name="star"></ion-icon>`;
    }
    return starInnter;
}