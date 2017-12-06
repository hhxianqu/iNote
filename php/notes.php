<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:24
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

if (isset($_COOKIE["user"])) {
    $username = $_COOKIE["name"];

    $result = array();

    $sql = "select * from note where username='$username' order by time desc;";
    $res = $db->query($sql);

    $i = 0;
    if ($res) {
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $note = array(
                "id"        =>  $row['id'],
                "username"  =>  $row['username'],
                "title"     =>  $row['title'],
                "time"      =>  $row['time']
            );
            $result[$i++] = $note;
        }
        echo json_encode($result);
    } else {
        echo $result;
    }
}
