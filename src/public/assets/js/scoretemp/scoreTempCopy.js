async function handleCoppy(idScoreTemp, userId) {
    const response = await fetch(`/scoreTemp/getOne/${idScoreTemp}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi khi getOne scoreTemp")
    }
    const scoreTemp = await response.json()
    const { Code, Name, Note, IsActive, ProductGroup_id } = scoreTemp
    const newScoreTemp = {
        Code: Code,
        Name: (("copy") + Name),
        Note: Note,
        IsActive: IsActive,
        ProductGroup_id: ProductGroup_id,
        CreatorUser_id: Number(userId)
    }
    const resAddScoreTemp = await fetch(`/scoreTemp/add`, {
        method: "POST",
        body: JSON.stringify(newScoreTemp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!resAddScoreTemp.ok) {
        console.log("Lỗi khi them scoreTemp")
    }
    const responseJson = await resAddScoreTemp.json()
    const ScoreTempId = responseJson?.data?._id
    const responseListScoreDetail = await fetch(`/scoreTempDetail/scoreTemp/${idScoreTemp}`, {
        method: "GET"
    })
    if (!responseListScoreDetail.ok) {
        console.log(`Lỗi khi gọi danh sách scoreTempDetail`)
    }
    const listScoreDetail = await responseListScoreDetail.json()
    const arrRes = []
    for (const scoreDetail of listScoreDetail) {
        const { Name, IsScore, MaxScore, ValidatedRank, ProductDetailId, Note } = scoreDetail
        const formScoreDetail = {
            ScoreTemp_id: ScoreTempId,
            Name: Name,
            IsScore: IsScore,
            MaxScore: MaxScore,
            ValidatedRank: ValidatedRank,
            ProductDetailId: ProductDetailId,
            Note: Note
        }
        const response = await fetch("/scoreTempDetail/add", {
            method: "POST",
            body: JSON.stringify(formScoreDetail),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            arrRes.push(response)
        }
    }
    await Promise.all(arrRes)
    localStorage.setItem('toast', JSON.stringify({
        position: "top-right",
        heading: 'SUCCESS',
        text: 'Đã copy thành công',
        icon: 'success',
        loader: true,
        loaderBg: '#9EC600',
        stack: 4
    }));
    window.location.reload()
}