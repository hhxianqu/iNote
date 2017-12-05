/**
 * Created by apple on 2017/12/5.
 */
$().ready(function () {
        let loc = location.href;
        let n1 = loc.length;
        let n2 = loc.indexOf("=");
        let id = decodeURI(loc.substr(n2+1, n1-n2));
        checkNote(id);
});
function checkNote(id) {
    $.ajax({
        type: 'POST',
        url: 'php/content.php',
        data: {
            id: id,
        },
        success: function (content) {
            document.getElementById("details").innerHTML = content;
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }

    })
}