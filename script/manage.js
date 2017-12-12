/**
 * Created by apple on 2017/12/12.
 */

$().ready(function(){
    preLoader()
});

function preLoader() {
    $.ajax({
        type: 'POST',
        url: 'php/manage.php',
        success: function (result) {
            for (let i = 0; i < result.length; i++){
                let each = result[i];
                $("#user").append(
                    '<tr>' +
                    '<td style="text-align: center">'+ each.username + '</td>' +
                    '<td style="text-align: center">'+ each.notes + '</td>' +
                    '<td style="width: 400px; text-align: center">' +
                        '<button class="btn btn-link" id="del'+ i +'">delete</button>' +
                    '</td>'+
                    '</tr>'+
                    '<script>' +
                        '$("#del' + i + '").click(function() {' +
                            'swal({' +
                    'title: "不建议删除用户",' +
                    'type: "warning",' +
                    'confirmButtonText: "确认"' +
                    '})' +
                        '})'+
                    '</script>'
                )
            }
        }, error: function (xhr, status, error) {
            console.log(xhr.status);
        }
    })
}