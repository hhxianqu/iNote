<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/4
 * Time: 上午11:03
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');
require ('Response.php');

// 设置时区为东八区
date_default_timezone_set('PRC');

if (isset($_POST['submit'])) {

    $username = $_POST["username"];
    $title = $_POST["title"];
    $content = $_POST["html"];
    $time = date("Y-m-d H:i:s");

    $sql = "insert into 
            note(username, title, content, time) 
            values ('$username', '$title', '$content', '$time');";

    $res = $db->exec($sql);
    if ($res) {
        $response = new Response(true, "提交成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }

}