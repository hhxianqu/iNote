$().ready(function () {
    $("#signUp").click(function() {
        console.log('click singup');
        let username = $("#username").val();
        let password1 = $("#password1").val();
        let password2 = $("#password2").val();
        if (password1 !== password2) {
            // TODO 两次密码输入不一致
        }
        signUp(username, password1, function (message) {
            // if(message){
            //     swal({
            //             title: "Success!",
            //             type: "success",
            //             confirmButtonText: "Confirm",
            //             closeOnConfirm: false
            //         },
            //         function(isConfirm){
            //             if(isConfirm){
            //                 window.location.href = 'note.html';
            //             }
            //         })
            //
            // }
            // else {
            //     swal({
            //         title: "Fail!",
            //         // text: "",
            //         type: "error",
            //         confirmButtonText: "Confirm"
            //     })
            // }
        });
    });
});

function signUp(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: '/iNote/php/signup.php',
        data: {
            username: username,
            password: password
        },
        success: function (result) {
            if (callback) {
                callback(result);
            }
        },
        error: function (XMLHttpRequest, testStatus, errorThrown) {
            console.log(XMLHttpRequest.staus);
            console.log(testStatus);
        }
    });
}
