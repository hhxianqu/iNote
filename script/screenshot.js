/**
 * Created by apple on 2017/12/11.
 */

$("#screenshot").click(function () {
    html2canvas(document.getElementById('view'), {
        onrendered: function (canvas) {
            let url = canvas.toDataURL();
            let triggerDownload = $("<a>").attr("href", url).attr("download", "截图.png").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove();
        },
        width: 300,
        height: 300,
    })
});