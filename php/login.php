<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/10/29
 * Time: 下午11:17
 */

require('datautil.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select * from user where username='" . $username . "' and password='" . $password . "';";

$res = $db->query($sql);
if (count($res->fetchArray()) == 0) {
    echo '登录失败';
} else {
    echo '登录成功';
}
