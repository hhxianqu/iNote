<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/12
 * Time: 下午8:00
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');
require ('Response.php');

if (isset($_COOKIE['user'])) {
    $password = $_POST['password'];

    $sql = "update user set password = $password";
    $res = $db->exec($sql);

    if ($res) {
        $response = new Response(true, "修改成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
