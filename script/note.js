/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
    getNotebooks();
    preLoader();
    }
);

/**
 * 加载用户笔记
 */
function preLoader() {
    $.ajax({
        type: 'POST',
        url: 'php/notes.php',
        success: function (result) {
            for (let i = 0; i < result.length; i++){
                let eachNote = result[i];
                $("#noteTable").append(
                    '<tr>' +
                        '<th>'+
                        '<div class="blog-post">' +
                            '<div class="post-meta">' +
                            '<span class="author">' +
                            '<label>' + '<img src="images/author.jpg" alt="" width="40px" height="40px">' +
                            eachNote.username + '</label>'+
                            '</span>,' +
                            '<span>Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
                            '</div>' +
                            '<h2 class="post-title"><a id="'+ eachNote.id +'">' + eachNote.title + '</a></h2>' +
                            '</div>' +
                    '</th>'+
                    '</tr>' +
                    '<script>' +
                    '$("#' + eachNote.id + '").click(function() {' +
                    'window.location.href = "check.html?id=" + ' + eachNote.id + ';' +
                    '})' +
                    '</script>'
                )
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}

/**
 * 加载用户笔记本列表
 */
function getNotebooks() {
    $.ajax({
        type: 'POST',
        url: 'php/notebooks.php',
        success: function (booklist) {
            console.log(booklist);
            for (let i = 0; i < booklist.length; i++) {
                let book = booklist[i];
                $("#notebook").append(
                    '<tr>' +
                    '<th>' +
                    '<a>'+ book.name +
                    '</a>' +
                    '<span class="badge" style="margin-left: 153px">' + book.number + '</span>' +
                    '</th>' +
                    '</tr>'
                )
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    })
}

$("#create").click(function () {
    let detail = $("#details").val();
    let bookname = $("#bookname").val();
    createBook(bookname, detail);
});

function createBook(bookName, description) {
    $.ajax({
        type: 'POST',
        url: 'php/notebook.create.php',
        data: {
            name: bookName,
            description: description,
        },
        success : function (result) {
            if (result.isNormal) {
                swal({
                    title: result.message,
                    type: 'success',
                    closeOnConfirm: false
                },
                    function (isConfirm) {
                        window.location.href = "note.html"
                    }
                )
            } else {
                swal({
                    title: result.message,
                    type: 'error'
                })
            }
        }
    })
}