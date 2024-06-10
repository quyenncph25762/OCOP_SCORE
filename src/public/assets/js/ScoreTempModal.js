async function handleclickDetail(id) {
    const tbody = document.getElementById(`tbodyScoreTemp${id}`);
    try {
        showLoading()
        const response = await fetch(`/scoreTempDetail/scoreTemp/${id}`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Lỗi truy vấn");
        }
        tbody.innerHTML = '';
        const ScoreTemp = await response.json();
        for (const item of ScoreTemp) {
            tbody.innerHTML += `
            ${item.IsScore === 0 ?
                    `<tr>
                        <td style="font-weight: 600; max-width: 500px;text-wrap: wrap; word-wrap: break-word; overflow-wrap: break-word;">
                    ${item.Name}
                        </td>
                        <td></td>
                        ${item.ProductDetailId ?
                        `<td><ion-icon name="attach-outline"></ion-icon></td>` : `<td></td>`
                    }
                        
                        <td></td>
                    </tr>`
                    :
                    `<tr>
                        <td style="font-weight: 400;text-wrap: wrap;max-width: 500px; word-wrap: break-word; overflow-wrap: break-word;color:#808080" class="test" >
                            ${item.Name}
                        </td>
                        <td class="point" style="font-style: italic; color: rgb(232, 67, 67);font-weight: 600;">
                            (${item.MaxScore} điểm)
                        </td>
                        <td>
                        </td>
                        <td style="color: red;font-style: italic;text-align: center;">
                            <input disabled type="checkbox" name="" id=${item._id} />
                        </td>
                    </tr>`
                }
        `;
        }
        hideLoading()
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra trong quá trình xử lý.");
    }
}
