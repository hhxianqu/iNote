
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
                    '<img src="images/author.jpg" width="40px" height="40px">' +
                    '<label style="margin-left: 10px; -webkit-text-fill-color: whitesmoke"> ' +
                    eachNote.username + '</label>'+
                    '</span>' +
                    '<span style="-webkit-text-fill-color: white"> , Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
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