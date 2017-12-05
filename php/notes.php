<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:24
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

$username = $_POST['username'];

$result = array();

$sql = "select * from note where username='$username' order by time desc;";
$res = $db->query($sql);

if ($res) {
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
        // TODO
    }
}
