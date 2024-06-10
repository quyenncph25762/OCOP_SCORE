async function handleProductDetail(id) {
    try {
        const body = document.getElementById(`bodyProductDetail${id}`)
        const data = await listProductDetail(id)
        // Xóa nội dung cũ trước khi thêm nội dung mới
        body.innerHTML = '';
        let i = 0
        for (const ProductDetail of data) {
            i++
            const resGallery = await fetch(`/gallery/productDetail/${ProductDetail._id}`, {
                method: "GET"
            });
            if (resGallery.ok) {
                const gallery = await resGallery.json();
                const attachFile = gallery.map(item => {
                    return `<a href="${item.imgUrl}" class="gallery-items" style="width:100px;overflow:hidden">${item.imgName}</a>`;
                }).join("");
                body.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${ProductDetail.ProductDetail_Name}</td>
                        <td style="color: red;"><p>(*)</p></td>
                        <td style="width: 100px;overflow:hidden">
                            <div class="container">
                                <div class="row">
                                    <div class="selected-files listGallery">
                                            ${attachFile} 
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function listProductDetail(id) {
    try {
        const res = await fetch(`/productDetail/productDetailByProduct/${id}`, {
            method: "GET"
        })
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}