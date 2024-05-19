const handleUpdate = async (id) => {
    const Code = document.getElementById(`Code${id}`)
    const Name = document.getElementById(`Name${id}`)
    const IsActive = document.getElementById(`IsActive${id}`)
    const Description = document.getElementById(`Description${id}`)
    const Customer_id = document.getElementById(`Customer_id${id}`)
    const ProductGroup_id = document.getElementById(`ProductGroup_id${id}`)
    const ProductYearId = document.getElementById(`ProductYearId${id}`)
    const Note = document.getElementById(`Note${id}`)
    const Avatar = document.getElementById(`avatar${id}`)
    const imagePreview = document.getElementById(`avatarPreview${id}`)
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
    form.append("IsActive", IsActive.value)
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
    const responseJson = await response.json()
    console.log(responseJson)
}