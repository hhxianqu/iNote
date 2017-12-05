<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午10:36
 */

header("Content-Type:application/json;charset=utf-8");

require ("datautil.php");

$keywords = $_GET["keywords"];

$result = array();
$sql = "select * from note where title like '%$keywords%' order by time desc;";

$res = $db->query($sql);
if ($res) {
    $i = 0;
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
        $note = array(
            "id" => $row['id'],
            "username" => $row['username'],
            "title" => $row['title'],
            "time" => $row['time']
        );
        $result[$i++] = $note;
    }
}

echo json_encode($result);