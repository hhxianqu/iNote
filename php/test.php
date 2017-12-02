<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/3
 * Time: 上午12:07
 */

require ('datautil.php');

$username = 'hehuixian';
$password = 'password';

$sql = "insert into user (username, password) values ('$username', '$password');";
$db->exec($sql);
