async function handleAdd() {
    const Name = document.getElementById("Name").value
    const Description = document.getElementById("Description").value
    const Customer_id = document.getElementById("Customer_id").value
    const ProductGroup_id = document.getElementById("ProductGroup_id").value
    const ProductYearId = document.getElementById("ProductYearId").value
    const Code = document.getElementById("Code").value
    const Note = document.getElementById("Note").value
    const IsActive = document.getElementById("IsActive").value
    const Avatar = document.getElementById("Avatar")
    const formData = new FormData()
    formData.append('Name', Name);
    formData.append('Description', Description);
    formData.append('ProductYearId', ProductYearId);
    formData.append('Code', Code);
    formData.append('IsActive', IsActive);
    formData.append('Note', Note);
    formData.append('Avatar', Avatar?.files[0]);
    formData.append('ProductGroup_id', ProductGroup_id);
    formData.append('Customer_id', Customer_id);
    const res = await fetch("/product-manage/create", {
        method: "POST",
        body: formData
    })
    if (!res.ok) {
        localStorage.setItem('toast', JSON.stringify({
            position: "top-right",
            heading: 'Hãy nhập giá trị của sản phẩm',
            text: 'Sản phẩm thiếu giá trị',
            icon: 'warning',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        }));
        return
    }
    const responseProduct = await res.json()
    const productId = responseProduct?.data[0]?._id
    const resGetAllProductDetail = await fetch("/productDetail/limit", {
        method: "GET"
    })
    if (resGetAllProductDetail.ok) {
        const data = await resGetAllProductDetail.json();
        const reqGallery = []
        for (const productDetail of data) {
            const ProductDetail_Name = document.querySelector(`#ProductDetail_Name${productDetail._id}`).value;
            const AttachFile = document.querySelector(`#AttachFile${productDetail._id}`);
            const form = new FormData();
            form.append('ProductDetail_Name', productDetail.ProductDetail_Name);
            form.append('Product_id', productId);
            const resProductDetail = await fetch("/productDetail/create", {
                method: "POST",
                body: form
            });
            const dataProductDetail = await resProductDetail.json()
            for (const file of AttachFile.files) {
                const formGallery = new FormData()
                formGallery.append("productDetail_id", dataProductDetail?.data[0]?._id)
                formGallery.append("imgUrl", file)
                const res = await fetch("/gallery/add", {
                    method: "POST",
                    body: formGallery
                });
                reqGallery.push(res)
            }
        }
        await Promise.all(reqGallery)
        localStorage.setItem('toast', JSON.stringify({
            position: "top-right",
            heading: 'Thêm thành công',
            text: 'Đã thêm thành công',
            icon: 'success',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        }));
        window.location.replace("/product-manage")
    }
}

const form_product = document.querySelector(".form_product")
//element vien dan
const list_citation = document.querySelector(".list_citation")
//style active
const boxFormProduct = document.querySelector(".boxFormProduct")
const boxListCitation = document.querySelector(".boxListCitation")
const handleShowFormProduct = () => {
    form_product.classList.remove("displayNone")
    list_citation.classList.add("displayNone")
    boxListCitation.classList.remove("active")
    boxFormProduct.classList.add("active")
}

const handleShowListCitation = () => {
    form_product.classList.add("displayNone")
    list_citation.classList.remove("displayNone")
    boxFormProduct.classList.remove("active")
    boxListCitation.classList.add("active")
}