<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/6
 * Time: 下午11:21
 */

header("Content-Type:application/json;charset=utf-8");

require ("datautil.php");
require ("Response.php");

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "delete from note where id = $id";

    $res = $db->exec($sql);

    if ($res) {
        $response = new Response(true, "删除成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, "笔记不存在");
        echo $response->toJson();
    }
} else {
    $response = new Response(false, "参数错误");
    echo $response->toJson();
}
