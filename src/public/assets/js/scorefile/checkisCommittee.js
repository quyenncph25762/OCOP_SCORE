const boxIsCommittee = Array.from(document.querySelectorAll(".box_icon-isCommittee"))
const idScoreFile = boxIsCommittee.map(e => Number(e.getAttribute("data-id")))
const idCommittee = boxIsCommittee.map(e => Number(e.getAttribute("data-idCommittee")))
const UserIdSessions = boxIsCommittee.map(e => Number(e.getAttribute("data-UserId")))
const productId = boxIsCommittee.map(e => Number(e.getAttribute("data-ProductId")))
const productGroupCode = boxIsCommittee.map(e => e.getAttribute("data-productGroupCode"))
const productgroupId = boxIsCommittee.map(e => e.getAttribute("data-productgroupId"))
if (boxIsCommittee.length > 0) {
    checkIsCommitee(idCommittee, UserIdSessions, productId, productGroupCode, idScoreFile, productgroupId)
}
async function checkIsCommitee(idCommittee, UserIdSessions, productId, productGroupCode, idScoreFile, productgroupId) {
    const res = await fetch(`/scoreCommitteeDetail/getByScoreCommittee/${idCommittee[0]}`, {
        method: "GET"
    })
    if (!res.ok) {
        console.log("ERR: CheckIsCommittee")
    }
    const data = await res.json()
    const check = data?.find(user => user.UserId && user.UserId === UserIdSessions[0] || user.SecUserId && user.SecUserId === UserIdSessions[0]);
    if (!check) {
        boxIsCommittee.innerHTML = ""
    } else {
        for (let i = 0; i < boxIsCommittee.length; i++) {
            boxIsCommittee[i].innerHTML = `
            
            <a style="text-decoration: none;"
                href="/scoreFile/createScoreFile?productId=${productId[i]}&productgroupId=${productgroupId}&code=${productGroupCode[i]}&_id=${idScoreFile[i]}">
                <ion-icon name="ribbon-outline"></ion-icon>
        </a>
            `
        }
    }
}
