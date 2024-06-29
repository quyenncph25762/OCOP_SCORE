$(document).ready(function () {
    $('#myTable').dataTable({
        "paging": true, // Bật tính năng phân trang
        "lengthChange": true, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": true, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",
            "aria": {
                "sortAscending": ": kích hoạt để sắp xếp cột tăng dần",
                "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
            }
        }
        // Các tùy chọn khác nếu cần
    });
    // table customer
    $('#myTableCustomer').dataTable({
        "paging": false, // Bật tính năng phân trang
        "lengthChange": false, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": false, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": false, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",
            "aria": {
                "sortAscending": ": kích hoạt để sắp xếp cột tăng dần",
                "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
            }
        },
        // Các tùy chọn khác nếu cần
        // "dom": '<"bottom"lf>rt<"top"ip><"clear">',
    });


    // table employee
    $('#myTableEmployee').dataTable({
        "paging": false, // Bật tính năng phân trang
        "lengthChange": false, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": false, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",

        }
        // Các tùy chọn khác nếu cần
    });
    // table employee update
    $('#myTableEmployeeUpdate').dataTable({
        "paging": false, // Bật tính năng phân trang
        "lengthChange": false, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": false, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",

        }
        // Các tùy chọn khác nếu cần
    });
    // table committee
    $('#myTableCommittee').dataTable({
        "paging": true, // Bật tính năng phân trang
        "lengthChange": true, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": true, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",
            "aria": {
                "sortAscending": ": kích hoạt để sắp xếp cột tăng dần",
                "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
            }
        }
        // Các tùy chọn khác nếu cần
    });
    // table FilterProduct
    $('#myTableFilterProduct').dataTable({
        "paging": false, // Bật tính năng phân trang
        "lengthChange": false, // Bật tính năng thay đổi số lượng dòng trên mỗi trang
        "searching": true, // Bật tính năng tìm kiếm
        "ordering": false, // Bật tính năng sắp xếp
        "info": false, // Hiển thị thông tin số trang, số dòng trên trang
        "autoWidth": false, // Tắt tính năng tự động thay đổi kích thước cột

        "language": {
            "emptyTable": "Không có dữ liệu",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
            "infoEmpty": "Hiển thị 0 đến 0 của 0 mục",
            "infoFiltered": "(đã lọc từ tổng số _MAX_ mục)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ mục",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy bản ghi nào phù hợp",
            "aria": {
                "sortAscending": ": kích hoạt để sắp xếp cột tăng dần",
                "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
            }
        },
        // Các tùy chọn khác nếu cần
        // "dom": '<"bottom"lf>rt<"top"ip><"clear">',
    });
});



// loc table filterProduct
$(document).ready(function () {
    var table = $('#myTableFilterProduct').DataTable();
    $('#productGroupFilter').on('change', function (e) {
        var productGroup = $(this).val();
        table.column(1).search(productGroup).draw();
    });
});

$(document).ready(function () {
    var table = $('#myTableFilterProduct').DataTable();
    $('#YearFilter').on('change', function (e) {
        var year = $(this).val();
        table.column(2).search(year).draw();
    });
});

// loc table employee
$(document).ready(function () {
    var table = $('#myTableEmployee').DataTable();
    $('#WorkDepartmentFilter').on('change', function (e) {
        var WorkDepartment = $(this).val();
        table.column(1).search(WorkDepartment).draw();
    });
});

$(document).ready(function () {
    var table = $('#myTableEmployee').DataTable();
    $('#WorkPositionFilter').on('change', function (e) {
        var WorkPosition = $(this).val();
        console.log(WorkPosition)
        table.column(2).search(WorkPosition).draw();
    });
});

$(document).ready(function () {
    var table = $('#myTableEmployee').DataTable();
    $('#WorkDepartmentFilterUpdate').on('change', function (e) {
        var WorkDepartment = $(this).val();
        table.column(1).search(WorkDepartment).draw();
    });
});
$(document).ready(function () {
    var table = $('#myTableEmployeeUpdate').DataTable();
    $('#WorkPositionFilterUpdate').on('change', function (e) {
        var WorkPosition = $(this).val();
        table.column(2).search(WorkPosition).draw();
    });
});
// Lọc chủ thể theo Huyện
$(document).ready(function () {
    var table = $('#myTableCustomer').DataTable();
    $('#productCustomerFilter').on('change', function (e) {
        var DistrictId = $(this).val();
        table.column(1).search(DistrictId).draw();
    });
});