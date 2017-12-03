$().ready(function () {
    hideAllDiv();
    // console.log("s");
    $("#signIn").click(function() {
        let username = $("#username").val();
        let password = $("#password").val();
        if (username === "") {
            showDiv("nameWarning");
        } else {
            login(username, password, function (message) {
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


function hideDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "none";
}

function hideAllDiv() {
    hideDiv("nameWarning");
    hideDiv("pasWarning");
}
function showDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "block";
}