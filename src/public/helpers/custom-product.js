$(document).ready(function() {
    $('#myTable').dataTable({
        "paging": true, // Bật tính năng phân trang
        "lengthChange": true, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": true, // Bật tính năng sắp xếp
        "info": true, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột
        "columnDefs": [
            { "width": "10%", "targets": 0 }, // Cột chỉnh sửa
            { "width": "10%", "targets": 1 }, // Cột mã sản phẩm
            { "width": "30%", "targets": 2 }, // Cột tên sản phẩm
            { "width": "20%", "targets": 3 }, // Cột nhóm sản phẩm
            { "width": "10%", "targets": 4 }, // Cột năm đánh giá
            { "width": "20%", "targets": 5 }, // Cột ghi chú
            { "orderable": false, "targets": 0 }
            // Thêm các cột khác nếu cần
        ],
        "language": {
            "emptyTable":     "Không có dữ liệu",
            "info":           "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty":      "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered":   "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing":     "Đang xử lý...",
            "search":         "Tìm kiếm:",
            "zeroRecords":    "Không tìm thấy bản ghi nào phù hợp",
            "aria": {
                "sortAscending":  ": kích hoạt để sắp xếp cột tăng dần",
                "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
            }
        }
        // Các tùy chọn khác nếu cần
    });
});