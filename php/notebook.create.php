<?php
/**
 * 创建笔记本
 * 用户名从cookie中获得
 * name         ： 笔记本名
 * description  ： 笔记本描述
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/7
 * Time: 上午12:44
 */

header("Content-Type:application/json;charset=utf-8");

require ("datautil.php");
require ("Response.php");

if (isset($_COOKIE["user"])) {
    $username       =   $_COOKIE["user"];
    $name           =   $_POST["name"];
    $description    =   $_POST["description"];

    $sql = "select count(*) from notebook where username = '$username' and name = '$name';";

    $res = $db->querySingle($sql);
    if ($res) {
        $response = new Response(false, "您已创建名为《" . $name . "》的笔记");
        echo $response->toJson();
        return;
    }

    $sql = "insert into notebook (name, username, description) values ('$name', '$username', '$description');";
    $res = $db->exec($sql);
    if ($res) {
        $response = new Response(true, "创建成功");
        echo $response->toJson();
    } else {
        $response = new Response(false, $db->lastErrorMsg());
        echo $response->toJson();
    }
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
