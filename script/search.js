/**
 * Created by apple on 2017/12/6.
 */

$().ready(function () {
    $("#searchRes").html("");
    let keywords = $("#keyword").val();
    search(keywords);
});


$("#search").click(function () {
    $("#searchRes").html("");
    let keywords = $("#keyword").val();
    search(keywords);
});

function search(keywords) {
    console.log(keywords);
    $.ajax({
        type: 'GET',
        url: 'php/search.php',
        data: {
            keywords: keywords,
        },
        success: function (notes) {
            for(let i = 0; i < notes.length; i ++){
                let eachNote = notes[i];
                $("#searchRes").append(
                    '<tr>' +
                    '<th>'+
                    '<div class="blog-post">' +
                    '<div class="post-meta">' +
                    '<span class="author">' +
                    '<label>' + '<img src="images/author.jpg" width="40px" height="40px">' +
                    eachNote.username + '</label>'+
                    '</span>,' +
                    '<span>Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
                    '</div>' +
                    '<h2 class="post-title"><a id="'+ eachNote.id +'">' + eachNote.title + '</a></h2>' +
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
        },
        error: function (xhr, status, error) {
            console.log(states);
            
        }
    })

}