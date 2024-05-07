$(document).ready(function() {
    $('#myTable').dataTable({
        "paging": true, // Bật tính năng phân trang
        "lengthChange": true, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": true, // Bật tính năng sắp xếp
        "info": true, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột
        // Các tùy chọn khác nếu cần
    });
});
