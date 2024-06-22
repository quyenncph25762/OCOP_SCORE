const handleShowFormProductUpdate = (id) => {
    const form_productUpdate = document.querySelector(`.form_productUpdate${id}`);
    const list_citationUpdate = document.querySelector(`.list_citationUpdate${id}`);
    const boxFormProductUpdate = document.querySelector(`.boxFormProductUpdate${id}`);
    const boxListCitationUpdate = document.querySelector(`.boxListCitationUpdate${id}`);

    form_productUpdate.classList.remove("displayNone");
    list_citationUpdate.classList.add("displayNone");
    boxListCitationUpdate.classList.remove("activeTabs");
    boxFormProductUpdate.classList.add("activeTabs");
};

const handleShowListCitationUpdate = async (id) => {
    const form_productUpdate = document.querySelector(`.form_productUpdate${id}`);
    const list_citationUpdate = document.querySelector(`.list_citationUpdate${id}`);
    const boxFormProductUpdate = document.querySelector(`.boxFormProductUpdate${id}`);
    const boxListCitationUpdate = document.querySelector(`.boxListCitationUpdate${id}`);

    form_productUpdate.classList.add("displayNone");
    list_citationUpdate.classList.remove("displayNone");
    boxListCitationUpdate.classList.add("activeTabs");
    boxFormProductUpdate.classList.remove("activeTabs");

    const tbody = document.getElementById(`tbody${id}`);
    tbody.innerHTML = ''
    const response = await fetch(`/productDetail/productDetailByProduct/${id}`);
    if (response.ok) {
        const dataProductDetail = await response.json();
        let i = 0
        for (const ProductDetail of dataProductDetail) {
            const resGallery = await fetch(`/gallery/productDetail/${ProductDetail._id}`)
            if (resGallery.ok) {
                const dataGallery = await resGallery.json()
                const listImg = dataGallery.map((gallery) => {
                    return `<div class="file-item">
                    <a href="${gallery.imgUrl}" class="gallery-items" style="max-width:100px; overflow: hidden">${gallery.imgName}</a> 
                    <ion-icon onClick="handleIdGallery('${gallery._id}')" name="trash-outline" class="remove-file-button"></ion-icon>
                    </div>`
                }).join("")
                tbody.innerHTML += `
                <tr>
                    <td style="">${i += 1}</td>
                    <td style="padding: 12px;text-wrap:wrap">
                        ${ProductDetail.ProductDetail_Name}
                    </td>
                    <td style="color: red;">
                        <p>(*)</p>
                    </td>
                    <td style="padding-right: 0px;padding-left: 0px">
                        <div class="container d-flex justify-content-center">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="file-drop-area">
                                        <span class="choose-file-button">Chọn ảnh</span>
                                        <span class="file-message">hoặc kéo thả</span>
                                        <input data-productDetailId=${ProductDetail._id} id="AttachFile" class="file-input" name="AttachFile" type="file" multiple>
                                    </div>
                                    <div class="selected-files listGallery">
                                    ${listImg}
                                        <!-- Danh sách các tệp đã chọn sẽ được hiển thị ở đây -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                `;
            }
        }
    } else {
        alert("Lỗi khi gọi danh sách viện dẫn theo sản phẩm");
    }
};
