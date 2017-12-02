<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/2
 * Time: 下午10:09
 */

require('datautil.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select count(*) from user where username='$username'";

if (!$db->querySingle($sql)) {
    $sql = "insert into user (username, password) values ('$username', '$password');";
    $res = $db->exec($sql);
    if ($res) {
        echo 'Sign up successfully';
    } else {
        echo $db->lastErrorMsg();
    }
} else {
    // 用户名已存在
    echo 'Username already exists';
}
