<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/10/29
 * Time: 下午11:17
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');
require ('Response.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select count(*) from user where username='$username' and password='$password';";

$res = $db->querySingle($sql);
if ($res === 1) {
    // cookie会话结束到期
    setcookie("user", $username, 0, "/", null, null, true);
    $response = new Response(true, "登录成功");
    echo $response->toJson();
} else {
    $response = new Response(false, "登录失败");
    echo $response->toJson();
}
