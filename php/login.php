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

$sql = "select count(*) from user where username='$username' and password='$password';";

$res = $db->querySingle($sql);

echo $res;
