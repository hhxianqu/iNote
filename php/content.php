<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:45
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

//$result = array();
$id = $_POST['id'];

$sql = "select * from note where id=$id";
$res = $db->querySingle($sql, true);

// 判断操作者能否删除笔记
$res['canDelete'] = isset($_COOKIE['user']) && $res['username'] === $_COOKIE['user'];

echo json_encode($res);
