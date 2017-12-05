<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:45
 */

header("Content-Type:text/html");

require ('datautil.php');

$id = $_POST['id'];

$sql = "select content from note where id=$id";
$res = $db->querySingle($sql);

if ($res) {
    echo $res;
}