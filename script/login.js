$().ready(function () {
    $("#signIn").click(function() {
        console.log('h');
        let username = $("#username").val();
        let password = $("#password").val();
        login(username, password, function (message) {
            swal(message);
        });
    });
});

function login(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: '/iNote/php/login.php',
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
