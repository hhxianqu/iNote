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
    $sql = "select * from notebook where username = '$username'";
    $res = $db->query($sql);

    $i = 0;
    if ($res) {
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $notebook = array(
                "id"            =>  $row['id'],
                "username"      =>  $row['username'],
                "name"          =>  $row['name'],
                "description"   =>  $row['description']
            );
            $result[$i++] = $notebook;
        }
        echo json_encode($result);
    } else {
        echo $result;
    }

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
