$().ready(function () {
    hideAllDiv();
    $("#signUp").click(function() {
        // hideDiv();
        let username = $("#username").val();
        let password1 = $("#password1").val();
        let password2 = $("#password2").val();
        if (!isContentValid(username)) {
            showDiv("nameWarning");
            return;
        }
        if (password1 !== password2) {
            showDiv("different");
            return;
        }
        if (!isContentValid(password1)) {
            showDiv("pasWarning");
            return;
        }
        if (!isContentValid(password2)) {
            showDiv("pasWarning1");
            return;
        }
        signUp(username, password1, function (response) {
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

$("#username").click(function () {
    hideAllDiv();
});
$("#password1").click(function () {
    hideAllDiv();
});
$("#password2").click(function () {
    hideAllDiv();
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

/**
 * 注册
 * @param username  用户名
 * @param password  密码
 * @param callback  回调函数
 */
function signUp(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: '/iNote/php/signup.php',
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
