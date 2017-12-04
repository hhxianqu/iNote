$().ready(function () {
    hideAllDiv();
    // console.log("s");
    $("#signIn").click(function() {
        let username = $("#username").val();
        let password = $("#password").val();
        if (!isContentValid(username)) {
            showDiv("nameWarning");
            return;
        }
        login(username, password, function (response) {
            if(response.isNormal) {
                swal({
                        title: response.message,
                        type: "success",
                        confirmButtonText: "Confirm",
                        closeOnConfirm: false
                    },
                    function(isConfirm) {
                        if(isConfirm) {
                            window.location.href = 'note.html';
                        }
                    })
            } else {
                swal({
                    title: response.message,
                    // text: "",
                    type: "error",
                    confirmButtonText: "Confirm"
                })
            }
        });
    });
});

/**
 * 判断登录名是否合法
 * @param content
 * @returns {boolean}
 */
function isContentValid(content) {
    let re = /\s+/;
    return !(content === "" || re.test(content));
}

function login(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: '/iNote/php/login.php',
        data: {
            username: username,
            password: password
        },
        success: function (result, status, xhr) {
            if (callback) {
                callback(result);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
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