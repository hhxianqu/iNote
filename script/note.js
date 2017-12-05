/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
    preLoader("huangxiao");
    }
);

/**
 * 加载用户笔记
 * @param username
 */
function preLoader(username) {
    $.ajax({
        type: 'POST',
        url: 'php/notes.php',
        data:{
            username: username,
        },
        success: function (notesList) {
            // console.log(notesList);
            for (let i = 0; i < notesList.length; i++){
                let eachNote = notesList[i];
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
                            '<div id="content"></div>'+
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
            console.log(xhr.status);
            console.log(status);
        }
    });
}

