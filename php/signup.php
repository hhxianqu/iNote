<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/2
 * Time: 下午10:09
 */

header("Content-Type:application/json;charset=utf-8");

require('datautil.php');
require('Response.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select count(*) from user where username='$username'";

if (!$db->querySingle($sql)) {

    $sql = "insert into user (username, password) values ('$username', '$password');";
    $res = $db->exec($sql);

    if ($res) {
        $response = new Response(true, "注册成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }
} else {
    // 用户名已存在
    $response = new Response(false, "用户名已存在");
    echo $response->toJson();
}
