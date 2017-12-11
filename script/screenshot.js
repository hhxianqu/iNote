/**
 * Created by apple on 2017/12/11.
 */

$("#screenshot").click(function () {
    let height=$('#view').height();
    //滚到顶部
    $('html, body').animate({scrollTop:0});
    html2canvas(document.getElementById('view'), {
        onrendered: function (canvas) {
            let url = canvas.toDataURL();
            let triggerDownload = $("<a>").attr("href", url).attr("download", "截图.jpg").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove();
        },
        width: 2000,
        height: height,
        background: "#fff",
    })
});