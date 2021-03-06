
$().ready(function () {
    let id = getQueryVariable('id');
    if (id !== null) {
        checkNotebook(id);
        hideDiv("myself");
    } else {
        getNotebooks();
        loadNotes();
        hideDiv("detailDiv");
        getCollection();
    }
});

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable) {
            return pair[1];
        }
    }
    return null;
}

/**
 * 加载用户笔记
 */
function loadNotes() {
    $.ajax({
        type: 'POST',
        url: 'php/notes.php',
        success: function (result) {
            loop(result);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}

/**
 * 循环加载笔记
 * @param notes
 */
function loop(notes) {
    for (let i = 0; i < notes.length; i++){
        let eachNote = notes[i];
        $("#noteTable").append(
            '<tr>' +
            '<th>'+
            '<div class="blog-post">' +
            '<div class="post-meta">' +
            '<span class="author">' +
            '<img src="images/author.jpg" width="40px" height="40px">' +
            '<span style="margin-left: 10px; -webkit-text-fill-color: white"> ' +
                eachNote.username + ' , Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
            '</div>' +
            '<h2 class="post-title"><a id="'+ eachNote.id +'">' + eachNote.title + '</a></h2>' +
            '<span style="-webkit-text-fill-color: white">收录在 <label style="text-decoration-line: underline">'
                + eachNote.notebook + '</label> 中' +
            '<a style="margin-left: 75px">被 <label style="text-decoration-line: underline">'
                + eachNote.collection + '</label> 人收藏</a>' +
            '</span>' +
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
}

/**
 * 加载用户笔记本列表
 */
function getNotebooks() {
    $.ajax({
        type: 'POST',
        url: 'php/notebooks.php',
        success: function (booklist) {
            for (let i = 0; i < booklist.length; i++) {
                let book = booklist[i];
                $("#notebook").append(
                    '<tr>' +
                    '<th>' +
                    '<a id="' + book.id +'">' + book.name + '</a>' +
                    '<span class="badge" style="margin-left: 53px">' + book.number + '</span>' +
                    '</th>' +
                    '</tr>' +
                    '<script>' +
                    '$("#' + book.id + '").click(function() {' +
                        'checkNotebook(' + book.id + ');' +
                    '})' +
                    '</script>'
                )
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    })
}

/**
 * 显示笔记本详情
 * @param id
 */
function checkNotebook(id) {
    $.ajax({
        type: 'POST',
        url: 'php/notebook.php',
        data: {
            id: id
        },
        success: function (result) {
            showDiv("detailDiv");
            $("#checkbook").text(result.name);
            $("#detail").text(result.description);
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
        }
    });

    $.ajax({
        type: 'POST',
        url: 'php/notes.php',
        data: {
            id: id
        },
        success: function (noteList) {
            document.getElementById("noteTable").innerHTML = "";
            loop(noteList);
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
        }

    })
}

/**
 * 显示特定用户的笔记本详情
 * @param id
 * @param username
 */
function checkUserNotebook(id, username) {
    $.ajax({
        type: 'POST',
        url: 'php/notes',
        data: {
            notebook: id,
            usename: username
        },
        success: function (noteList) {
            document.getElementById("noteTable").innerHTML = "";
            loop(noteList);
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
        }

    })
}

$("#create").click(function () {
    let detail = $("#details").val();
    let bookname = $("#bookname").val();
    createBook(bookname, detail);
});


/**
 * 判断笔记本名字是否合法
 * @param content
 * @returns {boolean}
 */
function isContentValid(content) {
    let re = /\s+/;
    return !(content === "" || re.test(content));
}

/**
 * 创建新的笔记本
 * @param bookName
 * @param description
 */
function createBook(bookName, description) {
    if (!isContentValid(bookName)) {
        swal({
            title: '笔记本名字不能为空！',
            type: 'error'
        });
        return;
    }
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

/**
 * 获得收藏列表
 */
function getCollection() {
    $.ajax({
        type: 'POST',
        url: 'php/collections',
        success: function (collections) {
            for (let i = 0; i < collections.length; i++) {
                let collection = collections[i];
                $("#collect").append(
                    '<li>' +
                    '<div class="recent-post clearfix">' +
                    '<h2 class="post-title">' +
                    '<a id="pre-'+ collection.id +'">'+collection.title +'</a>' +
                    '</h2>' +
                    '<div class="post-meta" style="-webkit-text-fill-color: white">' +
                    '<span>'+ collection.username+'</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>'+
                    '<script>' +
                    '$("#pre-' + collection.id + '").click(function() {' +
                    'window.location.href = "check.html?id=" + ' + collection.id + ';' +
                    '})' +
                    '</script>'
                )
            }
        }

    })
}

/**
 * 隐藏div
 * @param divName
 */
function hideDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "none";
}

/**
 * 显示div
 * @param divName
 */
function showDiv(divName) {
    let dif = document.getElementById(divName);
    dif.style.display = "block";
}