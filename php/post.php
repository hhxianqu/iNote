<?php
/**
 * 上传笔记
 * 参数：
 * title    标题
 * html     笔记html内容
 * notebook 所属笔记本名
 * user通过cookie获取
 *
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

if (isset($_COOKIE["user"])) {

    $username = $_COOKIE["user"];
    $title = $_POST["title"];
    $content = $_POST["html"];
    $time = date("Y-m-d H:i:s");
    $notebook = $_POST["notebook"];

    $sql = "insert into 
            note(username, title, content, time, notebook) 
            values ('$username', '$title', '$content', '$time', '$notebook');";

    $res = $db->exec($sql);
    if ($res) {
        $response = new Response(true, "提交成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
