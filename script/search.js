
$().ready(function () {
    $("#searchRes").html("");
    $("#searchBook").html("");
    let keywords = $("#keyword").val();
    search(keywords);
});


$("#search").click(function () {
    $("#searchRes").html("");
    let keywords = $("#keyword").val();
    search(keywords);
});

function search(keywords) {
    $.ajax({
        type: 'GET',
        url: 'php/search.php',
        data: {
            keywords: keywords,
        },
        success: function (result) {
            let notes = result.notes;
            let notebooks = result.notebook;
            for(let i = 0; i < notes.length; i ++){
                let eachNote = notes[i];
                $("#searchRes").append(
                    '<tr>' +
                    '<th>'+
                    '<div class="blog-post">' +
                    '<div class="post-meta">' +
                    '<span class="author">' +
                    '<img src="images/author.jpg" width="40px" height="40px">' +
                    '<label style="margin-left: 10px; -webkit-text-fill-color: whitesmoke"> ' +
                    eachNote.username + '</label>'+
                    '</span>' +
                    '<span style="-webkit-text-fill-color: white"> , Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
                    '</div>' +
                    '<h2 class="post-title"><a id="'+ eachNote.id +'">' + eachNote.title + '</a></h2>' +
                    '<span style="-webkit-text-fill-color: white">收录在 <label style="text-decoration-line: underline">'
                    + eachNote.notebook + '</label> 中' +
                    '<a style="margin-left: 75px">被 <label style="text-decoration-line: underline">'
                    + eachNote.collection + '</label> 人收藏</a>' +
                    '</div>' +
                    '</th>'+
                    '</tr>'+
                    '<script>' +
                    '$("#' + eachNote.id + '").click(function() {' +
                    'window.location.href = "check.html?id=" + ' + eachNote.id + ';' +
                    '})' +
                    '</script>'
                )
            }

            for (let i = 0; i < notebooks.length; i ++) {
                let book = notebooks[i];
                $("#searchBook").append(
                    '<tr>' +
                    '<th>' +
                    '<a id="' + book.id +'">' + book.name + '</a>' +
                    '<label style="margin-left: 20px; -webkit-text-fill-color: rgba(255,215,0,0.7)' +
                    '"> 作者：'+ book.username + '</label>' +
                    '<span class="badge" style="margin-left: 53px">有笔记数：' + book.number + '</span>' +
                    '</th>' +
                    '</tr>' +
                    '<script>' +
                    '$("#' + book.id + '").click(function() {' +
                        'window.location.href = "note.html?id=" + ' + book.id + ';' +
                        '})' +
                    '</script>'
                )
            }
        },
        error: function (xhr, status, error) {
            console.log(states);
            
        }
    })

}