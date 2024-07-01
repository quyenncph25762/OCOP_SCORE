const handleSend = async (scoreFileId, ProductId) => {
    try {
        $.confirm({
            title: '<ion-icon name="help-circle-outline"></ion-icon>',
            content: 'Bạn có chắc không ?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-blue',
                    action: async function () {
                        // Gọi API xóa mục
                        if (scoreFileId && ProductId) {
                            await updateIsProvinceProduct(ProductId)
                            console.log(1)
                            const response = await fetch(`/scorefile/scoreFileToProvince/${scoreFileId}/${ProductId}`, {
                                method: 'PATCH'
                            })
                            if (response.ok) {
                                localStorage.setItem('toast', JSON.stringify({
                                    position: "top-right",
                                    heading: 'SUCCESS',
                                    text: 'Đã gửi thành công',
                                    icon: 'success',
                                    loader: true,
                                    loaderBg: '#9EC600',
                                    showHideTransition: 'slide',
                                    stack: 4
                                }));
                                window.location.reload()
                            } else {
                                const data = await response.json()
                                localStorage.setItem('toast', JSON.stringify({
                                    position: "top-right",
                                    heading: 'ERROR!',
                                    text: data.message,
                                    icon: 'error',
                                    loader: true,
                                    loaderBg: '#9EC600',
                                    showHideTransition: 'slide'
                                }));
                            }
                        } else {
                            localStorage.setItem('toast', JSON.stringify({
                                position: "top-right",
                                heading: 'ERROR!',
                                text: 'Không tìm thấy id scorefile',
                                icon: 'error',
                                loader: true,
                                loaderBg: '#9EC600',
                                showHideTransition: 'slide'
                            }));
                            window.location.reload()
                        }
                    }
                },
                cancel: function () {
                    $.alert('Đã hủy!');
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

async function updateIsProvinceProduct(ProductId) {
    try {
        const res = await fetch(`/product-manage/updateIsProvince/${ProductId}`, {
            method: "PATCH"
        })
        if (!res.ok) {
            alert('Không cập nhật được isProvince')
            return
        }
    } catch (error) {
        console.log(error)
    }
}