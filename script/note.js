/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
    preLoader("huangxiao");
        $("#title").click(function () {
            // let id = $("#id").val();
            id = 5;
            checkNote(id);
        })
    }
);

function preLoader(username) {
    $.ajax({
        type: 'POST',
        url: 'php/notes.php',
        data:{
            username: username,
        },
        success: function (notesList) {
            console.log(notesList);
            for (let i = 0; i < notesList.length; i++){
                let eachNote = notesList[i];
                $("#noteTable").append(
                    '<tr>' +
                        '<th>'+
                        '<div class="blog-post">' +
                            '<div class="post-meta">' +
                            '<span class="author">' +
                            '<label id="author">' +
                            '<img src="images/author.jpg" alt="" width="40px" height="40px">' +
                            eachNote.username + '</label>'+
                            '</span>,' +
                            '<span>Noted At <strong id="date">' + eachNote.time + '</strong></span>'+
                            '</div>' +
                            '<h2 class="post-title"><a id="id">' + eachNote.title + '</a></h2>' +
                            '<div id="content"></div>'+
                            '</div>' +
                    '</th>'+
                    '</tr>'
                )
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }
    });
}

function addNotes(notes) {

}
function checkNote(id) {
    console.log(id);
    $.ajax({
        type: 'POST',
        url: 'php/content.php',
        data: {
            id: id,
        },
        success: function (content) {
            window.onload = function (content) {
                let content = document.getElementById("content");
                content.innerHTML = content;
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }

    })
}