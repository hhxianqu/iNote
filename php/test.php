<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/3
 * Time: 上午12:07
 */

require ('datautil.php');

$username = "huangxiao";

$result = array();

$sql = "select * from note where username='$username' order by time desc;";
$res = $db->query($sql);

if ($res) {
    $i = 0;
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
}
