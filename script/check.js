/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
    checkNote(getQueryVariable("id"));
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
    return false;
}

function checkNote(id) {
    $.ajax({
        type: 'POST',
        url: 'php/content.php',
        data: {
            id: id,
        },
        success: function (result) {
            document.getElementById("details").innerHTML = result.content;
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }
    });
}