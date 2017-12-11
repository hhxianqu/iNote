
$().ready(function () {
    checkNote(getQueryVariable("id"));
    document.getElementById("delete").style.display = "none";
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
            document.getElementById("title").innerText = result.title;
            document.getElementById("author").innerText = result.username;
            document.getElementById("date").innerText = result.time;
            document.getElementById("details").innerHTML = result.content;
            if (result.canDelete) {
                document.getElementById("delete").style.display = "block";
            }
            if (result.isCollect) {
                $("#collect").text("Cancel Collect");
            } else {
                $("#collect").text("Collect");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(status);
        }
    });
}

$("#delete").click(function () {
    $.ajax({
        type: 'POST',
        url: 'php/delete.php',
        data: {
            id: getQueryVariable("id"),
        },
        success: function (result) {
            if (result.isNormal) {
                swal({
                    title: result.message,
                    type: 'success',
                    confirmButtonText: '确认',
                    },
                    function (isConfirm) {
                        if(isConfirm) {
                            window.location.href = 'note.html';
                        }
                    });
            } else {
                swal({
                    title: result.message,
                    type: 'error',
                    confirmButtonText: '确认',
                },
                    function (isConfirm) {
                        // console.log("fails");
                        if(isConfirm) {
                            window.location.href = 'note.html';
                        }
                    });
            }
        },
        error: function (xhr, status, error) {
            console.log(status);
        }
    })
});

$("#download").click(function () {
    let doc = new jsPDF();
    html2canvas($('#wholeNote'), {
        onrendered: function(canvas) {
            let imgData = canvas.toDataURL('images');
            let doc = new jsPDF('p', 'px', 'a3');
            doc.addImage(imgData, 'PNG', 25, 10, 0, 0);
            doc.save('test.pdf');
        },
        background: "#fff",
    });

});

/**
 * 收藏笔记
 */
$("#collect").click(function () {
    let isCollected = document.getElementById("collect").innerText;
    if (isCollected === "Collect") {
        collect(getQueryVariable("id"));
    } else {
        cancelCollection(getQueryVariable("id"));

    }

});

/**
 * 收藏笔记
 * @param id
 */
function collect(id) {
    $.ajax({
        type: 'POST',
        url: 'php/collect.php',
        data: {
            id: id,
        },
        success: function (result) {
            if (result.isNormal){
                swal({
                    title: result.message,
                    type: 'success',
                    confirmButtonText: '确认',
                },
                function (isConfirm) {
                    location.reload();
                })
            }
            else {
                swal({
                    title: result.message,
                    type: 'error',
                    confirmButtonText: '确认'
                })
            }

        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
        }
    })
}

function cancelCollection(id) {
    $.ajax({
        type: 'POST',
        url: 'php/collection.cancel.php',
        data: {
            id: id,
        },
        success: function (result) {
            if (result.isNormal){
                swal({
                    title: result.message,
                    type: 'success',
                    confirmButtonText: '确认',
                },function (isConfirm) {
                    location.reload();
                })
            }
            else {
                // console.log(result.message);
                swal({
                    title: result.message,
                    type: 'error',
                    confirmButtonText: '确认'
                })
            }

        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
        }
    })
}