async function handleUpdate(id) {
    if (id) {
        showLoading()
        const Code = document.getElementById(`Code${id}`).value
        const Name = document.getElementById(`Name${id}`).value
        const IsActive = document.getElementById(`IsActive${id}`).checked
        const ProductGroup_id = document.getElementById(`ProductGroup_id${id}`).value
        const Note = document.getElementById(`Note${id}`).value
        if (funcValidate(Name.trim() === "", "Tên phiếu không được để trống")) {
            return
        }
        if (funcValidate(ProductGroup_id.trim() === "", "Tên nhóm sản phẩm không được để trống")) {
            return
        }
        if (funcValidate(Code.trim() === "", "Mã không được để trống")) {
            return
        }
        const ScoreTemp = {
            Code: Code,
            Name: Name,
            IsActive: IsActive === true ? 1 : 0,
            ProductGroup_id: ProductGroup_id,
            Note: Note
        }
        const response = await fetch(`/scoreTemp/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(ScoreTemp),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const data = await response.json()
            console.log(data)
            hideLoading()
            alert("Sửa sản phẩm thất bại!")
            return
        }
        // Thêm phiếu chi tiết chưa có
        const NewNameDetail = Array.from(document.querySelectorAll(".NameDetail"))?.map(e => e.value)
        const NewIsMark = Array.from(document.querySelectorAll(".IsMark"))?.map(e => e.checked)
        const NewMaxScoreDetail = Array.from(document.querySelectorAll(".MaxScoreDetail"))?.map(e => e.value)
        const NewValidatedRankDetail = Array.from(document.querySelectorAll(".ValidatedRankDetail"))?.map(e => e.value)
        const NewProductDetailIdDetail = Array.from(document.querySelectorAll(".ProductDetailIdDetail"))?.map(e => e.value)
        const NewNoteDetail = Array.from(document.querySelectorAll(".NoteDetail"))?.map(e => e.value)
        if (NewNameDetail.length > 0) {
            const arrAdd = []
            for (let i = 0; i < NewNameDetail.length; i++) {
                const ProductDetail = {
                    ScoreTemp_id: id,
                    Name: NewNameDetail[i],
                    IsScore: NewIsMark[i] === true ? 1 : 0,
                    MaxScore: NewMaxScoreDetail[i],
                    ValidatedRank: Number(NewValidatedRankDetail[i]),
                    ProductDetailId: NewProductDetailIdDetail[i] === "" ? null : NewProductDetailIdDetail[i],
                    Note: NewNoteDetail[i]
                }
                arrAdd.push(ProductDetail)
            }
            const response = await fetch("/scoreTempDetail/add", {
                method: "POST",
                body: JSON.stringify(arrAdd),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                console.log("lỗi khi thêm scoretempdetail")
                return
            }
        }
        // Sửa phiếu chi tiết
        const NameDetail = Array.from(document.querySelectorAll(`.NameDetail${id}`))?.map(e => e.value)
        const NameDataId = Array.from(document.querySelectorAll(`.NameDetail${id}`))?.map(e => e.getAttribute('data-id'))
        const IsMark = Array.from(document.querySelectorAll(`.IsMark${id}`))?.map(e => e.checked)
        const MaxScoreDetail = Array.from(document.querySelectorAll(`.MaxScoreDetail${id}`))?.map(e => e.value)
        const ValidatedRankDetail = Array.from(document.querySelectorAll(`.ValidatedRankDetail${id}`)).map(e => e.value)
        const ProductDetailIdDetail = Array.from(document.querySelectorAll(`.ProductDetailIdDetail${id}`))?.map(e => e.value)
        const NoteDetail = Array.from(document.querySelectorAll(`.NoteDetail${id}`))?.map(e => e.value)
        const arrResUpdate = []
        for (let i = 0; i < NameDetail.length; i++) {
            const ProductDetail = {
                ScoreTemp_id: id,
                ScoreTempDetailId: NameDataId[i],
                Name: NameDetail[i],
                IsScore: IsMark[i],
                MaxScore: MaxScoreDetail[i],
                ValidatedRank: Number(ValidatedRankDetail[i]),
                ProductDetailId: ProductDetailIdDetail[i] === "" ? null : ProductDetailIdDetail[i],
                Note: NoteDetail[i]
            }
            arrResUpdate.push(ProductDetail)
        }
        const responseUpdate = await fetch(`/scoreTempDetail/update`, {
            method: "PUT",
            body: JSON.stringify(arrResUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!responseUpdate.ok) {
            console.log("Lỗi khi cập nhật")
            return
        }
        hideLoading()
        localStorage.setItem('toast', JSON.stringify({
            position: "top-right",
            heading: 'Cập nhật thành công',
            text: 'Đã cập nhật thành công',
            icon: 'success',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        }));
        window.location.replace("/scoreTemp")
    }
}

function funcValidate(err, message) {
    if (err) {
        hideLoading()
        $.toast({
            position: "top-right",
            heading: 'WARNING!',
            icon: "warning",
            loader: true,
            loaderBg: '#9EC600',
            stack: 4,
            text: message,
            allowToastClose: true
        });
        return true
    }
    return false
}