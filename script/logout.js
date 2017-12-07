
$("#logout").click(function () {
    $.ajax({
        type: 'POST',
        url: 'php/logout.php',
        success: function () {
            swal({
                title: '退出成功',
                type: 'success'
            });
            window.location.href = "welcome.html";
        },
        error: function (xhr, status, error) {
            swal({
                title: xhr.responseText,
                type: 'error'
            });
        }
    })
})