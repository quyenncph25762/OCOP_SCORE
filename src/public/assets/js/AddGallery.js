
// Xử lý sự kiện khi người dùng chọn tệp
$(document).on('change', '.file-input', function () {
    var files = $(this)[0].files;
    var selectedFilesContainer = $(this).closest('.col-md-12').find('.selected-files');
  
    // Hiển thị các tệp đã chọn mà không xóa các tệp đã chọn trước đó
    for (var i = 0; i < files.length; i++) {
        var fileName = files[i].name;
        // Tạo phần tử chứa cả nút xóa và đường dẫn đến file

        var fileListItem = $('<div class="file-item"></div>');
        // Tạo đường dẫn đến file
        var fileLink = $('<a style="max-width:100px; overflow: hidden" href="' + fileName + '">' + fileName + '</a>');
        // Tạo nút xóa
        var removeButton = $('<ion-icon name="trash-outline" class="remove-file-button"></ion-icon> ');
        removeButton.data('index', i); // Lưu chỉ mục của tệp
        // Thêm đường dẫn và nút xóa vào phần tử chứa
        fileListItem.append(fileLink);
        fileListItem.append(removeButton);

        // Thêm phần tử chứa vào container
        selectedFilesContainer.append(fileListItem);

        // Đọc tệp đầu vào với FileReader
        var reader = new FileReader();
        reader.onload = function (event) {
            var result = event.target.result;
            // Tạo FilterReader từ Blob
            var filterReader = new FileReader();
            var blob = new Blob([result]);
            filterReader.readAsArrayBuffer(blob);
            filterReader.onload = function () {
                var filteredData = filterReader.result;
                // Gửi dữ liệu đã xử lý lên máy chủ
                // Ví dụ: $.ajax() hoặc fetch()
            }
        };
        reader.readAsDataURL(files[i]);
    }
});
// Xử lý sự kiện khi người dùng nhấp vào nút xóa
$(document).on('click', '.remove-file-button', function () {
    var fileIndexToRemove = $(this)?.data('index');
    var fileInput = $(this).closest('.col-md-12').find('.file-input')[0];

    // Xóa phần tử khỏi danh sách tệp đã chọn
    $(this).closest('.file-item').remove();

    // Xóa tệp khỏi danh sách tệp đã chọn
    var files = Array.from(fileInput.files);
    files.splice(fileIndexToRemove, 1);
    fileInput.files = new FileList({ length: files.length, item: function (i) { return files[i]; } });
});