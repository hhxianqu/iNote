<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:45
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

$id = $_POST['id'];

$sql = "select * from note where id=$id";
$res = $db->querySingle($sql, true);

echo json_encode($res);
