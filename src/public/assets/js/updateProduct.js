const ArrId = []
const handleUpdate = async (id) => {
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
    const AttachFile = Array.from(document.querySelectorAll("#AttachFile")).map(e => e.files)
    const ProductDetailId = Array.from(document.querySelectorAll("#AttachFile")).map(e => e.getAttribute("data-productDetailId"))

    const fileUrl = Avatar.files && Avatar.files[0] ? URL.createObjectURL(Avatar.files[0]) : imagePreview.src;
    const index = fileUrl.indexOf("Uploads/");
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
    const response = await fetch(`/product-manage/${id}/update`, {
        method: "POST",
        body: form,
    })
    if (!response.ok) {
        alert("Lỗi cập nhật sản phẩm")
    }
    const arrResponseDelete = []
    for (const idGallery of ArrId) {
        const res = await fetch(`/gallery/delete/${idGallery}`, {
            method: "DELETE"
        })
        arrResponseDelete.push(res)
    }
    await Promise.all(arrResponseDelete)
    // const responseJson = await response.json()
    const reqGalleryNew = []
    for (let i = 0; i < AttachFile.length; i++) {
        if (AttachFile[i].length > 0) {
            for (const gallery of AttachFile[i]) {
                const formGalleryNew = new FormData()
                formGalleryNew.append("imgUrl", gallery)
                formGalleryNew.append("productDetail_id", ProductDetailId[i])
                const res = await fetch("/gallery/add", {
                    method: "POST",
                    body: formGalleryNew
                });
                reqGalleryNew.push(res)
            }
        }
    }
    await Promise.all(reqGalleryNew)
    $.alert("Cập nhật thành công!")
    setTimeout(() => {
        window.location.replace("/product-manage")
    }, 1000)
}

const handleIdGallery = async (id) => {
    if (id) {
        ArrId.push(Number(id))
    }
}
// const handleProductDetailid = async (id) => {
//     const valueFile = document.getElementById(`AttachFile${id}`)
//     console.log(valueFile.files)
//     console.log(id)
// }

