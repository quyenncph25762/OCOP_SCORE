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
                    return `<a href="${item.imgUrl}" target="_blank" class="gallery-items" style="font-size:12px">${item.imgName}</a>`;
                }).join("");
                body.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td style="max-width:300px">
                            <p style="break-word:break;text-wrap:wrap">${ProductDetail.ProductDetail_Name}</p>
                        </td>
                        <td style="color: red;text-align:center;" style="width:100px"><p>(*)</p></td>
                        <td style="overflow:hidden;max-width:300px">
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