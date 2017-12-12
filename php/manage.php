<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/12
 * Time: 下午6:57
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

$result = array();

$sql = "select u.username, count(n.id) as notes from user u  
        left join note n 
        on u.username = n.username 
        group by u.username;";

$res = $db->query($sql);

$i = 0;
if ($res) {
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
        $result[$i++] = $row;
    }
    echo json_encode($result);
} else {
    die($db->lastErrorMsg());
}