<?php
/**
 * 获取用户笔记列表
 * 用户名通过cookie获取
 * 可选参数 notebook 指定笔记本名称，获取该笔记本中笔记
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:24
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

if (isset($_COOKIE["user"])) {
    $username = $_COOKIE["user"];

    $result = array();

    $sql = "select * from note where username = '$username' ";

    if (isset($_POST["notebook"])) {
        $notebook = $_POST["notebook"];
        $sql .= " and notebook = '$notebook' ";
    }
    $sql .= "order by time desc";

    $res = $db->query($sql);

    $i = 0;
    if ($res) {
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $note = array(
                "id"        =>  $row['id'],
                "username"  =>  $row['username'],
                "title"     =>  $row['title'],
                "time"      =>  $row['time'],
                "notebook"  =>  $row['notebook']
            );
            $result[$i++] = $note;
        }
        echo json_encode($result);
    } else {
        echo $result;
    }
} else {
    $response = new Response(false, "您尚未登录");
    echo $response->toJson();
}
