
$("#logout").click(function () {

    swal({
        title: '退出成功',
        type: 'success'
    },
        function (isConfirm) {
            window.location.href = "welcome.html";
        }
    );

})