// handleChoose Add
async function handleChooseCity(idCity) {
    if (idCity) {

        const listDistric = await FuncListDistricByCity(idCity)
        const selectDistrict = document.getElementById("District_id")
        selectDistrict.innerHTML = ""
        for (const district of listDistric) {
            selectDistrict.innerHTML += `
                <option value="${district._id}">${district.Name}</option>
        `
        }
    }
}
async function handleChooseDistrict(idDistrict) {
    if (idDistrict) {
        const listWards = await FuncListWardByDisTrict(idDistrict)
        if (listWards.length > 0) {
            const selectWard = document.getElementById("Ward_id")
            selectWard.innerHTML = ""
            for (const ward of listWards) {
                selectWard.innerHTML += `
                    <option value="${ward._id}">${ward.Name}</option>
            `
            }
        }
    }
}

// handeChooseUpdate
async function handleChooseUpdateCity(valueChoose, idCity, idCustomer) {
    const value = Number(valueChoose)
    const cityid = Number(idCity)
    const CustomerId = Number(idCustomer)
    const listDistric = await FuncListDistricByCity(valueChoose)
    const selectDistrict = document.getElementById(`District_id${CustomerId}`)
    selectDistrict.innerHTML = ""
    for (const district of listDistric) {
        selectDistrict.innerHTML += `
                <option value="${district._id}" ${idCity === value ? "selected" : ""}>${district.Name}</option>
        `
    }
}

async function handleChooseUpdateDistrict(valueChoose, IdDistrict, idCustomer) {
    const value = Number(valueChoose)
    const DistrictId = Number(IdDistrict)
    const CustomerId = Number(idCustomer)
    console.log(DistrictId)
    const listWards = await FuncListWardByDisTrict(valueChoose)
    const selectWard = document.getElementById(`Ward_id${CustomerId}`)
    selectWard.innerHTML = ""
    for (const ward of listWards) {
        selectWard.innerHTML += `
                <option value="${ward._id}" ${DistrictId === value ? "selected" : ""}>${ward.Name}</option>
        `
    }
}







async function FuncListDistricByCity(idCity) {
    try {
        const response = await fetch(`/districs/byProvinceId/${idCity}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi get huyện theo thành phố")
            return
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
async function FuncListWardByDisTrict(idDistrict) {
    try {
        const response = await fetch(`/wards/getByDistrict/${idDistrict}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log("Lỗi khi get Xa")
            return
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}