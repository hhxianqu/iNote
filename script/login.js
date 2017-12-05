$().ready(function () {
    hideAllDiv();
});

$("#signIn").click(function() {
    let username = $("#username").val();
    let password = $("#password").val();
    let isCorrect = true;
    if (!isContentValid(username)) {
        showDiv("nameWarning");
        isCorrect = false;
    }
    if (!isContentValid(password)) {
        showDiv("pasWarning");
        isCorrect = false;
    }
    if (!isCorrect) {
        return;
    }
    login(username, password, function (response) {
        if(response.isNormal) {
            swal({
                    title: "Success",
                    text: response.message,
                    type: "success",
                    confirmButtonText: "Confirm",
                    closeOnConfirm: false
                },
                function(isConfirm) {
                    if(isConfirm) {
                        window.location.href = 'note.html';
                    }
                });
        } else {
            swal({
                title: "Fail",
                text: response.message,
                type: "error",
                confirmButtonText: "Confirm"
            });
        }
    });
});

// TODO 无法隐藏
$("#username").click(function () {
   hideAllDiv();
});

$("#password").click(function () {
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

function login(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: 'php/login.php',
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

/**
 * 隐藏div提示
 * @param divName
 */
function hideDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "none";
}
/**
 * 隐藏所有div
 */
function hideAllDiv() {
    hideDiv("nameWarning");
    hideDiv("pasWarning");
}

/**
 * 显示div提示
 * @param divName
 */
function showDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "block";
}