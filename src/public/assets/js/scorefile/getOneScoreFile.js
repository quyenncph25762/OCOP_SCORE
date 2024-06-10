const url = new URL(location.href)
const params = new URLSearchParams(url.searchParams)

if (params.has("productId") || params.has("code") && params.has("productgroupId")) {
    const productId = params.get("productId")
    const code = params.get("code")
    const productgroupId = params.get("productgroupId")
    getOneProduct(productId)
    getOneScoreTemp(code, productId, productgroupId)
} else {
    console.log("error")
}
async function getOneProduct(productId) {
    try {
        const response = await fetch(`/product-manage/${productId}/edit`, {
            method: "GET"
        })
        const Product = await response.json()
        document.getElementById("product-container").innerHTML = `
        <div class="">
                            <input type="hidden" value="${productId}" id="Product_id">
                            <input type="hidden" id="Customer_id" value="${Product.Customer_id}">
                            <img name="Avatar" style="width: 100%;height: 150px;"
                                src="${Product.Avatar}" alt="">
                        </div>
                        <p name="Name" class="title-scoreTempDetail">${Product.Name}</p>
                        <div class="my-4" style="border-top: 1px dashed #ccc;"></div>
                        <div class="" style="font-size: 16px;">
                            <div class="d-flex justify-content-between">
                                <p style="font-size: 14px;min-width: 75px">Chủ thể:</p>
                                <p class="" style="font-weight: 600;font-size: 12px;opacity: 0.7;text-transform: uppercase">${Product.customer_name}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p style="font-size: 14px;min-width: 75px">Nhóm sản phẩm:</p>
                                <p class="" style="font-weight: 600;font-size: 12px;opacity: 0.7">${Product.productGroup_name}</p>
                            </div>
                        </div>
        `
    } catch (error) {
        console.log(error)
    }
}
async function getOneScoreTemp(code, productId, productgroupId) {
    try {
        // goi vien dan theo productDetail
        const responseProductDetailByProduct = await fetch(`/productDetail/${productId}`, {
            method: "GET"
        })
        const listProductDetail = await responseProductDetailByProduct.json()
        // goi scoretemp theo nhom san pham
        const response = await fetch(`/scoretemp/byProductGroupId/${productgroupId}`, {
            method: "GET"
        })
        if (!response.ok) {
            alert("Có lỗi không mong muốn , xin vui lòng thử lại")
            return
        }
        const getOneScoreTemp = await response.json()
        if (getOneScoreTemp) {
            // lay ra id cua scoreTemp
            const scoreTempId = getOneScoreTemp._id
            // hien thi nhung scoreTempDetail theo scoreTempId
            const responseScoreDetail = await fetch(`/scoreTempDetail/scoreTemp/${scoreTempId}`, {
                method: "GET"
            })
            if (!responseScoreDetail.ok) {
                alert("Có lỗi không mong muốn!")
            }
            const ListScoreTempDetail = await responseScoreDetail.json()
            // tim den tbody cua scoreFile
            let tbodyScoreFile = document.getElementById("tbodyScoreFile")
            tbodyScoreFile.innerHTML = ""
            // tao ten checkbox mac dinh
            let checkBoxScoreName = "Score1"
            let checkboxScore = 1
            for (let i = 0; i < ListScoreTempDetail.length; i++) {
                // kiem tra neu ma co attachFile thi name checkbox thay doi
                if (ListScoreTempDetail[i].ProductDetailId) {
                    checkBoxScoreName = "Score" + checkboxScore
                    checkboxScore += 1
                }
                tbodyScoreFile.innerHTML += `
                <tr>
                <input type="hidden" class="ScoreTemp_id" value=${getOneScoreTemp._id}>
                <input type="hidden" class="ScoreTempDetail_id" value="${ListScoreTempDetail[i]._id}">
                <input type="hidden" class="Score"></input>
                            ${ListScoreTempDetail[i].Name && !ListScoreTempDetail[i].IsScore ?
                        `
                                <td style="font-weight: 600; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                                    ${ListScoreTempDetail[i].Name}
                                </td>
                                `
                        :
                        `<td style="font-weight: 300; color: #ccc; max-width: 500px; text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                        
                    ${ListScoreTempDetail[i].Name} ${ListScoreTempDetail[i].ValidatedRank
                            ?
                            `<span style="color:yellow">${repeatStar(ListScoreTempDetail[i].ValidatedRank)}</span>`
                            :
                            ""}
                                </td > `
                    }
                            
                            ${ListScoreTempDetail[i].MaxScore >= 0 && ListScoreTempDetail[i].IsScore ?
                        `<td style="font-style: italic; color: rgb(232, 67, 67); font-weight: 600;">(${ListScoreTempDetail[i].MaxScore} điểm)</td>`
                        :
                        `<td></td>`
                    }
                            ${ListScoreTempDetail[i].ProductDetailId ?
                        `<td data-toggle="modal" data-target="#exampleModalProductDetail" onclick="handleShowAttachFile(${productId},${ListScoreTempDetail[i].ProductDetailId})"><ion-icon name="attach-outline"></ion-icon></td>
                            `
                        :
                        `<td></td>`
                    }
                           
                            ${ListScoreTempDetail[i].IsScore ?
                        `
                       
                        <td style="color: red; font-style: italic; text-align: center;"> 
                        <input type="radio" class="btnsRadio radio-custom" id="radio-${i}" data-id="${ListScoreTempDetail[i]._id}" value="${ListScoreTempDetail[i].MaxScore}" name="${checkBoxScoreName}">
                        <label for="radio-${i}" class="radio-custom-label"></label>
                        </td>
                        
                        `
                        :
                        `<td></td>`
                    }
                        </tr>
                    
                    `;
            }
        }

    } catch (error) {
        console.log(error)
    }
}

function repeatStar(number) {
    star = ""
    for (i = 0; i < number; i++) {
        star += "*"
    }

    return star
}