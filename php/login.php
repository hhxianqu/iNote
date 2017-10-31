<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/10/29
 * Time: 下午11:17
 */

$username = $_POST['username'];
$password = $_POST['password'];

if ($username === "huangxiao") {
    return $password . " " . "success!";
} else {
    return $password . " " . "fail!";
}