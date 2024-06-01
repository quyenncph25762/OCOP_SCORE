const handleAddScoreFile = () => {
    const Product_id = document.getElementById("Product_id").value
    const Customer_id = document.getElementById("Customer_id").value
    const CreatorUser_id = document.getElementById("CreatorUser_id").value
    const Note = document.getElementById("Note").value
    const ScoreTemp_id = Array.from(document.querySelectorAll(".ScoreTemp_id"))[0].value
    const formScoreFile = {
        Product_id: Number(Product_id),
        Customer_id: Number(Customer_id),
        CreatorUser_id: Number(CreatorUser_id),
        Note: Note,
        ScoreTemp_id: Number(ScoreTemp_id)
    }


    // scoreFileDetail
    const ScoreTempDetail_id = Array.from(document.querySelectorAll(".ScoreTempDetail_id")).map(e => Number(e.value))
    const btnsRadio = Array.from(document.querySelectorAll(".btnsRadio")).map(e => e.checked)
    console.log(ScoreTempDetail_id)
}