const handleAdd = () => {
    // Lay id employee 
    const getArrEmployeeId = Array.from(document.querySelectorAll(".Employee_id")).map(e => e.value)
    const ArrEmployeeIdNumber = getArrEmployeeId.map(Number)
    console.log(ArrEmployeeIdNumber)
}