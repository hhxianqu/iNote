
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
    html2canvas($("#wholeNote"),  {
        onrendered: function(canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;

            //一页pdf显示html页面生成的canvas高度;
            let pageHeight = contentWidth / 595.28 * 841.89;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            let position = 0;

            let imgWidth = 555.28;
            let imgHeight = 552.28/contentWidth * contentHeight;

            //设置照片清晰度
            let pageData = canvas.toDataURL('image/jpeg', 1.0);

            let pdf = new jsPDF('p', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );
            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save('test.pdf');
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