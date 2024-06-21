async function handleAdd() {
    const Code = document.getElementById("Code").value
    const Name = document.getElementById("Name").value
    const IsActive = document.getElementById("IsActive").checked
    const ProductGroup_id = document.getElementById("ProductGroup_id").value
    const Note = document.getElementById("Note").value
    const CreatorUser_id = document.getElementById("CreatorUser_id").value
    const ScoreTemp = {
        Code: Code,
        Name: Name,
        IsActive: IsActive === true ? 1 : 0,
        ProductGroup_id: ProductGroup_id,
        Note: Note,
        CreatorUser_id: CreatorUser_id
    }
    const res = await fetch(`/scoreTemp/add`, {
        method: "POST",
        body: JSON.stringify(ScoreTemp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const messageRes = await res.json()
    if (messageRes) {
        const NameDetail = Array.from(document.querySelectorAll("#NameDetail"))?.map(e => e.value)
        const IsMark = Array.from(document.querySelectorAll(".IsMark"))?.map(e => e.checked)
        const MaxScoreDetail = Array.from(document.querySelectorAll("#MaxScoreDetail"))?.map(e => e.value)
        const ValidatedRankDetail = Array.from(document.querySelectorAll("#ValidatedRankDetail"))?.map(e => e.value)
        const ProductDetailIdDetail = Array.from(document.querySelectorAll("#ProductDetailIdDetail"))?.map(e => e.value)
        const NoteDetail = Array.from(document.querySelectorAll("#NoteDetail"))?.map(e => e.value)
        const arrRes = []
        for (let i = 0; i < NameDetail.length; i++) {
            const ProductDetail = {
                ScoreTemp_id: messageRes.data?._id,
                Name: NameDetail[i],
                IsScore: IsMark[i] === true ? 1 : 0,
                MaxScore: MaxScoreDetail[i],
                ValidatedRank: Number(ValidatedRankDetail[i]),
                ProductDetailId: ProductDetailIdDetail[i] === "" ? null : ProductDetailIdDetail[i],
                Note: NoteDetail[i]
            }

            arrRes.push(ProductDetail)
        }
        await funcAddScoreTempDetail(arrRes)
        localStorage.setItem('toast', JSON.stringify({
            position: "top-right",
            heading: 'Thêm thành công',
            text: 'Đã thêm thành công',
            icon: 'success',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        }));
        window.location.replace("/scoreTemp")
    } else {
        localStorage.setItem('toast', JSON.stringify({
            position: "top-right",
            heading: 'Thêm thất bại',
            text: 'Đã thêm thất bại',
            icon: 'error',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        }));
    }
}

async function funcAddScoreTempDetail(arrRes) {
    try {
        const res = await fetch("/scoreTempDetail/add", {
            method: "POST",
            body: JSON.stringify(arrRes),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            console.log("Loi khi them scoretempdetail")
        }
    } catch (error) {
        console.log(error)
    }
} 