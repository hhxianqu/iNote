/**
 * Created by apple on 2017/12/11.
 */

$().ready(function () {
    getNotebook();
});
function submit(title) {
    $.ajax({
        type: 'POST',
        url: 'php/post.php',
        data: {
            submit: "",
            title: title,
            username: "huangxiao",
            html    : testEditor.getHTML(),
        },
        success: function (result, status, xhr) {
            if (result.isNormal) {
                // TODO 成功
                swal({
                        title: result.message,
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
                // TODO 失败
                swal({
                    title: result.message,
                    type: "error",
                    confirmButtonText: "Confirm",
                    closeOnConfirm: true
                })
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }
    });
}

$("#submit").click(function () {
    let title = $("#input-4").val();
    if (title === "") {
        swal({
            title: "Fail",
            type: "error",
            text: "标题不能为空",
            confirmButtonText: "Confirm",
            closeOnConfirm: true

        });
        return;
    }
    submit(title);
});

function showTitle() {
    document.getElementById("title").style.display = "block" ;
}
function hideTitle() {
    let title = $("#input-4").val();
    if (title === "") {
        document.getElementById("title").style.display = "none";
    }
}

function getNotebook() {
    $.ajax({
        type: 'POST',
        url: 'php/notebooks.php',
        success: function (booklist) {
            for (let i = 0; i < booklist.length; i++) {
                let book = booklist[i];
                $("#notebook").append(
                    '<option class="notebookOption">' +
                    '<a id="' + book.id +'">' + book.name + '</a>' +
                    '</option>'
                )
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    })
}