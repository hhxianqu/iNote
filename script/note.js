/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
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

