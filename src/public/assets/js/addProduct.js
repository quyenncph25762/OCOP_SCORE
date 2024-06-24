async function handleAdd() {
    showLoading()
    const Name = document.getElementById("Name").value
    const Description = document.getElementById("Description").value
    const Customer_id = document.getElementById("Customer_id").value
    const ProductGroup_id = document.getElementById("ProductGroup_id").value
    const ProductYearId = document.getElementById("ProductYearId").value
    const Code = document.getElementById("Code").value
    const Note = document.getElementById("Note").value
    const IsActive = document.getElementById("IsActive").value
    const Avatar = document.getElementById("Avatar")
    const CreatorUser_id = document.getElementById("CreatorUser_id")
    if (showToastAndReturn(Name.trim() === "", 'Tên không được để trống')) {
        return;
    }
    if (showToastAndReturn(ProductYearId.trim() === "", 'Hãy nhập số năm của sản phẩm')) {
        return;
    }
    if (showToastAndReturn(ProductGroup_id.trim() === "", 'Hãy nhập nhóm sản phẩm')) {
        return;
    }
    if (showToastAndReturn(Customer_id.trim() === "", 'Hãy nhập chủ thể của sản phẩm')) {
        return;
    }

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
    formData.append('CreatorUser_id', CreatorUser_id);
    const res = await fetch("/product-manage/create", {
        method: "POST",
        body: formData
    })
    if (!res.ok) {
        hideLoading()
        const data = await res.json()
        $.toast({
            position: "top-right",
            heading: 'Hãy nhập giá trị của sản phẩm',
            text: `${data.message}`,
            icon: 'warning',
            loader: true,
            loaderBg: '#9EC600',
            stack: 4
        })
        return
    }
    const responseProduct = await res.json()
    const productId = responseProduct?.data[0]?._id
    const resGetAllProductDetail = await fetch("/productDetail/limit", {
        method: "GET"
    })

    // Them product detail
    if (resGetAllProductDetail.ok) {
        const data = await resGetAllProductDetail.json();
        const arrProductDetail = []
        for (const productDetail of data) {
            const Code = document.querySelector(`#Code${productDetail._id}`).value;
            const formProductDetail = {
                ProductDetail_Name: productDetail.ProductDetail_Name,
                Product_id: productId,
                Code: Code
            }
            arrProductDetail.push(formProductDetail)
        }
        const resProductDetail = await fetch("/productDetail/create", {
            method: "POST",
            body: JSON.stringify(arrProductDetail),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const dataProductDetail = await resProductDetail.json()
        // them anh
        const formGallery = new FormData()
        for (i = 0; i < data.length; i++) {
            const AttachFile = document.querySelector(`#AttachFile${data[i]._id}`);
            for (const file of AttachFile.files) {
                formGallery.append("productDetail_id", dataProductDetail?.resultsArray
                [i]?._id)
                formGallery.append("imgUrl", file)
            }
        }
        await fetch("/gallery/add", {
            method: "POST",
            body: formGallery
        });
        hideLoading()
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
    list_citation.classList.add("displayNone")
    boxFormProduct.classList.add("active")
    boxFormProduct.classList.add("activeTabs")
    form_product.classList.remove("displayNone")
    boxListCitation.classList.remove("active")
    boxListCitation.classList.remove("activeTabs")
}

const handleShowListCitation = () => {
    boxListCitation.classList.add("active")
    form_product.classList.add("displayNone")
    boxListCitation.classList.add("activeTabs")
    boxFormProduct.classList.remove("active")
    list_citation.classList.remove("displayNone")
    boxFormProduct.classList.remove("activeTabs")
}

function showToastAndReturn(condition, message) {
    if (condition) {
        hideLoading();
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
        return true;
    }
    return false;
}