$(document).ready(function() {
    $("#signIn").click(function() {
        alert('click!');
        // let username = $("#username").val();
        // let password = $("#password").val();
        // login(username, password, function (message) {
        //     alert(message);
        // });
    });
});

function login(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: '/php/login.php',
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
