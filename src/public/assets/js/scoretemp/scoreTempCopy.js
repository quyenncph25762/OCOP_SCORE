async function handleCoppy(idScoreTemp, userId) {
    showLoading()
    const scoreTemp = await getOneScoreTemp(idScoreTemp)
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

    const listScoreDetail = await listScoreDetailByScoreTempId(idScoreTemp)
    const items = []
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
        items.push(formScoreDetail)
    }
    // Thuc hien them scoredetail
    await funcScoreDetailAdd(items)

    hideLoading();
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

async function funcScoreDetailAdd(items) {
    try {
        const response = await fetch("/scoreTempDetail/add", {
            method: "POST",
            body: JSON.stringify(items),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            console.log("Có lỗi xảy ra khi thêm scoretempDetail")
            return
        }
    } catch (error) {
        console.log(error)
    }
}



async function getOneScoreTemp(idScoreTemp) {
    const response = await fetch(`/scoreTemp/getOne/${idScoreTemp}`, {
        method: "GET"
    })
    if (!response.ok) {
        console.log("Lỗi khi getOne scoreTemp")
    }
    return await response.json()
}

async function listScoreDetailByScoreTempId(idScoreTemp) {
    const responseListScoreDetail = await fetch(`/scoreTempDetail/scoreTemp/${idScoreTemp}`, {
        method: "GET"
    })
    if (!responseListScoreDetail.ok) {
        console.log(`Lỗi khi gọi danh sách scoreTempDetail`)
    }
    return await responseListScoreDetail.json()
}