$().ready(function () {
    hideAllDiv();
    $("#signUp").click(function() {
        // hideDiv();
        // console.log('click singup');
        let username = $("#username").val();
        let password1 = $("#password1").val();
        let password2 = $("#password2").val();
        if (username === "") {
            showDiv("nameWarning");
        }
        if (password1 === "" || password2 === "") {
            showDiv("pasWarning");
            showDiv("pasWarning1");
        } else {
            if (password1 !== password2) {
                // swal({
                //     title: "Fail!",
                //     text: "两次密码不一致",
                //     type: "error",
                //     confirmButtonText: "Confirm"
                // })
                showDiv("different");
            } else {
                signUp(username, password1, function (message) {
                    if(message){
                        swal({
                                title: "Success!",
                                type: "success",
                                confirmButtonText: "Confirm",
                                closeOnConfirm: false
                            },
                            function(isConfirm){
                                if(isConfirm){
                                    window.location.href = 'note.html';
                                }
                            })

                    }
                    else {
                        swal({
                            title: "Fail!",
                            // text: "",
                            type: "error",
                            confirmButtonText: "Confirm"
                        })
                    }
                });
            }
        }


    });


});

$("#username").click(function () {
    hideAllDiv();
});
$("#password1").click(function () {
    hideAllDiv();
});
$("#password2").click(function () {
    hideAllDiv();
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

function hideDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "none";
}

function hideAllDiv() {
    hideDiv("different");
    hideDiv("nameWarning");
    hideDiv("pasWarning");
    hideDiv("pasWarning1");
}
function showDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "block";
}