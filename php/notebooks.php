<?php
/**
 * 获取用户所有笔记
 * 用户名通过cookie获取
 * POST请求无需传递参数
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/7
 * Time: 上午1:04
 */

header("Content-Type:application/json;charset=utf-8");

require ("datautil.php");
require ("Response.php");

if (isset($_COOKIE["user"])) {
    $username = $_COOKIE["user"];

    $result = array();
    $sql = "select notebook.*, count(note.id) as number
            from notebook
              left join note
                on notebook.username = note.username and notebook.name = note.notebook
            where notebook.username = '$username'
            group by notebook.id
            order by number desc;";
    $res = $db->query($sql);

    $i = 0;
    if ($res) {
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $result[$i++] = $row;
        }
        echo json_encode($result);
    } else {
        echo $result;
    }

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
