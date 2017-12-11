
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
            document.getElementById("title").innerText = result.title;
            document.getElementById("author").innerText = result.username;
            document.getElementById("date").innerText = result.time;
            document.getElementById("details").innerHTML = result.content;
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
        }
    });

});


$("#collect").click(function () {
    collect(getQueryVariable("id"));
});

function collect(id) {
    $.ajax({
        type: 'POST',
        url: 'php/collect.php',
        data: {
            id: id,
        },
        success: function (result) {
            if (result.isNormal){
                // console.log(result.message);
                swal({
                    title: result.message,
                    type: 'success',
                    confirmButtonText: '确认',
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