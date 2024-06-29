const ArrId = []
const handleUpdate = async (id) => {
    if (id) {
        showLoading()
        const Code = document.getElementById(`Code${id}`)
        const Name = document.getElementById(`Name${id}`)
        const IsActive = document.getElementById(`IsActive${id}`).checked
        const Description = document.getElementById(`Description${id}`)
        const Customer_id = document.getElementById(`Customer_id${id}`)
        const ProductGroup_id = document.getElementById(`ProductGroup_id${id}`)
        const ProductYearId = document.getElementById(`ProductYearId${id}`)
        const Note = document.getElementById(`Note${id}`)
        const Avatar = document.getElementById(`avatar${id}`)
        const imagePreview = document.getElementById(`avatarPreview${id}`)
        const DistrictId = document.getElementById(`DistrictId${id}`).value
        const AttachFile = Array.from(document.querySelectorAll("#AttachFile")).map(e => e.files)
        const ProductDetailId = Array.from(document.querySelectorAll("#AttachFile")).map(e => e.getAttribute("data-productDetailId"))
        const fileUrl = Avatar.files && Avatar.files[0] ? URL.createObjectURL(Avatar.files[0]) : imagePreview.src;
        const index = fileUrl.indexOf("/Uploads/");
        let relativePath = "";
        if (index !== -1) {
            relativePath = fileUrl.substring(index);
        }
        const form = new FormData()
        form.append("Code", Code.value)
        form.append("Avatar", Avatar?.files[0] ? Avatar.files[0] : relativePath)
        form.append("Name", Name.value)
        form.append("IsActive", IsActive === true ? 1 : 0)
        form.append("Description", Description.value)
        form.append("Customer_id", Customer_id.value)
        form.append("ProductGroup_id", ProductGroup_id.value)
        form.append("ProductYearId", ProductYearId.value)
        form.append("Note", Note.value)
        form.append("DistrictId", DistrictId || "")
        const response = await fetch(`/product-manage/${id}/update`, {
            method: "PATCH",
            body: form,
        })
        if (!response.ok) {
            const data = await response.json()
            $.toast({
                position: "top-right",
                heading: 'WARNING!',
                text: data.message,
                icon: 'warning',
                loader: true,
                loaderBg: '#9EC600',
                stack: 4
            })
            hideLoading()
            return
        }
        const arrResponseDelete = []
        for (const idGallery of ArrId) {
            arrResponseDelete.push(idGallery)
        }
        if (arrResponseDelete.length > 0) {
            await funcDeleteGallery(arrResponseDelete)
            window.location.replace("/product-manage")
        }
        const formGalleryNew = new FormData()
        for (let i = 0; i < AttachFile.length; i++) {
            if (AttachFile[i].length > 0) {
                for (const gallery of AttachFile[i]) {
                    formGalleryNew.append("imgUrl", gallery)
                    formGalleryNew.append("productDetail_id", ProductDetailId[i])
                }
            }
        }
        if (formGalleryNew) {
            await funcAddGallery(formGalleryNew)
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
        window.location.reload()
    }
}

const handleIdGallery = async (id) => {
    if (id) {
        ArrId.push(Number(id))
    }
}

async function funcDeleteGallery(arrId) {
    try {
        await fetch(`/gallery/delete`, {
            method: "POST",
            body: JSON.stringify(arrId),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function funcAddGallery(arrGallery) {
    try {
        await fetch("/gallery/add", {
            method: "POST",
            body: arrGallery
        });
    } catch (error) {
        console.log(error)
    }
}
// const handleProductDetailid = async (id) => {
//     const valueFile = document.getElementById(`AttachFile${id}`)
//     console.log(valueFile.files)
//     console.log(id)
// }

