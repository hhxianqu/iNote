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

// 判断操作者能否删除笔记
$res['canDelete'] = isset($_COOKIE['user']) && $res['username'] === $_COOKIE['user'];
// 判断用户是否收藏笔记
if (isset($_COOKIE['user'])) {
    $username = $_COOKIE['user'];
    $sql = "select id from collect where username = '$username' and note_id = $id";
    if ($db->querySingle($sql)) {
        $res['isCollect'] = true;
    } else {
        $res['isCollect'] = false;
    }
}

echo json_encode($res);
