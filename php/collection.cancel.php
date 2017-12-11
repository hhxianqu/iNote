<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/11
 * Time: 上午11:43
 */

require ('datautil.php');
require ('Response.php');

header("Content-Type:application/json;charset=utf-8");

if ($_COOKIE['user']) {
    $username = $_COOKIE['user'];
    $id = $_POST['id'];

    $sql = "select id from collect where username = '$username' and note_id = $id";
    $res = $db->querySingle($sql);

    if ($res) {
        $sql = "delete from collect where id = $res";
        $res = $db->exec($sql);
        if ($res) {
            $response = new Response(true, "取消收藏成功");
            echo $response->toJson();
        } else {
            $response = new Response(false, $db->lastErrorMsg());
            echo $response->toJson();
        }
    } else {
        $response = new Response(false, "您未收藏此笔记");
        echo $response->toJson();
    }
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}