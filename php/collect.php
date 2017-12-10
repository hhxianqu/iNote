<?php
/**
 * 收藏帖子
 * 参数：
 * id   帖子id
 * user通过cookie获得
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/10
 * Time: 上午12:02
 */

header('ContentType:application/json;charset=utf-8');

require ('datautil.php');
require ('Response.php');

if (isset($_COOKIE['user'])) {
    $username = $_COOKIE['user'];
    $id = $_POST['id'];

    $sql = "select count(*) from collect where username = '$username' and note_id = $id;";

    if ($db->querySingle($sql)) {
        $response = new Response(false, "您已收藏此笔记");
        echo $response->toJson();
        return;
    }

    $sql = "insert into collect (username, note_id) values ('$username', $id);";
    $res = $db->exec($sql);

    if ($res) {
        $response = new Response(true, "收藏成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}