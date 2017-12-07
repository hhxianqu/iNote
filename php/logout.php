<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/7
 * Time: 下午2:22
 */

header("Content-Type:application/json;charset=utf-8");

if (isset($_COOKIE["user"])) {
    $username = $_COOKIE["user"];
    // 删除cookie
    setcookie("user", $username, time() - 3600, "/", null, null, true);
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}